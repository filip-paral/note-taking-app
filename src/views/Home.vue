<template>
  <div class="home">
<!--    HERO-->
    <section class="hero">
      <h1 class="main-title">One place for all your [<span>ideas</span>]</h1>
      <h3 class="sub-heading">Notes app keeps all your notes so you can use your head for creative stuff.</h3>
      <router-link :to="{ name: 'Register' }">
        <button>SIGN UP</button>
      </router-link>
      <a href="#"><p>Already have an account? Log in!</p></a> <!--TODO: Add router link-->
      <img src="@/assets/hero-device.png" alt="hero-image">
    </section>

<!--    FEATURES-->
    <section id="features">

    </section>
<!--    TESTIMONIALS-->
    <section id="testimonials"> <!--todo: bud s pouzitím slick, nebo simple notes-->


    </section>

<!--    NEWSLETTER-->
    <section class="newsletter">

    </section>


  </div>
</template>

<script>
// import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home"
};
</script>

<style scoped lang="scss">
.hero {
  text-align: center;
  margin-top: 8vh;

  h1 {
    position: relative;
    font-family: "Ubuntu", sans-serif;
    font-weight: 600;
    font-size: 4rem;
    line-height: 6rem;
    margin-bottom: 0.2rem;

    span {
      color: #EB5160;
    }
  }

  h3 {
    color: #808b96;
    font-family: "Helvetica Neue", "Helvetica", sans-serif;
    font-size: 1.3rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }

  button {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    background: #EB5160;
    color: #ffffff;
    margin-bottom: 1.2rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    width: 20%;
    transition: background .2s ease-in-out;

    &:hover {
      background: #D7192B;
    }
  }

  p,
  a {
    color: #071013;
    font-size: 1rem;
    transition: color .2s ease-in-out;
    font-family: "Helvetica Neue", "Helvetica", sans-serif;
    margin-bottom: 2rem;
  }
  p:hover {
    color: #EB5160;
  }

  img {
    max-width: 80vw;
  }
}
</style>
