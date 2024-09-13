<template>
    <div class="addItem">
        <h1>ADD NEW ITEM</h1>
        <input type="text" placeholder="name" v-model="item_name"> <br><br>
        <input type="text" placeholder="category" v-model="category"><br><br>
        <input type="text" placeholder="brand" v-model="brand"><br><br>
        <input type="text" placeholder="quantity" v-model="quantity"><br><br>
        <input type="text" placeholder="price" v-model="price"> <br><br>
        {{ error }}
        <button @click="addItem()">ADD ITEM</button>
        <p>No longer want add new item? Go back to <router-link to="manageItems">Manage Items</router-link></p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            item_name:'',
            category:'',
            brand:'',
            quantity:'',
            price:''
        }
    },
    methods:{
        addItem(){
            this.$store.dispatch('insertItem',this.$data)
        }
    },
    computed:{
        error(){
            return this.$store.state.errorAddItem
        }
    }
}
</script>
<style scoped>
    .addItem{
        width: 400px;
        height: 700px;
        border: 1px solid;
        margin-top: 5%;
        margin-right: auto;
        margin-left: auto;
        padding-top: 20px;
        background-color: lightgray;
        border-radius: 20px;
    }
    .addItem input{
        width: 300px;
        height: 40px;
        padding-left: 20px;
        display: block;
        margin-bottom: px ;
        margin-left: auto;
        margin-right: auto;
        border-radius:20px;
    }
    .addItem button{
        width: 300px;
        height: 40px;
        border-radius: 20px;
        background-color: #aaa4a4;
    }
    p{
        /* margin-bottom: auto; */
        margin-top: 20px;
    }
    @media screen and (max-width: 400px) {
        .addItem{
        width: 300px;
        height: 650px;
        border: 1px solid;
        margin-right: auto;
        margin-left: auto;
        background-color: lightgray;
        border-radius: 20px;
    }
   
    .addItem input{
        width: 250px;
        height: 40px;
        padding-left: 20px;
        display: block;
        margin-top: 10%;
        margin-bottom: -30px ;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid ;
    }
    .addItem button{
        width: 250px;
        height: 40px;
        background-color: #aaa4a4;
    }
    }
</style>