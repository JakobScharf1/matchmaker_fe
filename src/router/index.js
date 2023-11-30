import { createRouter, createWebHistory } from "vue-router";
import MatchIDInput from "@/components/MatchIDInput.vue";
import LoginSSO from "@/views/LoginSSO.vue";
import axios from "axios";

const guard = function(to,from,next) {
    // check for valid auth token
/*localStorage.getItem("Auth").
    localStorage.getItem("Auth").then(response => {
        // Token is valid, so continue
        localStorage.setItem("AuthKey", response.data)
        next();
    }).catch(error => {
        console.log(error)
        // There was an error so redirect
        window.location.href = "/";
    })*/

    axios.get("Auth").then(response => {
        // Token is valid, so continue
        localStorage.setItem("AuthKey", response.data)
        next();
    }).catch(error => {
        console.log(error)
        // There was an error so redirect
        window.location.href = "/";
    })
};

const routes = [
    {
        path: '/home',
        component: MatchIDInput,
        beforeEnter: (to, from, next) => {
            guard(to, from, next);
        }
    },
    {
        path: '/',
        component: LoginSSO
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router