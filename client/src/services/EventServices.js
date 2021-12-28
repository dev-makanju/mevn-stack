import axios from "axios";

const apiClient = axios.create({ 
    baseURL:'http://localhost:5000/api/',
    headers: {
        'Access-Control-Allow-Origin': '',
    }
});

export default {
    loginEvent(user){
        return apiClient.post('users/login',user)
    },
    registerEvent(user){
        return apiClient.post('/users/register' , user);
    },
    //get user profile
    getUserProfile(){
        const token = localStorage.getItem("token");
        return apiClient.get( 'users/profile' ,  { 
            headers: {
                'Authorization': token
            }
         });
    }
}