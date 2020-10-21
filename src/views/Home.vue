<template>
  <div class="home">
    <!--    HERO-->
    <section id="hero">
      <h1 class="main-title">One place for all your [<span>ideas</span>]</h1>
      <h3 class="sub-heading">
        Notes app keeps all your notes so you can use your head for creative
        stuff.
      </h3>
      <router-link :to="{ name: 'Register' }">
        <button>SIGN UP</button>
      </router-link>
      <router-link :to="{ name: 'Login' }">
        <a href="#"><p>Already have an account? Log in!</p></a>
      </router-link>
      <img src="@/assets/laptop-preview.png" alt="hero-image" />
    </section>

    <!--    FEATURES-->
    <section id="features">
      <h2 class="section-heading">Simple yet powerful</h2>
      <div class="features-wrapper">
        <div class="feature-item">
          <div class="feature-header">
            <i class="fas fa-2x fa-cloud"></i>
            <h3>Use everywhere</h3>
          </div>
          <p>
            Notes stay updated in real time, everywhere you might go. So you can
            access your precious notes from all around the world.
          </p>
        </div>
        <div class="feature-item">
          <div class="feature-header">
            <i class="fas fa-2x fa-palette"></i>
            <h3>Paint It!</h3>
          </div>
          <p>
            You can assign different meaning to your notes by using color
            assigning.
          </p>
        </div>
        <div class="feature-item">
          <div class="feature-header">
            <i class="fas fa-2x fa-money-bill-wave"></i>
            <h3>It's Free</h3>
          </div>
          <p>
            Cloud storage, note syncing. Just everything you can imagine is free
            of charge!
          </p>
        </div>
        <div class="feature-item">
          <div class="feature-header">
            <i class="fas fa-2x fa-search"></i>
            <h3>Search through</h3>
          </div>
          <p>
            Tidy up your notes every so often is annoying process. Now you don't
            have to! Just find your note with our search function.
          </p>
        </div>
        <div class="feature-item">
          <div class="feature-header">
            <i class="fas fa-2x fa-lightbulb"></i>
            <h3>Easy enough</h3>
          </div>
          <p>
            Notes are created with simplicity in mind. Sometimes, less is more.
          </p>
        </div>
        <div class="feature-item">
          <div class="feature-header">
            <i class="fas fa-2x fa-compress-arrows-alt"></i>
            <h3>Minimalistic design</h3>
          </div>
          <p>
            Are you confused about all the features that overwhelms you when you
            sign to new note taking app? Well this ends here.
          </p>
        </div>
      </div>
    </section>
    <!--    TESTIMONIALS-->
    <section id="testimonials">
      <h2 class="section-heading">What people say about Notes</h2>
      <div class="testimonial-wrapper">
        <div class="card testimonial-1">
          <div class="content">
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris."
            </p>
            <img
              src="https://images.pexels.com/photos/1056475/pexels-photo-1056475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="ashley-img"
            />
            <h5>Ashley, NY</h5>
          </div>
        </div>
        <div class="card testimonial-2">
          <div class="content">
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco nostrud."
            </p>
            <img
              src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="vivienne-img"
            />
            <h5>Vivienne, Australia</h5>
          </div>
        </div>
        <div class="card testimonial-3">
          <div class="content">
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod veniam incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim minim, quis nostrud exercitation ullamco aliqua."
            </p>
            <img
              src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="ryley-img"
            />
            <h5>Ryley, Colombia</h5>
          </div>
        </div>
      </div>
    </section>

    <!--    NEWSLETTER-->
    <section id="newsletter">
      <h2>Subscribe to our newsletter.</h2>
      <h3>
        And be aware of any tips and tricks how to boost your productivity.
      </h3>
      <form @submit.prevent="addSubscriber()">
        <!--        TODO DOPLNIT SUBSCRIBER METODU-->
        <input type="email" placeholder="your email address" />
        <button>SUBSCRIBE</button>
      </form>
      <p class="notice-txt">
        Do not worry, we will not spam your email with junk. All the good stuff.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    addSubscriber() {
      console.log("Hello");
    }
  }
};
</script>

<style scoped lang="scss">
#hero {
  text-align: center;
  margin-top: 8vh;
  @media screen and (max-width: 450px) {
    margin-top: 2rem;
  }
  .main-title {
    position: relative;
    font-family: "Ubuntu", sans-serif;
    font-weight: 600;
    font-size: 4rem;
    line-height: 6rem;
    margin-bottom: 0.2rem;
    @media screen and (max-width: 450px) {
      font-size: 2.5rem;
      line-height: 3.8rem;
    }
    span {
      color: #eb5160;
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
    background: #eb5160;
    color: #ffffff;
    margin-bottom: 1.2rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    width: 20%;
    transition: background 0.2s ease-in-out;
    @media screen and (max-width: 450px) {
      width: 50%;
    }

    &:hover {
      background: #d7192b;
    }
  }

  p,
  a {
    color: #071013;
    font-size: 1rem;
    transition: color 0.2s ease-in-out;
    font-family: "Helvetica Neue", "Helvetica", sans-serif;
    margin-bottom: 2rem;
  }
  p:hover {
    color: #eb5160;
  }

  img {
    max-width: 80vw;
  }
}

.section-heading {
  font-family: "Ubuntu", sans-serif;
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 3.5rem;
}

#features {
  padding: 3rem 15vw;
  text-align: center;
  @media screen and (max-width: 768px) {
    padding: 1.2rem 8vw;
  }
  .features-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    grid-auto-rows: auto;
    margin-bottom: 2rem;
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    .feature-item {
      text-align: left;
      div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 0.8rem;
        i {
          color: #eb5160;
          display: inline;
          margin-right: 5%;
        }
        h3 {
          font-family: "Helvetica Neue", "Helvetica", sans-serif;
          font-size: 1.4rem;
          font-weight: 500;
          color: #071013;
          display: inline;
        }
      }
      p {
        color: #808b96;
        font-family: "Helvetica Neue", "Helvetica", sans-serif;
        font-size: 1.2rem;
        font-weight: 300;
        line-height: 1.4rem;
        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }
      }
    }
  }
}

#testimonials {
  padding: 3rem 15vw;
  text-align: center;
  @media screen and (max-width: 768px) {
    padding: 1.2rem 8vw;
  }
  .testimonial-wrapper {
    margin-bottom: 2rem;
    display: grid;
    gap: 3rem;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      .testimonial-1 {
        grid-area: 1/1/2/2;
      }
      .testimonial-2 {
        grid-area: 1/2/2/3;
      }
      .testimonial-3 {
        grid-area: 2/1/3/3;
      }
    }
    @media screen and (max-width: 450px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
      .testimonial-1 {
        grid-area: 1/1/2/2;
      }
      .testimonial-2 {
        grid-area: 2/1/3/2;
      }
      .testimonial-3 {
        grid-area: 3/1/4/2;
      }
    }
    .card {
      border-bottom: solid 5px #d7192b;
      background: #eb516060;
      padding: 8% 8%;
      border-radius: 20px;
    }
    .content {
      text-align: center;
      font-family: "Helvetica Neue", "Helvetica", sans-serif;
      img {
        width: 133px;
        height: 133px;
        object-fit: cover;
        position: relative;
        display: block;
        border-radius: 50%;
        margin: 2% auto;
      }
      p {
        font-size: 1.1rem;
        font-weight: 400;
        line-height: 1.4rem;
        color: #071013;
        padding-bottom: 1.1rem;
      }
      h5 {
        font-size: 1.4rem;
        font-weight: 500;
      }
    }
  }
}

#newsletter {
  text-align: center;
  background-color: #dfe0e2;
  padding-bottom: 5rem;
  @media screen and (max-width: 450px) {
    padding: 0 1rem 5rem 0;
  }
  h2 {
    font-family: "Ubuntu", sans-serif;
    font-size: 2.5rem;
    font-weight: 600;
    margin: 1rem;
    padding-top: 3rem;
  }
  h3,
  .notice-txt {
    color: #808b96;
    font-family: "Helvetica Neue", "Helvetica", sans-serif;
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }
  form {
    width: 33vw;
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 1rem;
    input {
      font-size: 1rem;
      padding: 0.75rem 1rem;
      border-left: 3px solid #eb5160;
      min-height: 3rem;
      flex-basis: 70%;
      outline: none;
    }
    button {
      background: #eb5160;
      flex-basis: 30%;
      color: white;
      border: none;
      margin-left: 2rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
      &:hover {
        background: #d7192b;
      }
      @media screen and (max-width: 450px) {
        margin-left: 1rem;
        padding: 12% 5%;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #hero {
    margin-top: 4vh;
    h1 {
      font-size: 3rem;
    }

    h3 {
      font-size: 1.2rem;
    }
  }
}
</style>
