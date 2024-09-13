<template>
    <div class="user-info">
      <h1>Profile</h1>
      <div v-if="user">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Surname:</strong> {{ user.surname }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>User Role:</strong> {{ user.userRole }}</p>
      </div>
      <div v-else>
        <p v-if="userError">{{ userError }}</p>
        <p v-else>Cannot load user info. Please try again later.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      user() {
        return this.$store.state.user;  // Access user data from Vuex store
      },
      userError() {
        return this.$store.state.userError;  // Access error message from Vuex store
      }
    },
    async created() {
      try {
        const userId = this.$route.params.id;  // Get user ID from route params
        await this.$store.dispatch('getUser', userId);  // Dispatch the action to fetch user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };
  </script>
  
  
  <style scoped>
  .user-info {
    padding: 20px;
   
    border-radius: 8px;
  }
  
  h1 {
    color: #333;
  }
  
  p {
    font-size: 16px;
    margin: 10px 0;
  }
  </style>
  