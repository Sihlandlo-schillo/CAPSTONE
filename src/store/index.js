import axios from 'axios';
import { createStore } from 'vuex';
import router from '@/router';
import { useCookies } from 'vue-cookies';

const $cookies = useCookies();  // Make sure you have properly imported and initialized this

const api_url = 'https://capstone-lvcc.onrender.com';

axios.defaults.headers.common['Authorization'] = `Bearer ${$cookies.get('token')}`;
 /* eslint-disable */
export default createStore({
  state: {
    users: null,
    user: null,
    userError: null,
    items: null,
    item: null,
    errorAddItem: null,
    currentItem: {},
    orders: null,
    order: null,
    errorLogin: null,
    errorRegister: null
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setUserError(state, error) {
      state.userError = error;
    },
    setErrorLogin(state, payload) {
      state.errorLogin = payload;
    },
    setErrorRegister(state, payload) {
      state.errorRegister = payload;
    },
    setItems(state, payload) {
      state.items = payload;
    },
    setItem(state, payload) {
      state.item = payload;
    },
    removeItem(state, items_id) {
      state.items = state.items.filter(item => item.items_id !== items_id);
    },
    setErrorAddItem(state, payload) {
      state.errorAddItem = payload;
    },
    SET_ITEM(state, item) {
      state.currentItem = item;
    },
    UPDATE_ITEM(state, updatedItem) {
      state.currentItem = updatedItem;
    },
    setOrders(state, payload) {
      state.orders = payload;
    },
    setOrder(state, payload) {
      state.order = payload;
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const { data } = await axios.get(`${api_url}/users`);
        commit('setUsers', data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async getUser({ commit }, users_id) {
      try {
        const { data } = await axios.get(`${api_url}/users/${users_id}`);
        commit('setUser', data);
      } catch (error) {
        console.error('Error fetching user:', error);
        commit('setUserError', error.message);
      }
    },
    async insertUser({ commit }, info) {
      try {
        const { data } = await axios.post(`${api_url}/users/insert`, info);
        await router.push('/');
        location.reload();
      } catch (error) {
        console.log('Error inserting user:', error.response.data);
        commit('setErrorRegister', error.response.data);
      }
    },
    async logInUser({ commit }, { email, password }) {
      try {
        const { data } = await axios.post(`${api_url}/users/signIn`, { email, password });
        $cookies.set('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        await router.push('/home');
        location.reload();
      } catch (error) {
        console.log('Error logging in:', error.response.data);
        commit('setErrorLogin', error.response.data);
      }
    },
    async getItems({ commit }) {
      try {
        const { data } = await axios.get(`${api_url}/items/`);
        commit('setItems', data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    async insertItem({ commit }, info) {
      try {
        await axios.post(`${api_url}/items/insert`, info);
        await router.push('/items');
        location.reload();
      } catch (error) {
        console.log('Error adding item:', error.response.data);
        commit('setErrorAddItem', error.response.data);
      }
    },
    async deleteItem({ commit }, items_id) {
      try {
        const response = await axios.delete(`${api_url}/items/${items_id}`);
        if (response.status === 200) {
          commit('removeItem', items_id);
          console.log('Item deleted successfully');
        } else {
          console.error('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    },
    async fetchItem({ commit }, items_id) {
      try {
        const { data } = await axios.get(`${api_url}/items/${items_id}`);
        commit('SET_ITEM', data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    },
    async updateItem({ commit }, item) {
      try {
        const { data } = await axios.patch(`${api_url}/items/${item.items_id}`, item);
        commit('UPDATE_ITEM', data);
      } catch (error) {
        console.error('Error updating item:', error);
      }
    },
    async addToOrders({ commit }, items_id) {
      try {
        const { data } = await axios.post(`${api_url}/items/orders`, { id: items_id });
        console.log('Order added:', data);
      } catch (error) {
        console.error('Error adding to orders:', error);
      }
    },
    async getOrders({ commit }, info) {
      try {
        const { data } = await axios.get(`${api_url}/items/orders`, { params: info });
        commit('setOrders', data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  },
  modules: {}
});

