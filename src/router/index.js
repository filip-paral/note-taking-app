import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index";
import Register from "@/components/Register";
import Login from "@/components/Login";
import Home from "@/views/Home";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // auth check
    let user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      // auth failed redirect to login
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
