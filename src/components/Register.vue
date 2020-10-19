<template>
  <div class="register-wrapper">
    <h2>Register</h2>
    <form @submit.prevent="signup()">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
      <button type="submit">REGISTER</button>
      <router-link :to="{ name: 'Login' }">
        <p>Already have an account? Login here.</p>
      </router-link>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Register",
  data() {
    return {
      username: null,
      email: null,
      password: null,
      feedback: null,
      slug: null,
      welcomeNote: {
        title: "Welcome To Notes!",
        text: "This is your first note in notes web app!"
      }
    };
  },
  methods: {
    signup() {
      if (this.username && this.email && this.password) {
        this.slug = slugify(this.username, {
          replacement: "-",
          remove: /[$*_+~.()'"!-:@]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.slug);
        // let refNote = db.collection("users").doc()
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This username already exists.";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  username: this.username,
                  user_id: cred.user.uid,
                });

              })
              .then(() => {
                this.$router.push({ name: "Index" });
              })
              .catch(err => {
                console.log(err);
                this.feedback = err.message;
              });
            this.feedback = "This username is free to use.";
          }
        });
      } else {
        this.feedback = "You must fill all fields.";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.register-wrapper {
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
      transition: all 0.2s ease;
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
