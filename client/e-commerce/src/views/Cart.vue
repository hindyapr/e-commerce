<template>
  <div class="my-cart" v-if="logStatus">
    <p class="title">MY CART :</p>
    <div class="card-list">
      <div class="card-list-container">
        <cartCard
          v-for="product in cart"
          :key="product.productId._id"
          :product="product"
        />
      </div>
      <router-view class="detailed-product" :product="filtered" />
    </div>
  </div>
</template>

<script>
import cartCard from "@/components/cartCard.vue";
export default {
  props: ["cart", "logStatus"],
  components: { cartCard },
  data() {
    return {};
  },
  computed: {
    filtered() {
      return this.cart.find(
        product => product.productId._id === this.$route.params.id
      );
    }
  }
};
</script>

<style scoped>
.my-cart {
  text-align: start;
  padding: 96px 0;
  width: 80%;
  margin: auto;
}

.card-list {
  width: 100%;
  display: flex;
}

.card-list-container {
  width: 65%;
}

.detailed-product {
  width: 35%;
  margin: 0 48px;
}
</style>
