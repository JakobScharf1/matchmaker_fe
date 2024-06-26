import { createRouter, createWebHistory } from "vue-router";
import MatchIDInput from "@/components/MatchIDInput.vue";
import LoginSSO from "@/views/LoginSSO.vue";
import chooseTemplateType from "@/components/chooseTemplateType.vue";
import chooseTemplateFormats from "@/components/chooseTemplateFormats.vue";
import chooseTemplateDocuSign from "@/components/consultants/chooseTemplateDocuSign.vue";
import chooseTemplateDocx from "@/components/consultants/chooseTemplateDocx.vue";
import chooseTemplateLegalDocuSign from "@/components/legal/chooseTemplateLegalDocuSign.vue";
import chooseTemplateLegalDocx from "@/components/legal/chooseTemplateLegalDocx.vue";
//import chooseTermination from "@/components/legal/chooseTermination.vue";

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
        path: "/chooseTemplateFormats",
        component: chooseTemplateFormats
    },
    {
        path: "/chooseTemplateType",
        component: chooseTemplateType
    },
    {
        path: "/chooseTemplateDocuSign",
        component: chooseTemplateDocuSign
    },
    {
        path: "/consultants/chooseTemplateDocx",
        component: chooseTemplateDocx
    },
    {
        path: "/chooseTemplateLegalDocuSign",
        component: chooseTemplateLegalDocuSign
    },
    {
        path: "/chooseTemplateLegalDocx",
        component: chooseTemplateLegalDocx
    },
    {
        path: "/chooseTemplateDocx",
        component: chooseTemplateDocx
    },
    //{
    //    path: "/chooseTermination",
    //    component: chooseTermination
    //}



]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
