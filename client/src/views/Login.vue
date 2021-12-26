<template>
    <div>
         <div class="row">
             <div class="card mx-auto">
                 <div class="card-header text-white bg-primary">
                      <h4>Login</h4>
                 </div>
                 <div class="card-body">
                     <form @submit.prevent="loginUser">
                          <div class="form-group">
                              <label for="username">Username</label>
                              <input 
                              id="username"
                              type="text"
                              placeholder="username"
                              name="username"
                              v-model="username"
                              class="form-control"
                              >
                          </div>
                          <div class="form-group">
                              <label for="password">Password</label>
                              <input 
                              id="password"
                              type="password"
                              placeholder="password"
                              name="password"
                              v-model="password"
                              class="form-control"
                              >
                          </div><br>
                          <button class="btn btn-primary">Login</button>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <router-link class="nav-link" :to="{name:'Register'}">Need an account?</router-link>
                     </form>
                 </div>
             </div>       
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex"

    export default {
        name:'Login',
        data(){
            return{
                username:"",
                password:""
            }
        },
        methods: {
            ...mapActions(["login"]),
            loginUser(){  
                let user = {
                    username: this.username,
                    password:this.password
                }
                this.login(user).then( res => {
                    if(res.data.success){
                        this.$router.push('/profile');
                    }
                }).catch(err => {
                    console.log(err)
                })

            }
        }
    }
</script>
 
<style>
.card{
    width: 60%;
    border-radius: 0;
}

.btn{
    border-radius: 0;
}

.form-control{
    border-radius: 0;
}
</style>