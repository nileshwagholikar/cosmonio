<template>
  <li class="image-card">
    <img
      class="image-card__image"
      :class="{ skeleton: loading }"
      :src="imageUrl"
      :alt="title"
      @click="openItem"
    />
    <div class="image-card__body">
      <p class="image-title" :class="{ skeleton: loading }">{{ title }}</p>
      <p class="image-owner" :class="{ skeleton: loading }">{{ byline }}</p>
      <section class="image-date-view-wrapper">
        <p class="image-date" :class="{ skeleton: loading }">{{ timestamp }}</p>
        <p class="image-views" :class="{ skeleton: loading }">
          Views: {{ viewCount }}
        </p>
      </section>
    </div>
  </li>
</template>

<script>
import moment from "moment";
import { mapMutations } from "vuex";

const TRANSPARENT_GIF =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export default {
  props: ["image"],
  filters: {
    formatDate(date) {
      return moment(date).format("MMMM Do, YYYY");
    }
  },
  methods: {
    ...mapMutations({
      updateOpenItem: "search/updateOpenItem"
    }),
    openItem: function() {
      this.updateOpenItem(this.image);
    }
  },
  computed: {
    imageUrl() {
      if (this.loading) return TRANSPARENT_GIF;
      return this.image.url_n;
    },
    title() {
      return this.image.title || "Untitled Image";
    },
    byline() {
      return `By ${this.image.ownername}`;
    },
    timestamp() {
      return moment(this.image.datetaken).format("MMMM Do, YYYY");
    },
    viewCount() {
      const viewOrViews = this.image.views === 1 ? "view" : "views";
      return `${this.image.views} ${viewOrViews}`;
    }
  }
};
</script>
