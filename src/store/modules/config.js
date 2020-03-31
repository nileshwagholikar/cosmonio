//Auth service
import AuthService from '../../services/auth.service';

let accessTokenTimer = 0;

// re-fetch the new token 5 minutes before it expires
const deltaExpireTime = 5,
  refreshAccessToken = ({ dispatch, expiresIn }) => {
    clearInterval(accessTokenTimer);
    // convert expiresIn seconds to milliseconds
    expiresIn = (expiresIn - deltaExpireTime * 60) * 1000;
    accessTokenTimer = setInterval(() => {
      return dispatch('getAccessToken');
    }, expiresIn);
  };

export default {
  namespaced: true,
  state: {
    config: {
      translations: {},
      checkoutConfig: {}
    },
    accessToken: null
  },
  getters: {
    getDefaultConfig: (state) => {
      return (key) => {
        return state.config.checkoutConfig[key];
      };
    },
    getAccessToken: (state) => {
      return state.accessToken;
    }
  },
  mutations: {
    updateConfig(state, config) {
      state.config = config;
    },
    updateAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    }
  },
  actions: {
    updateConfig({ commit }, config) {
      commit('updateConfig', config);
    },
    async getAccessToken({ commit, dispatch }) {
      try {
        const response = await AuthService.getAccessToken({}, { type: 'SHOP' });
        if (response.status === 200) {
          commit('updateAccessToken', response.data.access_token);
          refreshAccessToken({ dispatch, expiresIn: response.data.expires_in });
        }
      } catch (error) {
        console.log(error);
        Promise.reject();
      }
      return Promise.resolve();
    }
  }
};
