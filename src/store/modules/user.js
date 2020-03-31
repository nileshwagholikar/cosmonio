import CartService from "../../services/cart.service";

export function getItems(data) {
  return (data && data.attributes && data.attributes.items) || [];
}

export function getCartSummary(data) {
  return (data && data.attributes && data.attributes.pricing) || {};
}

export function getPromotions(data) {
  return (data && data.attributes && data.attributes.promotions) || {};
}

export function getVouchers(data) {
  return (data && data.attributes && data.attributes.appliedVouchers) || [];
}

function getDeliveryMode(data) {
  return (data && data.attributes && data.attributes.deliveryMode) || [];
}

function getFormatedCtn(ctn) {
  return ctn.replace("/", "_");
}

function getProductDetails(ctn, rootGetters) {
  return new Promise(resolve => {
    const getConfigByKey = rootGetters["config/getDefaultConfig"],
      sectorId = getConfigByKey("sectorId") || "B2C",
      localeId =
        getConfigByKey("localeId") ||
        `${getConfigByKey("language")}_${getConfigByKey("country")}`,
      catalogId = getConfigByKey("catalogId") || "CARE";
    CartService.getProductDetails({ ctn, sectorId, localeId, catalogId })
      .then(response => {
        resolve(response.data.data);
      })
      .catch(() => {
        return resolve({});
      });
  });
}

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
    loginUser({ commit, state, rootGetters }) {
      commit("updateLoading", true);
      CartService.getCartDetails(state.cartId)
        .then(async response => {
          const data = response.data.data,
            items = getItems(data),
            cartSummary = getCartSummary(data),
            promotions = getPromotions(data),
            vouchers = getVouchers(data),
            email = (data && data.attributes && data.attributes.email) || "",
            deliveryMode = getDeliveryMode(data),
            products = await Promise.all(
              items.map(item => {
                return getProductDetails(
                  getFormatedCtn(item.itemId),
                  rootGetters
                );
              })
            );

          commit("updateCartItems", { items });
          commit("updateCartSummary", { cartSummary });
          commit("updatePromotions", { promotions });
          commit("updateProducts", products);
          commit("updateVouchers", { vouchers });
          commit("delivery/updateEmail", email, { root: true });
          commit("updateDeliveryMode", deliveryMode);
        })
        .catch(err => {
          return console.error(err);
        })
        .finally(() => {
          return commit("updateLoading", false);
        });
    },
    updateLoginState({ commit }, isLoggedIn) {
      commit("updateLoginState", isLoggedIn);
    }
  }
};
