import { createRouter, createWebHistory } from "vue-router";
import MatchIDInput from "@/components/MatchIDInput.vue";
import LoginSSO from "@/views/LoginSSO.vue";

const routes = [
    {
        path: '/home',
        component: MatchIDInput,
        /*meta: {
            requiresAuth: true
        }*/
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