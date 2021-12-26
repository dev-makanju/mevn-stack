<template>
    <div>
         <h1>Login</h1>
         <div class="row">
             <div class="card mx-auto">
                 <div class="card-header text-white bg-primary">
                      <h4>Login</h4>
                 </div>
                 <div class="card-body">
                     <form @submit.prevent="regUser">
                          <div class="form-group">
                              <label for="name">Name</label>
                              <input 
                              id="name"
                              type="text"
                              placeholder="name"
                              name="name"
                              v-model="name"
                              class="form-control"
                              >
                          </div>
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
                              <label for="email">Email</label>
                              <input 
                              id="email"
                              type="email"
                              placeholder="email"
                              name="email"
                              v-model="email"
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
                          </div>
                          <div class="form-group">
                              <label for="conf_pass">Confirm Password</label>
                              <input 
                              id="conf_pass"
                              type="password"
                              placeholder="Confirm Password"
                              name="conf_pass"
                              v-model="conf_pass"
                              class="form-control"
                              >
                          </div><br>
                          <button class="btn btn-primary">Register </button>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <router-link class="nav-link" :to="{name:'Login'}">Already a member?</router-link>
                     </form>
                 </div>
             </div>       
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name:"register",
        data(){
            return{
                name:'',
                username:'',
                email:'',
                password:'',
                conf_pass:'',
            }
        },
        methods:{
            ...mapActions(['registerUser']),
            regUser(){
                let user = {
                    name:this.name,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    confirm_password: this.conf_pass,
                }
                this.registerUser(user).then( res => {
                    if(res.data.success){
                        this.$router.push("login");
                        console.log(res);
                    }
                }).catch(err => {
                    console.log(err);
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
