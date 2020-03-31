<template>
  <header>
    <div class="container">
      <div class="top-bar">
        <img src="../../assets/logo.png" class="logo" alt="Cosmonio" />
        <Navigation></Navigation>
      </div>
      <Search></Search>
    </div>
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
