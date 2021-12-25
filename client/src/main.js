import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios"

createApp.prototype.$http = axios;

//load the token from localstorage
const token = localstorage.getTime("token");
//If there is any token we append it to the http default axios authorisation headers 
if(token){
    createApp.prototype.$http.defaults.headers.common['Authorization'] = token;
}

createApp(App).use(store).use(router).mount("#app");
