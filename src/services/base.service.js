import axios from "axios";
import store from "./../store/index";

// Set the global headers here
// `timeout` specifies the number of milliseconds before the request times out.
// If the request takes longer than `timeout`, the request will be aborted.
const defaultTimeout = 30000,
  defaultHeaders = {
    Accept: "application/json"
  },
  defaultParams = {},
  http = axios.create({
    timeout: defaultTimeout
  }),
  requestHandler = config => {
    defaultHeaders["Api-Key"] = store.getters["config/getDefaultConfig"](
      "apiKey"
    );
    defaultHeaders["Api-Version"] = store.getters["config/getDefaultConfig"](
      "apiVersion"
    );
    if (store.getters["config/getAccessToken"]) {
      defaultHeaders[
        "Authorization"
      ] = `Bearer ${store.getters["config/getAccessToken"]}`;
    }
    defaultParams["country"] = store.getters["config/getDefaultConfig"](
      "country"
    );
    defaultParams["siteId"] = store.getters["config/getDefaultConfig"](
      "siteId"
    );
    defaultParams["language"] = store.getters["config/getDefaultConfig"](
      "language"
    );
    config.params = { ...defaultParams, ...config.params };
    config.headers = { ...defaultHeaders, ...config.headers };
    return config;
  };

http.interceptors.request.use(config => {
  return requestHandler(config);
});

export default http;
