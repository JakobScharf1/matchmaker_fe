import { createRouter, createWebHistory } from "vue-router";
import MatchIDInput from "@/components/MatchIDInput.vue";
import LoginSSO from "@/views/LoginSSO.vue";
import chooseTemplate from "@/components/chooseTemplate.vue";

const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
        path: '/home',
        component: MatchIDInput,
    },
    {
        path: '/login',
        component: LoginSSO
    },
    {
        path: "/chooseTemplate",
        component: chooseTemplate
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router