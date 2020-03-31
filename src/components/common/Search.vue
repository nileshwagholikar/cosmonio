<template>
  <div class="searchForm">
    <div v-if="showLogo" class="item">
      <img src="../../assets/logo.png" class="logo" alt="Cosmonio" />
    </div>
    <div class="item">
      <div class="form-input">
        <input
          type="text"
          name="s-property"
          id="s-property"
          class="input input-block"
          placeholder=" "
        />
        <label for="s-property" class="p-float-label">Search</label>
      </div>
      <div class="form-button">
        <button class="btn btn-primary btn-block">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showLogo: {
      type: Boolean,
      require: false
    }
  }
};
</script>
