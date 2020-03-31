<template>
  <div class="searchForm">
    <div class="d-flex justify-content-center">
      <div class="form-input">
        <input
          type="text"
          name="s-property"
          id="s-property"
          class="input input-block"
          placeholder=" "
          v-model="keyword"
        />
        <label for="s-property" class="p-float-label">Search</label>
      </div>
      <span v-if="keyword.length < 3" class="note"
        >Please enter minimum 3 letters for search</span
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    showLogo: {
      type: Boolean,
      require: false
    }
  },
  computed: {
    ...mapState({
      searchedKeyword: state => {
        return state.search.searchedKeyword;
      }
    }),
    keyword: {
      get() {
        return this.searchedKeyword;
      },
      set(val) {
        this.updateSearchedKeyword(val);
      }
    }
  },
  methods: {
    ...mapMutations({
      updateSearchedKeyword: "search/updateSearchedKeyword"
    })
  }
};
</script>
