<template>
  <div class="navbar">
    <div class="left-navbar"></div>
    <div class="mid-navbar">
      <router-link :to="{ name: 'Index' }">
        <img src="@/assets/notes-logo.png" alt="notes-logo">
      </router-link>
    </div>
    <div class="right-navbar"></div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  text-align: center;
  height: 70px;
  padding: 5px 0;
  .mid-navbar {
    display: flex;
    align-items: center;
    img {
      height: 60px;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
    }
  }
}
</style>
