import axios from "axios"
import EventServices  from "../../services/EventServices";
import router from "../../router/index"

const state = {
     token: localStorage.getItem("token") || "",
     user(){

     },
      status:"",
}

const getters = {
    isLoggedIn: (state) => !!state.token,
    authState: (state) => state.status,
    user: (state) => state.user,
}

const actions = {
  //login actions
  async login({commit} , user){
      commit('auth_request');
      let res = await EventServices.loginEvent( user );
      if(res.data.success){
        const token = res.data.token;
        const user = res.data.user
        //store the token into the localstorage
        localStorage.setItem('token' , token);
        //set the axios default
        axios.defaults.headers.common['Authorization'] = token;
        commit('auth_success' , token , user);
      }
      return res;
  },
  
  //register users
  async registerUser({commit} , user){
    commit('register_request')
     let res = await EventServices.registerEvent(user);
     if(res.data.success !== undefined){
         commit('register_success');
     }
     return res;
  },

  //get the user profiles
  async getProfile({commit}){
      commit('profile_request');
      let res = await EventServices.getUserProfile();
      commit('user_profile' , res.data.user)
      return res;
   },

  //log out user
  async logout({commit}){
    await localStorage.removeItem('token');
    commit('logout');
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
    location.reload();
    return
  },
}; 

const mutations = {
     auth_request(state){
        state.status = "loading"
     },

     auth_success(state , token , user){
        state.token = token;
        state.user = user;
        state.success = "success"; 
     }
     , 
     //register mutations
     register_request(state){
        state.status = 'loading'
     },
     register_success(state){
        state.status = 'success' 
     },
     logout(state){
        state.status = "",
        state.token = "",
        state.user = ""
     },
     profile_request(state){
        state.status = 'loading'
     },
     user_profile(state , user){
        state.user = user
     }
}

export default {
    state,
    getters,
    actions,
    mutations
}