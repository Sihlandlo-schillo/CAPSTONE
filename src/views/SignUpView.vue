<template>
    <div class="register">
        <h1>Sign Up</h1>
        {{ error }}
        <input type="text" placeholder="first name" v-model="name"> <br>
        <input type="text" placeholder="last name" v-model="surname"><br>
        <input type="text" placeholder="email" v-model="email"><br>
        <input type="text" placeholder="password" v-model="password"><br><br>
        <button @click="insertUser()">Register</button>
        <br>
        <p>Already have an account? <router-link to="/">Sign In</router-link></p>
    </div>
</template>
<script>
export default {
    name:'SignUpView',
    data(){
        return{
            name:'',
            surname:'',
            email:'',
            password:''
        }
    },
    methods:{
        insertUser(){
            this.$store.dispatch('insertUser',this.$data)
        }
    },
    computed:{
        error(){
            return this.$store.state.errorRegister
        }
    }
    
}
</script>
<style>
    .register{
        width: 400px;
        height: 550px;
        border: 1px solid;
        margin-top: 5%;
        margin-right: auto;
        margin-left: auto;
        padding-top: 20px;
        background-color: lightgray;
        border-radius: 20px;
    }
    .register input{
        width: 300px;
        height: 40px;
        padding-left: 20px;
        display: block;
        margin-bottom: px ;
        margin-left: auto;
        margin-right: auto;
        border-radius:20px;
    }
    .register button{
        width: 300px;
        height: 40px;
        border-radius: 20px;
        background-color: #aaa4a4;
    }
    @media screen and (max-width: 400px) {
        .register{
        width: 300px;
        border: 1px solid;
        margin-right: auto;
        margin-left: auto;
        background-color: lightgray;
        border-radius: 20px;
    }
   
    .register input{
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
    .register button{
        width: 250px;
        height: 40px;
        background-color: #aaa4a4;
    }
    }
</style>