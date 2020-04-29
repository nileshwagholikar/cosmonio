<template>
  <div class="searchResult" v-if="searchedKeyword.length >= 3">
    <ul v-if="loading" class="image-card-grid">
      <image-card v-for="n in 6" :key="n" :loading="true" />
    </ul>
    <template v-else>
      <h1>Search Result for {{ searchedKeyword }}</h1>
      <ul class="image-card-grid">
        <image-card
          v-for="image in filteredImages"
          :key="image.id"
          :image="image"
        />
        <li class="image-card image-card-loading" v-if="calledLoading">
          Loading more images...
        </li>
      </ul>
      <image-popup v-if="openItem.url_n" />
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import config from "../../config";
import axios from "axios";
import ImageCard from "../search/ImageCard";
import ImagePopup from "../search/ImagePopup";

export default {
  components: {
    ImageCard,
    ImagePopup
  },
  computed: {
    ...mapState({
      searchedKeyword: state => {
        return state.search.searchedKeyword;
      },
      openItem: state => {
        return state.search.openItem;
      }
    }),
    filteredImages() {
      // filter for short image URL & long image URL
      const filteredImages = this.images.filter(image => {
        if (image.url_n && image.url_h) {
          return true;
        }
        return false;
      });

      return filteredImages;
    }
  },
  data() {
    return {
      loading: false,
      calledLoading: false,
      images: [],
      param: {
        method: "flickr.photos.search",
        api_key: config.api_key,
        FLickrApi_sig: config.FLickrApi_sig,
        extras: "url_n, url_h, owner_name, date_taken, views",
        page: 1,
        format: "json",
        nojsoncallback: 1,
        per_page: 30
      },
      page: 1
    };
  },
  methods: {
    ...mapMutations({
      updateSearchedKeyword: "search/updateSearchedKeyword"
    }),
    search() {
      this.loading = true;
      this.fetchImages(this.page).then(response => {
        this.images = response.data.photos.photo;
        this.loading = false;
      });
    },
    fetchImages(page) {
      // update Page
      this.param.page = page;
      this.param.tags = this.searchedKeyword;

      return axios({
        method: "get",
        url: "https://api.flickr.com/services/rest",
        params: this.param
      });
    },
    scroll() {
      document.querySelector(".div-content").onscroll = () => {
        if (
          document.querySelector(".div-content").scrollTop +
            document.querySelector(".div-content").offsetHeight >=
            document.querySelector(".div-content").scrollHeight -
              document.querySelector(".div-content").offsetHeight &&
          !this.calledLoading
        ) {
          this.page++;
          this.calledLoading = true;
          this.fetchImages(this.page).then(response => {
            this.images = this.images.concat(response.data.photos.photo);
            this.calledLoading = false;
          });
        }
      };
    }
  },
  watch: {
    searchedKeyword(newValue) {
      if (newValue.length >= 3) {
        this.search();
      } else {
        this.images = [];
      }
    }
  },
  mounted() {
    if (this.searchedKeyword.length >= 3) {
      this.search();
      this.scroll();
    }
  }
};
</script>
