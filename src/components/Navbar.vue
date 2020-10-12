<template>
  <div class="navbar">
    <div class="left-navbar">
      <router-link :to="{ name: 'Index' }">
        <img src="@/assets/keep_48dp.png" alt="google-keep-logo">
        <span>Keep</span>
      </router-link>
    </div>
    <div class="mid-navbar">Search box</div>
    <div class="right-navbar">Profile picture</div>
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
  height: 48px;
  .left-navbar {
    display: flex;
    align-items: center;
    span {
      font-family: 'Noto Sans JP', sans-serif;
      font-size: 22px;
      color: #5f6368;
      margin-left: 8px;
      text-decoration: none;
    }
    img {
      width: 40px;
      height: 40px;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
    }
  }
}
</style>
