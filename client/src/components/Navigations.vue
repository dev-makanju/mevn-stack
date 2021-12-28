 <template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">   
    <router-link to="/" class="navbar-brand">PD Files</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto ml-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'About'}" class="nav-link active">About</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link :to="{name:'Login'}" class="nav-link active">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link :to="{name:'Register'}" class="nav-link active">Register</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link :to="{name:'Profile'}" class="nav-link active">Profile</router-link>
        </li>
        <li  class="nav-item" v-if="isLoggedIn">
          <a @click.prevent="logOutUser" href="/logout" class="nav-link active">logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
    import { mapGetters , mapActions } from 'vuex'

    export default {
          name:"Navigation", 
          methods:{
              ...mapActions(['logout']),
              logOutUser(){
                 this.logout()
              }
          },
          computed:{
              ...mapGetters([ "isLoggedIn"])
          }
    }
</script>
