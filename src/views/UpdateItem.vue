<template>
    <div>
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
  /* Add your styles here */
  </style>
  