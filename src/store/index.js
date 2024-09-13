import axios from 'axios'
import { createStore } from 'vuex'

// eslint-disable-next-line
import {useCookies} from 'vue-cookies'
import router from '@/router'


/* eslint-disable */
// axios.defaults.withCredentials = true

axios.defaults.headers = $cookies.get('token')
// let api_url = 'http://localhost:6262'
let api_url = 'https://capstone-lvcc.onrender.com'


export default createStore({
  state: {
    users:null,
    user:null,
    userError:null,
    items:null,
    item:null,
    errorAddItem:null,
    currentItem: {},
    orders:null,
    order:null,
    errorLogin:null,
    errorRegister:null
  },
  getters: {
  },
  mutations: {
    setUsers(state,payload){
      state.users = payload
    },
    setUser(state,payload){
      state.user = payload
    },
    setUserError(state, error) {
      state.userError = error;  
    },
    setErrorLogin(state,payload){
      state.errorLogin = payload
    },
    setErrorRegister(state,payload){
      state.errorRegister = payload
    },
    setItems(state,payload){
      state.items = payload
    },
    setItem(state,payload){
      state.item = payload
    },
    removeItem(state, items_id){
      state.items = state.items.filter(item => item.id !== items_id)
    },
    setErrorAddItem(state,payload){
      state.errorAddItem = payload
    },
    SET_ITEM(state, item) {
      state.currentItem = item
    },
    UPDATE_ITEM(state, updatedItem) {
      state.currentItem = updatedItem
    },
    setOrders(state,payload){
      state.orders = payload
    },
    setOrder(state,payload){
      state.order = payload
    }
  },
  actions: {
    async fetchUsers({commit}){
      const data = await fetch(api_url+'/users')
      const users = await data.json()
      commit('setUsers',users)
    },
    async getUser({ commit }, users_id) {
      try {
        const response = await fetch(`${api_url}/users/${users_id}`);
  
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }
  
        const user = await response.json();
        commit('setUser', user);
  
      } catch (error) {
        console.error(error);
        commit('setUserError', error.message);
      }
    },
    async insertUser({commit}, info){
      try {
        commit('setErrorRegister', '')
        let {data} = await axios.post(api_url+'/users/insert',info)
        console.log(data);
        
        await router.push('/')
        location.reload()
        
      } catch (error) {
        console.log(error.response.data);
        commit('setErrorRegister',error.response.data)
      }
    },
    async logInUser({commit}, email, password){
      try {
        commit('setErrorLogin','')
        console.log('hehe')
        let {data} = await axios.post(api_url+'/users/signIn', email, password)
        console.log(data);
        $cookies.set('token', data.token)
  
        await router.push('/home')
        location.reload()
        
      } catch (error) {
        console.log(error.response.data);
        commit('setErrorLogin',error.response.data)
      }
    },

    // ITEMS ACTIONS
    async getItems({commit}){
      let {data} = await axios.get(api_url+'/items/')
      console.log(data);
      commit('setItems',data)
    },
    async insertItem({commit}, info){
      try {
        commit('setErrorAddItem','')
        let {item} = await axios.post(api_url+'/items/insert', info)
        console.log(item);
      
  
        await router.push('/items')
        location.reload()

      } catch (error) {
        console.log(error.response.data);
        commit('setErrorAddItem',error.response.data)
        
      }
    },
    async deleteItem({commit}, items_id){
      try {
        const response = await fetch(`http://localhost:6262/items/${items_id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          commit('removeItem', items_id);
          console.log("Item deleted successfully");
        } else {
          console.error("Failed to delete item");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
      
    },

    async fetchItem({ commit }, items_id) {
      try {
        const response = await fetch(`http://localhost:6262/items/${items_id}`);
        if (response.ok) {
          const item = await response.json();
          commit('SET_ITEM', item);
        } else {
          console.error('Failed to fetch item');
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    },
   async updateItem({ commit }, item) {
      try {
        const response = await fetch(`http://localhost:6262/items/${item.items_id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });
    
        if (response.ok) {
          const updatedItem = await response.json();
          commit('UPDATE_ITEM', updatedItem);
        } else {
          console.error('Failed to update item');
        }
      } catch (error) {
        console.error('Error updating item:', error);
      }
    },

    // ORDERS ACTIONS
    async addToOrders({commit},items_id){
      console.log(items_id);
      let {data} = await axios.post(api_url+'/items/orders',{id: items_id})
      
      console.log(data);
    },
    async getOrders({commit},info){
      let {data} = await axios.get(api_url+'/items/orders',info)
      console.log(data);
      commit('setOrders',data)
    }

  },
  modules: {
  }
})
