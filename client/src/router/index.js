import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from '../store';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
    meta:{
       requiresGuest:true, 
    }  
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
    import("../views/Register.vue"),
    meta:{
      requiresGuest:true, 
    }  
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import("../views/Profile.vue"),
    meta:{
      requiresAuth: true, 
    }  
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach( (to , from , next) => {
  if(to.matched.some( record => record.meta.requiresAuth )){
      if(!store.getters.isLoggedIn){
          // redirect to the login page
          next('/login')
      }else{
         next()
      }
  } else if(to.matched.some( record => record.meta.requiresGuest )){
    if(store.getters.isLoggedIn){
        // redirect to the profile page
        next('/profile')
    }else{
        next()
    }
  }else{
     next()
  }
})

export default router;
