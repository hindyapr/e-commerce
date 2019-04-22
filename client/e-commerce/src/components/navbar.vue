<template>
  <div>
    <nav
      class="navbar has-background-white"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          E-COMMERCE
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <router-link to="/">Home</router-link>
          </a>

          <a class="navbar-item">
            <router-link to="/products">Products</router-link>
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                <router-link to="/about">About</router-link>
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider" />
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <b-button
                class="button is-primary ml-48"
                @click="isAddProductModalActive = true"
                v-if="logStatus && role === 'admin'"
                rounded
              >
                Add Product
              </b-button>
              <div class="navbar-item ml-48  has-dropdown is-hoverable">
                <span
                  class="icon is-large ml-48"
                  v-if="logStatus && role === 'user'"
                >
                  <i class="fas fa-2x fa-cart-plus"></i>
                  <b-tag rounded>{{ cart.length }}</b-tag>
                </span>
                <div class="navbar-dropdown">
                  <a
                    class="navbar-item"
                    v-for="(product, index) in cart"
                    :key="index"
                  >
                    {{ product.productId.name }}
                  </a>
                  <hr class="navbar-divider" v-if="cart.length > 0" />
                  <a class="navbar-item" v-if="cart.length > 0">
                    <router-link to="/cart">My cart detailed</router-link>
                  </a>
                </div>
              </div>
              <div class="navbar-item ml-48 mr-48 has-dropdown is-hoverable">
                <span class="icon is-large" v-if="logStatus">
                  <i class="fas fa-2x fa-id-badge"></i>
                </span>
                <div class="navbar-dropdown">
                  <a class="navbar-item">
                    Contact
                  </a>
                  <hr class="navbar-divider" />
                  <a class="navbar-item" @click="logedOut">
                    Log Out
                  </a>
                </div>
              </div>
              <button
                v-if="!logStatus"
                class="button is-primary"
                @click="isRegisterModalActive = true"
              >
                Sign Up
              </button>
              <button
                v-if="!logStatus"
                class="button is-primary"
                @click="isLoginModalActive = true"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <b-modal :active.sync="isLoginModalActive" has-modal-card>
      <signInForm @logedIn="logedIn" />
    </b-modal>
    <b-modal :active.sync="isRegisterModalActive" has-modal-card>
      <signUpForm />
    </b-modal>
    <b-modal :active.sync="isAddProductModalActive" has-modal-card>
      <addProduct :token="token" @addProduct="addProduct" />
    </b-modal>
  </div>
</template>

<script>
import signInForm from "@/components/signInForm.vue";
import signUpForm from "@/components/signUpForm.vue";
import addProduct from "@/components/addProduct.vue";

export default {
  props: ["logStatus", "role", "cart", "token"],
  components: {
    signInForm,
    signUpForm,
    addProduct
  },
  data() {
    return {
      isLoginModalActive: false,
      isRegisterModalActive: false,
      isAddProductModalActive: false
    };
  },
  methods: {
    successLogedIn(token) {
      this.token = token;
    },
    addProduct(data) {
      this.$emit("addProduct", data);
    },
    logedIn(token) {
      this.$emit("logedIn", token);
    },
    logedOut() {
      this.$emit("logedOut");
    }
  }
};
</script>

<style>
.ml-48 {
  margin-left: 24px;
}

.mr-48 {
  margin-right: 48px;
}
</style>
