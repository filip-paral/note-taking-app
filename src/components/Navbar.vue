<template>
  <div class="navbar">
    <div class="left-navbar"></div>
    <div class="mid-navbar">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/notes-logo-red.png" alt="notes-logo" />
      </router-link>
    </div>
    <div class="right-navbar">
      <router-link :to="{ name: 'Login' }">
        <div v-if="!user" class="login-btn">Login</div>
      </router-link>
      <p v-if="user">{{ user.email }}</p>
      <div v-if="user" @click="logout" class="logout-btn">Logout</div>
      <router-link :to="{ name: 'Register' }">
        <div v-if="!user" class="register-btn">Register</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Home" });
        });
    }
  },
  created() {
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  text-align: center;
  height: 70px;
  padding: 5px 3vw;
  .left-navbar,
  .mid-navbar,
  .left-navbar {
    display: flex;
    align-items: center;
  }
  .left-navbar {
    flex-basis: 30%;
  }
  .mid-navbar {
    justify-content: center;
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
  .right-navbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 30%;
    a {
      text-decoration: none;
    }
    .login-btn,
    .register-btn,
    .logout-btn {
      color: #071013;
      font-family: "Helvetica Neue", "Helvetica", sans-serif;
      font-size: 1rem;
      font-weight: 400;
      position: relative;
      margin: auto 1vw;
      padding: 0.6rem 0.6rem;
      cursor: pointer;
      transition: all 0.2s ease-out;
    }
    .register-btn {
      border: 1px solid #071013;
      border-radius: 5%;
      &:hover {
        border: 1px solid #aaaaaa;
      }
    }
    .login-btn:hover {
      color: #aaaaaa;
    }
    .logout-btn {
      border: 1px solid #eb5160;
      color: #eb5160;
      border-radius: 5%;
      &:hover {
        color: #d7192b;
        border: 1px solid #d7192b;
      }
    }
    p {
      font-family: "Helvetica Neue", "Helvetica", sans-serif;
      font-size: 1.1rem;
      letter-spacing: 1px;
    }
  }
}
</style>
