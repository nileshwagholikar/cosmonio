export default {
  namespaced: true,
  state: {
    searchedKeyword: "",
    openItem: {}
  },
  mutations: {
    updateSearchedKeyword(state, keyword) {
      state.searchedKeyword = keyword;
    },
    updateOpenItem(state, item) {
      state.openItem = item;
    }
  },
  actions: {
    updateSearchedKeyword({ commit }, keyword) {
      commit("updateSearchedKeyword", keyword);
    },
    updateOpenItem({ commit }, item) {
      commit("updateOpenItem", item);
    }
  }
};
