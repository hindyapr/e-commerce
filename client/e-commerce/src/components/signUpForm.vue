<template>
  <form action="">
    <div class="modal-card" style="width: 480px;">
      <header class="modal-card-head">
        <p class="modal-card-title">SIGN UP</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Username">
          <b-input
            type="text"
            v-model="username"
            placeholder="Your username"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Email">
          <b-input
            type="email"
            v-model="email"
            placeholder="Your email"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            type="password"
            v-model="password"
            password-reveal
            placeholder="Your password"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button is-primary" @click="register">
          Register
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import axios from "../api/axios.js";

export default {
  props: [],
  data() {
    return {
      email: "",
      password: "",
      username: ""
    };
  },
  methods: {
    register() {
      axios
        .post("/users", {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          console.log(data);
          this.$parent.close();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
