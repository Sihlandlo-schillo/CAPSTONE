<template>
  <div>
    <spinner-comp :isVisible="isLoading" />
    <p id="itemsText">Rotate for a better view on your mobile</p>
    <section>
      <select v-model="selectedCategory" @change="filterItems">
        <option value="all">All</option>
        <option value="accessories">Accessories</option>
        <option value="clothing">Clothing</option>
        <option value="shoes">Shoes</option>
        <option value="test">Test</option>
      </select>
      <input type="text" placeholder="Search item" v-model="searchTerm" @input="filterItems" />
    </section>
    <button>
      <router-link to="/manageItems">
        <button>Manage Items</button>
      </router-link>
    </button>
    <div v-if="!isLoading" class="items">
      <table border="1">
        <tr>
          <th>Item ID</th>
          <th>Item Name</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Quantity</th>
          <th>Price (R)</th>
          <th>ACTIONS</th>
        </tr>
        <tr v-for="item in filteredList" :key="item.items_id">
          <td>{{ item.items_id }}</td>
          <td>{{ item.item_name }}</td>
          <td class="category">{{ item.category }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }}</td>
          <td>
            <button @click="addToOrders(item.items_id)">Order</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

  
 <script>
import SpinnerComp from '@/components/SpinnerComp.vue';

export default {
  components: { SpinnerComp },
  name: 'itemsView',
  data() {
    return {
      isLoading: true,
      searchTerm: '',
      selectedCategory: 'all',
    };
  },
  computed: {
     isAdmin() {
      return this.$store.state.user && this.$store.state.user.userRole === 'admin'},
    filteredList() {
      return this.$store.state.items.filter(item => {
        const matchesSearch = item.item_name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesCategory = this.selectedCategory === 'all' || item.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });
    }
  },
  methods: {
    async getItem() {
      this.isLoading = true;
      await this.$store.dispatch('getItems');
      this.isLoading = false;
    },
    addToOrders(items_id) {
      this.$store.dispatch('addToOrders', items_id);
    },
    deleteItem(id) {
      this.$store.dispatch('deleteItem', id);
    },
  },
  mounted() {
    this.getItem();
    console.log(this.$store.state.items);
  }
};
</script>

<style>
.items {
    margin-top: 5%;
    margin-bottom: auto;
}

table {
    background-color: aliceblue;
    border-collapse: collapse;
    margin: auto;
}

td {
    padding: 15px;
    border: solid 1px navy;
}

th {
    border: solid 1px black;
}
button{
    background-color: #2c3e50;
    color: aliceblue;
}
.category{
  text-transform: capitalize;
}
#itemsText{
  display: none;
}

    @media screen and (max-width: 768px) {
    .items {
        max-height:px;
        /* Adjust height as needed */
        width: 600px;
        margin-right: auto;
        margin-left: auto;
        /* Enables vertical scrolling */
        overflow-x: auto;
        /* Enables horizontal scrolling */
    }

    table {
        width: 100%;
        /* This ensures the table takes full width */
        border-collapse: collapse;
    }

    th,
    td {
        padding: 8px;
        text-align: left;
        border: 1px solid #ddd;
    }
}

@media screen and (max-width: 500px) {
    .items {

        max-height: px;
        /* Adjust height as needed */
        /* overflow-y: auto ; */
        width: 300px;
        margin-top: 5%;
        margin-right: auto;
        margin-left: auto;
        /* Enables vertical scrolling */
        overflow-x: auto;
        /* Enables horizontal scrolling */
    }
    #itemsText{
  display: block;
}
  }

</style>