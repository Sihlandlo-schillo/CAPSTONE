<template>
    <nav class="navbar navbar-expand-lg bg-body-secondary sticky-top">
        <div class="container-fluid p-3">
            <div>
            </div>
            <router-link class="navbar-brand" to="#"><img src="https://sihlandlo-schillo.github.io/HOSTEDIMAGES/images/FASHIONSEEN.png" alt="logo"></router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul v-if="!$cookies.get('token')" class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" to="/userInfo">USER Info</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Sign In</router-link>
                    </li> -->
                   
                </ul>
                <ul v-else class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/home">HOME</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">ABOUT</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/items">ITEMS</router-link>
                    </li> 
                    <li class="nav-item">
                        <router-link class="nav-link" to="/orders">ORDERS</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/userInfo">PROFILE</router-link>
                    </li>
                        <li class="nav-item mt-2 ">
                            <button @click="logout()">
                                LOGOUT
                            </button>
                        </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import router from '@/router';

/* eslint-disable */
export default {
    methods:{
        // some methods
       async logout() {
      !$cookies.remove('token')
      
      await router.push({name: 'signIn'})
      
      location.reload()
    }
    }
}
</script>
<style scoped>
    img{
    width: 117px;
    height: 73px;
    border-radius: 15px;
    }
</style>