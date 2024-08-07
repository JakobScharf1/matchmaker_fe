import { createRouter, createWebHistory } from "vue-router";
import MatchIDInput from "@/components/MatchIDInput.vue";
import LoginSSO from "@/views/LoginSSO.vue";
import chooseTemplateType from "@/components/chooseTemplateType.vue";
import chooseTemplateFormats from "@/components/chooseTemplateFormats.vue";
import chooseTemplateDocuSign from "@/components/consultants/chooseTemplateDocuSign.vue";
import chooseTemplateDocx from "@/components/consultants/chooseTemplateDocx.vue";
import chooseTemplateLegalDocuSign from "@/components/legal/chooseTemplateLegalDocuSign.vue";
import chooseTemplateLegalDocx from "@/components/legal/chooseTemplateLegalDocx.vue";
import chooseTermination from "@/components/legal/chooseTermination.vue";
import MatchIDInput from "@/components/idinputs/MatchIDInput.vue";
import LoginSSO from "@/components/LoginSSO.vue";
import chooseTemplateType from "@/components/standard/ChooseTemplateType.vue";
import chooseTemplateFormats from "@/components/ChooseTemplateFormats.vue";
import chooseTemplateDocuSign from "@/components/standard/consultants/ChooseTemplateDocuSign.vue";
import chooseTemplateDocx from "@/components/standard/consultants/ChooseTemplateDocx.vue";
import chooseTemplateLegalDocuSign from "@/components/standard/legal/chooseTemplateLegalDocuSign.vue";
import chooseTemplateLegalDocx from "@/components/standard/legal/chooseTemplateLegalDocx.vue";
import chooseRequestType from "@/components/ChooseRequestType.vue";
import KundeIDInput from "@/components/idinputs/KundeIDInput.vue";
import PPIDInput from "@/components/idinputs/PPIDInput.vue";
//import chooseTermination from "@/components/legal/chooseTermination.vue";

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
      path: '/chooseRequestType',
      component: chooseRequestType
    },
    {
        path: '/matchIDInput',
        component: MatchIDInput,
    },
    {
      path: '/kundeIDInput',
      component: KundeIDInput
    },
    {
        path: '/ppIDInput',
        component: PPIDInput
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
    }



]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
