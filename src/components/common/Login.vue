<template>
  <section class="login box-shadow">
    <div class="close" @click="hideLogin()">X</div>
    <form class="form d-flex" @submit.prevent="login()">
      <div class="item">
        <input
          type="text"
          name="email"
          id="email"
          class="input input-block"
          placeholder=" "
          required
        />
        <label for="email" class="p-float-label">Email Address</label>
      </div>
      <div class="item">
        <input
          type="password"
          name="password"
          id="password"
          class="input input-block"
          placeholder=" "
          required
        />
        <label for="password" class="p-float-label">Password</label>
      </div>
      <div class="item">
        <button type="submit" class="btn btn-primary btn-block">
          Login
        </button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  methods: {
    login: function() {
      this.$store.dispatch("user/updateLoginState", true).then(() => {
        // this.$router.push({ path: "/home" });
        this.hideLogin();
      });
    },
    hideLogin: function() {
      document.querySelector(".login").classList.remove("show");
    }
  }
};
</script>
