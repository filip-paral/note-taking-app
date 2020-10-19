<template>
  <div class="login-wrapper">
    <h2>Login</h2>
    <form @submit.prevent="login()">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
      <button type="submit">LOGIN</button>
      <router-link :to="{ name: 'Register' }">
        <p>Do not have account yet? Register here.</p>
      </router-link>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(cred =>{
          console.log(cred.user)
          this.$router.push({ name: "Index" })
        }).catch(err => {
          this.feedback = err.message
        })
      } else {
        this.feedback = "You need to fill all fields"
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login-wrapper {
  position: relative;
  margin: 10vh auto;
  background: #dfe0e2;
  width: 350px;
  border-radius: 5px;
  box-shadow: 3px 3px 10px #333;
  padding: 15px;
  h2 {
    text-align: center;
    font-size: 2rem;
    font-family: "Noto Sans JP", sans-serif;
    font-weight: 300;
    margin-top: 10px;
    color: #34495e;
  }
  form {
    padding-top: 20px;
    input,
    button {
      width: 80%;
      margin-left: 10%;
      margin-bottom: 25px;
      height: 40px;
      border-radius: 5px;
      outline: 0;
    }
    input {
      border: solid 1px #bbb;
      padding-left: 10px;
      font-size: 1rem;
      &:focus {
        border: 1px solid #d7192b;
      }
    }
    button {
      background: #eb5160;
      border: none;
      box-shadow: none;
      color: white;
      cursor: pointer;
      font-size: 1.3rem;
      font-family: "Helvetica Neue", "Noto Sans JP", sans-serif;
      font-weight: 300;
      letter-spacing: 1px;
      transition: all .2s ease;
      &:hover {
        background: #d7192b;
        box-shadow: 1px 1px 5px #555;
      }
      &:active {
        box-shadow: 1px 1px 7px #222;
        background: #d7192b;
      }
    }
    a {
      text-align: center;
      font-size: 0.8rem;
      color: #3498db;
    }
    p {
      padding-bottom: 10px;
    }
  }

  .red-text {
    color: red;
    font-size: 0.8rem;
    font-family: "Roboto", sans-serif;
    position: relative;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
