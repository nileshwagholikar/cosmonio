# Cosmonio

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start or npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Build app targeting modern browsers with auto fall back

```
npm run build:modern
```

### Run your unit tests (test cased not yet implemented)

```
npm run test:unit
```

### Run your end-to-end tests (test cased not yet implemented)
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### SCSS to CSS build

```
npm run sass
```

### SCSS to CSS build with watch

```
npm run sass:watch
```

------

### Assumptions

- Unit testing and E2E testing was not requirement
- Vuejs was easy to build with timelines
- As mentioned "preferred in Angular", Angular version can also be submitted if required
- Separate Data Service was not build as single http call was required to load data
- Session Storage Object is used to store state data due to data security

------

### Packages used

- **Axios:** http service to load API data
- **js-cookie:** Its unused package and can be removed. It can be used to store state object into local machine using cookies
- **moment:** date formatting
- **opencv.js:** to generate "Canny edge detection" (as per requirements)
- **vuex-persistedstate:** to store state object in local machine using Session Storage object. Local Storage object can be used to store state data.
- **SASS:** for SCSS compilation
- **connect-api-mocker:** Its unused package and can be removed. Mainly added to mock API response for local development, but due to time constraints cannot mock the API and used actual API
- **prettier:** Code formatting

------

### Improvements

- **BEM** can be used for CSS selectors
- **js-cookie** can be used to store state data using cookie with expiry. Right now due to Session Storage object, if use opens new tab or open new browser, state data is lost
- **Pre-loader** can be used to show more images are loading when user scrolls down to last image
- **Unit** and **E2E** test cases can be implemented
- **Interceptors** can be used to attach api_key and FLickrApi_sig data for each flickr API call. Also server side error, wrong data (data mismatch) error can be handled using interceptors