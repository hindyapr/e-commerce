<template>
  <div id="app">
    <navbar
      class="fixed has-background-white"
      ref="navbar"
      @addProduct="addProduct"
      @logedIn="logedIn"
      @logedOut="logedOut"
      :logStatus="logStatus"
      :role="role"
      :cart="cart"
    />
    <router-view
      :products="products"
      :logStatus="logStatus"
      :role="role"
      :cartId="cartId"
      :cart="cart"
      :token="token"
      @getProducts="getProducts"
      @mustLogin="mustLogin"
      @deleteProduct="deleteProduct"
      @addToChart="addToChart"
    />
  </div>
</template>

<script>
import axios from "./api/axios.js";
import navbar from "@/components/navbar.vue";

export default {
  components: { navbar },
  data() {
    return {
      logStatus: false,
      products: [],
      cart: [],
      token:
        "",
      role: "",
      cartId: "",
      userId: ""
    };
  },
  methods: {
    getProducts(data) {
      this.products = [...data];
    },
    addProduct(data) {
      this.$toast.open({
                    message: 'Product is successfully added to list!',
                    type: 'is-success'
                })
      this.products.push(data);
    },
    logedIn(data) {
      this.logStatus = true;
      this.token = data.token;
      this.userId = data.userId;
      this.role = data.role;

      if (this.role === "user") {
        axios
        .get(`/carts/user/${this.userId}`)
        .then(({ data }) => {
          if(data) this.cartId = data.Id;
          else return axios
          .post(`/cart`, {
            headers : this.token
          })
        })
        .then(({ data }) => {
          this.cartId = data.Id
        })
        .catch(err => {
          console.log(err)
        })
      }

    },
    logedOut() {
      this.logStatus = false;
      this.token = "";
      this.role = "";
      this.userId = "";
    },
    mustLogin() {
      this.$toast.open({
        duration: 3000,
        message: `You must login if you want to add product into cart`,
        position: "is-top",
        type: "is-danger"
      });
      this.$refs.navbar.isLoginModalActive = true;
    },
    deleteProduct(id) {
      this.$toast.open({
                    message: 'Product is deleted!',
                    type: 'is-success'
                })
      this.products = this.products.filter(product => product._id !== id);
    },
    addToChart() {
      axios.get(`/carts/${this.cartId}`).then(({ data }) => {
        this.$toast.open({
                    message: 'Product is successfully added to chart!',
                    type: 'is-success'
                })
        this.cart = [...data.products];
      });
    }
  },
  created() {
    if (this.cartId) {
      axios.get(`/carts/${this.cartId}`).then(({ data }) => {
        console.log(data);
        this.cart = [...data.products];
      });
    }
  },
  watch: {
    cartId(val) {
      if (val === "") this.chart = [];
      else {
        axios
          .get(`/carts/${val}`)
          .then(({ data }) => {
            console.log(data);
            this.cart = [...data.products];
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  background-color: white;
  z-index: 999;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
