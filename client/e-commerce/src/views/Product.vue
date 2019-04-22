<template>
  <div>
    <router-view />
    <div class="flexing">
      <productCard
        class="product"
        v-for="product in products"
        :key="product._id"
        :product="product"
        :logStatus="logStatus"
        :role="role"
        :token="token"
        :cartId="cartId"
        @mustLogin="mustLogin"
        @deleteProduct="deleteProduct"
        @addToChart="addToChart"
      />
    </div>
  </div>
</template>

<script>
import productCard from "../components/productCard.vue";
import axios from "../api/axios.js";

export default {
  props: ["products", "logStatus", "role", "token", "cartId"],
  components: { productCard },
  data() {
    return {};
  },
  methods: {
    mustLogin() {
      this.$emit("mustLogin");
    },
    deleteProduct(id) {
      this.$emit("deleteProduct", id);
    },
    addToChart() {
      this.$emit("addToChart");
    }
  },
  created() {
    axios.get("/products").then(({ data }) => {
      this.$emit("getProducts", [...data]);
    });
  }
};
</script>

<style scoped>
.flexing {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-between;
  margin: 148px auto;
  width: 80%;
}

.product {
  width: 234px;
}
</style>
