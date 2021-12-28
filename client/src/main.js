import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios"

let app = createApp(App)

//setting up vue default http modules for api
app.config.globalProperties.$http =  axios;

//load the token from localstorage
const token = localStorage.getItem("token"); 

//If there is any token we append it to the http default axios authorisation headers 
if(token){
    app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token;
}

createApp(App).use(store).use(router).mount("#app");
