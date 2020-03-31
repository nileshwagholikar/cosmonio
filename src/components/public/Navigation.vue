<template>
  <div id="nav">
    <template v-if="!isLoggedIn">
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
      <a href="javascript:" class="last-child" @click="showLogin()">Login</a>
      <Login></Login>
    </template>
    <template v-else>
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
      <a href="javascript:" class="last-child" @click="logout()">Logout</a>
    </template>
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
