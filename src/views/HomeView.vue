<template>
  <div class="dashboard">
    <h1>Inventory Management Dashboard</h1>
    
    <SpinnerComp v-if="isLoading" />

    <div v-if="!isLoading" class="stats">
      <div class="stat">
        <h2>Total Items</h2>
        <p>{{ items.length }}</p>
      </div>
      <div class="stat">
        <h2>Total Users</h2>
        <p>{{ users.length }}</p>
      </div>
      <div class="stat">
        <h2>Total Orders</h2>
        <p>{{ orders.length }}</p>
      </div>
    </div>

    <div class="data-section" v-if="!isLoading">
      <h3>Recent Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Item ID</th>
            <th>Status</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.order_id">
            <td>{{ order.order_id }}</td>
            <td>{{ order.user_id }}</td>
            <td>{{ order.item_id }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.order_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SpinnerComp from '@/components/SpinnerComp.vue'; // Import the spinner component

export default {
  components: {
    SpinnerComp,
  },
  data() {
    return {
      isLoading: true,
      items: [],
      users: [],
      orders: [],
    };
  },
  async created() {
    await this.fetchItems();
    await this.fetchUsers();
    await this.fetchOrders();
    this.isLoading = false; // Once data is fetched, set loading to false
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('https://capstone-lvcc.onrender.com/items');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('https://capstone-lvcc.onrender.com/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchOrders() {
      try {
        const response = await axios.get('https://capstone-lvcc.onrender.com/items/orders');
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
  },
};
</script>

<style scoped>
/* (Your styles here) */
</style>