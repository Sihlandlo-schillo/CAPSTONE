<template>
    <div class="updateItem">
      <h1>Update Item</h1>
      <input v-model="item.item_name" placeholder="Item Name" />
      <input v-model="item.category" placeholder="Category" />
      <input v-model="item.brand" placeholder="Brand" />
      <input v-model="item.quantity" type="number" placeholder="Quantity" />
      <input v-model="item.price" type="number" step="0.01" placeholder="Price" />
      <button @click="updateItem">Update Item</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        item: {
          item_name: '',
          category: '',
          brand: '',
          quantity: 0,
          price: 0.00,
          items_id: this.$route.params.id // Assuming item ID is passed via route params
        }
      };
    },
    methods: {
      async updateItem() {
        try {
          await this.$store.dispatch('updateItem', this.item);
          // Optionally, handle success like showing a message or redirecting
          console.log('Item updated successfully');
        } catch (error) {
          console.error('Error updating item:', error);
        }
      }
    },
    async created() {
      // Fetch item details to populate the form
      const itemId = this.$route.params.id;
      await this.$store.dispatch('fetchItem', itemId);
      this.item = this.$store.state.currentItem; // Assuming you store the fetched item in Vuex
    }
  }
  </script>
  
  <style scoped>
    .updateItem{
        width: 400px;
        height: 600px;
        border: 1px solid;
        margin-top: 5%;
        margin-right: auto;
        margin-left: auto;
        padding-top: 20px;
        background-color: lightgray;
        border-radius: 20px;
    }
    .updateItem input{
        width: 300px;
        height: 40px;
        padding-left: 20px;
        display: block;
        margin-bottom: px ;
        margin-left: auto;
        margin-right: auto;
        border-radius:20px;
    }
    .updateItem button{
        width: 300px;
        height: 40px;
        border-radius: 20px;
        background-color: #aaa4a4;
    }
    @media screen and (max-width: 400px) {
        .updateItem{
        width: 300px;
        border: 1px solid;
        margin-right: auto;
        margin-left: auto;
        background-color: lightgray;
        border-radius: 20px;
    }
   
    .updateItem input{
        width: 250px;
        height: 40px;
        padding-left: 20px;
        display: block;
        margin-top: 10%;
        margin-bottom: -10px ;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid ;
    }
    .updateItem button{
        width: 250px;
        height: 40px;
        background-color: #aaa4a4;
    }
    }
</style>
  