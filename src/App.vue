<template>
  <div class="mainDiv">

    <navbar-comp/>
    
    <router-view/>

    <FooterComp />
  </div>
</template>

<script>
import NavbarComp from './components/NavbarComp.vue';
import FooterComp from './components/FooterComp.vue';
export default {
  components: { NavbarComp, FooterComp  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: white;
  
}
body{
 
  background-size: 100vh;
  background: linear-gradient(45deg,#2c3e50, #bdc3c7);
  background-repeat: no-repeat;
  
}
.mainDiv{
  display: grid;
  grid-template-rows: auto minmax(100dvh, 100%) auto;
  background-size: 100vh;
}
button{
  background-color: #2c3e50;
  color: #bdc3c7;
}
</style>
