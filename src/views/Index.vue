<template>
  <div id="appTemplate">
    <Header></Header>
    <div class="div-content">
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/public/Header.vue";
import Footer from "../components/public/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }
};
</script>
