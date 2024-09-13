<template>
    <div>
      <spinner-comp :isVisible="isLoading" />
      <p id="itemsText">Rotate for a better view on your mobile</p>
      <router-link to="/addItem"><button>Add Item</button></router-link>
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
          <tr v-for="item in $store.state.items" :key="item.items_id">
            <td>{{ item.items_id }}</td>
            <td>{{ item.item_name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.brand }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <td>
              <router-link :to="{name:'updateItem', params:{id: item.items_id}}"><button>Edit</button></router-link>
              <button @click="deleteItem(item.items_id)">Delete</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import SpinnerComp from '@/components/SpinnerComp.vue'
  
  export default {
    components: { SpinnerComp },
    name: 'itemsView',
    data() {
      return {
        isLoading: true
      }
    },
    methods: {
      async getItem() {
        this.isLoading = true;
        await this.$store.dispatch('getItems');
        this.isLoading = false;
      },
     
      deleteItem(items_id){
        if(confirm("Are you sure you want to delete this item??")){

            this.$store.dispatch('deleteItem', items_id)
            console.log(items_id);
        }
        
      }
    },
    mounted() {
      this.getItem();
    }
  }
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