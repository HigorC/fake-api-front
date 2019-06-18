<template>
  <div id="app">
    <Header/>
    <!-- <Footer/> -->
     <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import Header from "./components/Header";
// import Footer from "./components/Footer";

export default {
  name: "app",
  data:function(){
    return {
      isLoading: false
    }
  },
  components: {
    Header
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
