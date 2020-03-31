<template>
  <div id="nav" v-if="!isLoggedIn">
    <router-link to="/home">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <a href="javascript:" @click="showLogin()">Login</a>
    <Login></Login>
  </div>
  <div id="nav" v-else-if="isLoggedIn">
    <router-link to="/home">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <a href="javascript:" @click="logout()">Logout</a>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Login from "./../common/Login";

export default {
  components: {
    Login
  },
  computed: {
    ...mapState({
      isLoggedIn: state => {
        return state.user.loggedIn;
      }
    })
  },
  methods: {
    logout: function() {
      this.$store.dispatch("user/updateLoginState", false);
    },
    showLogin: function() {
      document.querySelector(".login").classList.add("show");
    }
  }
};
</script>
