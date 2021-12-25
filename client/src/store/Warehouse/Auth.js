import axios from 'axios'; 
import router from '../../router/index'

const state = {
     token: localstorage.getItem("token") || "",
     user(){

     },
     status:''
}

const getters = {
     isLoggedIn: state => !state.token,
     authState: state => state.status,
     user: state.user
}

const actions = {

}

const mutations = {
     
}

export default {
    state,
    getters,
    actions,
    mutations
}