<template>
  <li class="image-card">
    <img
      class="image-card__image"
      :src="image.url_n"
      :alt="image.title"
      @click="openItem"
    />
    <div class="image-card__body">
      <p v-if="image.title" class="image-title">{{ image.title }}</p>
      <p v-else class="image-title">No Title Found</p>
      <p class="image-owner">By {{ image.ownername }}</p>
      <section class="image-date-view-wrapper">
        <p class="image-date">{{ image.datetaken | formatDate }}</p>
        <p class="image-views">Views: {{ image.views }}</p>
      </section>
    </div>
  </li>
</template>

<script>
import moment from "moment";
import { mapMutations } from "vuex";

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
  }
};
</script>
