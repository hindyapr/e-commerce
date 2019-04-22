<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="product.productId.image" alt="Image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ product.productId.name }}</p>
          <p class="subtitle is-6">@{{ priceInRp }}</p>
          <p class="subtitle is-6">Stock: {{ product.productId.amount }}</p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
        iaculis mauris. <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
        <br />
        <small>11:09 PM - 1 Jan 2016</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  computed: {
    priceInRp() {
      let stringPrice = this.product.productId.price + "";
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

<style></style>
