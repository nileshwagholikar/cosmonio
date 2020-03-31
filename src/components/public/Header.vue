<template>
  <header class="banner box-shadow">
    <Navigation></Navigation>
    <Search showLogo></Search>
  </header>
</template>

<script>
import Navigation from "./Navigation";
import Search from "./../common/Search";

export default {
  components: {
    Navigation,
    Search
  }
};
</script>
