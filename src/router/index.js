import { createRouter, createWebHistory } from "vue-router";
import MatchIDInput from "@/components/MatchIDInput.vue";
import LoginSSO from "@/components/LoginSSO.vue";
import chooseTemplateFormats from "@/components/ChooseTemplateFormats.vue";
import chooseTemplateDocuSign from "@/components/consultants/ChooseTemplateDocuSign.vue";
import chooseTemplateDocx from "@/components/consultants/ChooseTemplateDocx.vue";
import chooseTemplateLegalDocuSign from "@/components/legal/ChooseTemplateLegalDocuSign.vue";
import chooseTemplateLegalDocx from "@/components/legal/ChooseTemplateLegalDocx.vue";
import chooseTermination from "@/components/legal/ChooseTermination.vue";
import createOffer from "@/components/leaders/createOffer.vue";
import createAdditionalAgreements from "@/components/legal/createAdditionalAgreements.vue";
import chooseType from "@/components/leaders/chooseType.vue";

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
        name: 'ID-Input',
        path: '/start',
        component: MatchIDInput,
    },
    {
        name: 'Typ-Auswahl',
        path: '/chooseType',
        component: chooseType
    },
    {
        name: 'Format',
        path: "/chooseFormat",
        component: chooseTemplateFormats,
    },
    {
        name: 'DocuSign-Verträge',
        path: "/chooseTemplateDocuSign",
        component: chooseTemplateDocuSign,
    },
    {
        name: 'DOCX-Verträge',
        path: "/chooseTemplateDocx",
        component: chooseTemplateDocx,
    },
    {
        name: 'DocuSign-Verträge Legal',
        path: "/chooseTemplateLegalDocuSign",
        component: chooseTemplateLegalDocuSign,
    },
    {
        name: 'DOCX-Verträge Legal',
        path: "/chooseTemplateLegalDocx",
        component: chooseTemplateLegalDocx,
    },
    {
        name: 'Kündigungen',
        path: "/chooseTermination",
        component: chooseTermination,
    },
    {
        name: 'Angebotserstellung',
        path: "/createOffer",
        component: createOffer,
    },
    {
        name: 'Zusatzvereinbarungen',
        path: '/createAgreement',
        component: createAdditionalAgreements
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
