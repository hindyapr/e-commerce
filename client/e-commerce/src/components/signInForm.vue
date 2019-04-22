<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">SIGN IN</p>
      </header>
      <section class="modal-card-body">
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

        <b-checkbox>Remember me</b-checkbox>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button is-primary" @click="login">
          Login
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
      password: ""
    };
  },
  methods: {
    login() {
      axios
        .post("/users/login", {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          console.log(data);
          this.$emit("logedIn", data);
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
