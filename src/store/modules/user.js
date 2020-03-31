export default {
  namespaced: true,
  state: {
    loggedIn: false,
    user: {}
  },
  getters: {
    getUserDetails: state => {
      return state.user;
    }
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    updateLoginState(state, isLoggedIn) {
      state.loggedIn = isLoggedIn;
    }
  },
  actions: {
    loginUser({ commit }) {
      commit("updateLoginState", true);
      commit("updateUser", {
        name: "Admin",
        email: "email@cosmonio.com"
      });
    },
    updateLoginState({ commit }, isLoggedIn) {
      commit("updateLoginState", isLoggedIn);
      commit("updateUser", {});
    }
  }
};
