<template>
  <div class="popup show image-popup">
    <div class="popup-header">
      <h1 v-if="image.title">{{ image.title }}</h1>
      <h1 v-else>No Title Found</h1>
      <div class="close" @click="closeItem()"></div>
    </div>
    <div class="popup-content">
      <div class="center-canves">
        <div class="loader" v-if="loading">Loading...</div>
        <canvas
          id="canvasOutput"
          :height="image.height_h"
          :width="image.width_h"
          name="canvasOutput"
        />
      </div>
      <div class="image-card__body">
        <p class="image-owner">By {{ image.ownername }}</p>
        <section class="image-date-view-wrapper">
          <p class="image-date">{{ image.datetaken | formatDate }}</p>
          <p class="image-views">Views: {{ image.views }}</p>
        </section>
      </div>
    </div>
    <canvas
      id="canvasInput"
      class="hidden"
      :height="image.height_h"
      :width="image.width_h"
      name="canvasInput"
    />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";

export default {
  computed: {
    ...mapState({
      image: state => {
        return state.search.openItem;
      }
    })
  },
  filters: {
    formatDate(date) {
      return moment(date).format("MMMM Do, YYYY");
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapMutations({
      updateOpenItem: "search/updateOpenItem"
    }),
    closeItem: function() {
      this.updateOpenItem({});
    },
    generateImage: function() {
      this.loading = true;
      const canvasInput = document.getElementById("canvasInput");
      const context = canvasInput.getContext("2d");
      const img = new Image();
      img.src = this.image.url_h + "?" + new Date().getTime();
      img.setAttribute("crossOrigin", "");
      img.onload = () => {
        context.drawImage(img, 0, 0);

        let src = this.$cv.imread("canvasInput");
        let dst = new this.$cv.Mat();
        this.$cv.cvtColor(src, src, this.$cv.COLOR_RGB2GRAY, 0);
        // You can try more different parameters
        this.$cv.Canny(src, dst, 50, 100, 3, false);
        this.$cv.imshow("canvasOutput", dst);
        src.delete();
        dst.delete();
        this.loading = false;
      };
    }
  },
  mounted() {
    this.generateImage();
  }
};
</script>
