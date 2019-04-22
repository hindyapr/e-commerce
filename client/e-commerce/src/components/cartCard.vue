<template>
  <div class="cart-card card">
    <div class="product-name">{{ product.productId.name }}</div>
    <div class="product-count">count: {{ product.count }}</div>
    <div class="product-subtotal">subtotal : {{ subTotal }}</div>
    <div class="buttons product-buttons">
      <router-link
        :to="{ name: 'detailed', params: { id: product.productId._id } }"
        ><b-button type="is-info">Info</b-button></router-link
      >
      <b-button type="is-danger">Remove</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  computed: {
    subTotal() {
      let stringPrice = this.product.productId.price * this.product.count + "";
      let hasil = ",00-";

      for (let i = 0; i < stringPrice.length; i++) {
        hasil = stringPrice[stringPrice.length - 1 - i] + hasil;
        if (i % 3 === 2 && i !== stringPrice.length - 1) hasil = "." + hasil;
      }
      return "Rp" + hasil;
    }
  }
};
</script>

<style>
.cart-card {
  display: flex;
  justify-content: start;
  align-content: center;
  align-items: center;
  width: 100%;
  margin: 12px;
  height: 96px;
}

.product-name {
  width: 20%;
  padding: 20px;
}

.product-count {
  width: 10%;
}

.product-subtotal {
  width: 50%;
}

.product-buttons {
  width: 20%;
}
</style>
