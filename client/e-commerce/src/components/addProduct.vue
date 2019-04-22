<template>
  <form action="">
    <div class="modal-card" style="width: 567px;">
      <header class="modal-card-head">
        <p class="modal-card-title">ADD PRODUCT</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Product Name">
          <b-input
            type="text"
            v-model="name"
            placeholder="Product name here..."
            required
          >
          </b-input>
        </b-field>

        <b-field label="Product Price">
          <b-input
            type="number"
            v-model="price"
            placeholder="Product price here..."
            required
          >
          </b-input>
        </b-field>

        <b-field label="Product Quantity">
          <b-input
            type="number"
            v-model="amount"
            placeholder="Product quantity here..."
            required
          >
          </b-input>
        </b-field>

        <b-field label="Product Image">
          <input
            type="file"
            @change="onFileChange"
            accept="image/*"
            placeholder="Product image here..."
            required
          />
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button is-primary" @click.prevent="addProject">
          Add Product
        </button>
      </footer>
    </div>
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
  </form>
</template>

<script>
import axios from "../api/axios.js";

function dataURLtoFile(dataurl, filename) {
  console.log(dataurl);
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default {
  props: ["token"],
  data() {
    return {
      name: "",
      price: "",
      amount: "",
      image: "",
      isLoading: false
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    addProject() {
      this.isLoading = true;
      const params = new FormData();

      params.append("name", this.name);
      params.append("amount", this.amount);
      params.append("price", this.price);
      if (this.image) {
        params.append("image", dataURLtoFile(this.image, "img")); //selama ni kesusahan karena this.modal image ini string base64 makanya gak dianggap sbg file
      }
      axios
        .post("/products", params, {
          headers: {
            token: this.token
          }
        })
        .then(({ data }) => {
          this.$emit("addProduct", data);
          this.$parent.close();
          this.isLoading = false;
        });
    }
  }
};
</script>

<style></style>
