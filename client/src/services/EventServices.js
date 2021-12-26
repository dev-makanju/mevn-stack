import axios from "axios";

const apiClient = axios.create({ 
    baseURL:'http://localhost:5000/api/',
});

export default {
    loginEvent(user){
        return apiClient.post('users/login',user)
    },
    registerEvent(user){
        return apiClient.post('/users/register' , user);
    }
}