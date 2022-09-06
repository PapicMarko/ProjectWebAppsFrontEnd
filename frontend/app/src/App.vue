<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link v-if="!checkJWT()" to="/about"> View Appointments</router-link>
      <router-link v-if="!checkJWT()" to="/registershop">| Register Shop</router-link>
      <router-link v-if="checkJWT()" to="/login">Login</router-link>
      <a v-if="!checkJWT()" @click="logUserOut()"> | Logout</a>
    </nav>
    <router-view/>
  </div>
</template>
<script>

export default {
  methods:{
    checkJWT(){
      let token = localStorage.getItem("jwt");
      if (token == null) return true;

    },
    logUserOut() {
        localStorage.removeItem("jwt");
        this.$router.push("/");
      }
    }
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
  color: #42b983;
}
</style>
