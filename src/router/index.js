import { createRouter, createWebHistory } from "vue-router";
import MatchIDInput from "@/components/MatchIDInput.vue";
import LoginSSO from "@/components/LoginSSO.vue";
import chooseTemplateType from "@/components/ChooseTemplateType.vue";
import chooseTemplateFormats from "@/components/ChooseTemplateFormats.vue";
import chooseTemplateDocuSign from "@/components/consultants/ChooseTemplateDocuSign.vue";
import chooseTemplateDocx from "@/components/consultants/ChooseTemplateDocx.vue";
import chooseTemplateLegalDocuSign from "@/components/legal/ChooseTemplateLegalDocuSign.vue";
import chooseTemplateLegalDocx from "@/components/legal/ChooseTemplateLegalDocx.vue";
import chooseTermination from "@/components/legal/ChooseTermination.vue";
import createOffer from "@/components/createOffer.vue";

const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
        path: '/login',
        component: LoginSSO
    },
    {
        path: '/start',
        component: MatchIDInput,
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
    {
        path: "/chooseTermination",
        component: chooseTermination
    },
    {
        path: "/createOffer",
        component: createOffer
    }



]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
