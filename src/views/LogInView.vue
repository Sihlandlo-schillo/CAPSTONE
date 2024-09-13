<template>
    <div class="login">
        <h1>LOGIN</h1>
        {{ error }}
        <input type="text" placeholder="email" v-model="email"> <br>
        <input type="text" placeholder="password" v-model="password"><br><br>
        <button  @click="logInUser()">Log in</button>
        <br>
        <p>Do not have an account? <router-link to="/signUp">Sign Up</router-link></p>
    </div>
    
</template>
<script>
export default {
    name: 'LogInView',
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods:{
        logInUser(){
            this.$store.dispatch('logInUser', this.$data)
            console.log(this.email, this.password);
            // location.reload()
        }
    },
    computed:{
        error(){
            return this.$store.state.errorLogin
        }
    }
}
</script>
<style>
    .login{
        border: 1px solid #aeacac;
        width: 400px;
        height: 400px;
        margin-right: auto;
        margin-left: auto;
        margin-top: 10%;
        background-color: lightgray;
        padding-top: 40px;
        border-radius: 20px;
    }
    .login input{
        width: 300px;
        height: 40px;
        padding-left: 20px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid ;
        border-radius: 20px ;
    }
    .login button{
        width: 300px;
        height: 40px;
        background-color: #aeacac;
        border-radius: 20px;
    }

    @media screen   and (max-width: 400px) {
        .login{
            width: 300px;
        }
        .login input{
        width: 250px;
        height: 40px;
        padding-left: 20px;
        display: block;
        margin-bottom: 0px ;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid ;
    }
    .login button{
        width: 250px;
        height: 40px;
        background-color: #aeacac;
    }
    }
</style>