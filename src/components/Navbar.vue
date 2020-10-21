<template>
  <div class="navbar">
    <div class="mid-navbar">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/notes-logo-red.png" alt="notes-logo" />
      </router-link>
    </div>
    <div class="right-navbar">
      <router-link :to="{ name: 'Login' }">
        <div v-if="!user" class="login-btn">Login</div>
      </router-link>
      <router-link :to="{ name: 'Index', params: { username: this.slug } }">
        <p v-if="user"><i class="user-icon far fa-2x fa-user"></i></p>
      </router-link>
      <div v-if="user" @click="logout" class="logout-btn">Logout</div>
      <router-link :to="{ name: 'Register' }">
        <div v-if="!user" class="register-btn">Register</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init"

export default {
  name: "Navbar",
  data() {
    return {
      user: null,
      slug: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Home" });
          this.slug = null;
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        db.collection("users")
            .where("user_id", "==", user.uid)
            .get().then(snapshot => {
          snapshot.forEach(doc => {
            this.slug = doc.data().slug
          })
        })
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
  //.left-navbar {
  //  flex-basis: 10%;
  //}
  .mid-navbar {
    justify-content: flex-start;
    align-items: center;
    flex-basis: 65%;
    img {
      height: 50px;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      padding: 0.6rem;
    }
  }
  .right-navbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 25%;
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

.user-icon {
  color: #eb5160;
  margin-right: 1rem;
}
</style>
