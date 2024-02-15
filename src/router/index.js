import { createRouter, createWebHistory } from "vue-router";
import MatchIDInput from "@/components/MatchIDInput.vue";
import LoginSSO from "@/views/LoginSSO.vue";
import chooseTemplate from "@/components/chooseTemplate.vue";
import chooseTemplateLegal from "@/components/chooseTemplateLegal.vue";
import chooseTemplateType from "@/components/chooseTemplateType.vue";

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
    },
    {
        path: "/chooseTemplateType",
        component: chooseTemplateType
    },
    {
        path: "/chooseTemplateLegal",
        component: chooseTemplateLegal
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router