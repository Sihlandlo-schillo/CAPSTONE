<template>
  <div class="dashboard">
    <h1>Inventory Management Dashboard</h1>
    
    <div class="stats">
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

    <div class="data-section">
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
import axios from 'axios'

export default {
  data() {
    return {
      items: [],
      users: [],
      orders: [],
    };
  },
  async created() {
    await this.fetchItems();
    await this.fetchUsers();
    await this.fetchOrders();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:6262/items');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:6262/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchOrders() {
      try {
        const response = await axios.get('http://localhost:6262/items/orders');
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}

.stat {
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  text-align: center;
  
}

.data-section {
  margin-top: 40px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

@media screen and (max-width: 500px) {
    .dashboard{
    width: 370px;
    }
    .stats {
        max-height: 300px;
        /* Adjust height as needed */
        
        /* Enables vertical scrolling */
        overflow-x: auto;
        /* Enables horizontal scrolling */
    }
    .data-section {
        max-height: 300px;
        /* Adjust height as needed */
        overflow-y: auto;
        /* Enables vertical scrolling */
        overflow-x: auto;
        /* Enables horizontal scrolling */
    }
    @media screen and (max-width: 350px){
      .dashboard{
        width: 300px;
      }
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

</style>
