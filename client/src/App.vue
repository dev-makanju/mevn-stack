<template>
  <div id="nav">
    <Navigation/>
    <div class="container">
        <router-view/> 
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigations.vue"
export default {
  components:{
     Navigation
  }
}
</script>

<style>

</style>
