<template>
  <div class="card product">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="product.image" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ product.name }}</p>
          <p class="subtitle is-6">{{ priceInRp }}</p>
        </div>
      </div>

      <b-button
        type="is-dark"
        v-if="role !== 'admin'"
        @click="addToChart(product._id)"
        >Add to chart</b-button
      >
      <b-button
        type="is-danger"
        v-if="role === 'admin'"
        @click="deleteConfirm(product._id)"
        >Delete product</b-button
      >
    </div>
  </div>
</template>

<script>
import axios from "../api/axios.js";

export default {
  props: ["product", "logStatus", "role", "token", "cartId"],
  methods: {
    addToChart(productId) {
      if (!this.logStatus) {
        this.$emit("mustLogin");
      } else {
        axios
          .patch(
            `/carts/${this.cartId}`,
            {
              productId
            },
            {
              headers: {
                token: this.token
              }
            }
          )
          .then(({ data }) => {
            this.$emit("addToChart");
          });
      }
    },
    deleteConfirm(id) {
      this.$dialog.confirm({
        title: "Deleting product",
        message:
          "Are you sure you want to <b>delete</b> this product? This action cannot be undone.",
        confirmText: "Delete Product",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.deleteProduct(id)
      });
    },
    deleteProduct(id) {
      let path = `/products/${id}`;
      axios
        .delete(path, {
          headers: {
            token: this.token
          }
        })
        .then(({ data }) => {
          this.$toast.open("Product deleted!");
          this.$emit("deleteProduct", data._id);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    priceInRp() {
      let stringPrice = this.product.price + "";
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

<style scoped>
.product {
  text-align: left;
  padding: 0px;
  margin: 10px 12px;
}
</style>
