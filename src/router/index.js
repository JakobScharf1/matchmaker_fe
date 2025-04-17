/* eslint-disable no-unused-vars */
import {createRouter, createWebHistory} from "vue-router";
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
import BackendService from "@/services/BackendService";

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
        name: 'Format',
        path: "/format",
        component: chooseTemplateFormats,
    },
    {
        name: 'Legal',
        path: '/legal',
        children: [
            {
                name: 'DocuSign-Verträge Legal',
                path: "docusign",
                component: chooseTemplateLegalDocuSign,
            },
            {
                name: 'DOCX-Verträge Legal',
                path: "docx",
                component: chooseTemplateLegalDocx,
            },
            {
                name: 'Kündigungen',
                path: "termination",
                component: chooseTermination,
            },
            {
                name: 'Zusatzvereinbarungen',
                path: 'agreement',
                component: createAdditionalAgreements
            }
        ]
    },
    {
        name: 'Consultants',
        path: '/consultants',
        children: [
            {
                name: 'DocuSign-Verträge',
                path: "docusign",
                component: chooseTemplateDocuSign,
            },
            {
                name: 'DOCX-Verträge',
                path: "docx",
                component: chooseTemplateDocx,
            },
        ]
    },
    {
      name: 'Leaders',
      path: '/leaders',
      children: [
          {
              name: 'Angebotserstellung',
              path: "offer",
              component: createOffer,
          },
          {
              name: 'Typ',
              path: 'type',
              component: chooseType
          },
      ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    if (process.env.VUE_APP_DEV_MODE === "true") {
        console.log("Development mode enabled. Skipping user verification.");
        return true; // Allow navigation without verification
    }

    if (to.path !== '/login') {
        if (localStorage.getItem("token") != null) {
            BackendService.verifyUser().then(isValid => {
                if (!isValid) {
                    router.push("/login");
                }
            }).catch(error => {
                console.log("Verification error in beforeEach: ", error);
                router.push("/login");
            });
        } else {
            router.push("/login");
        }
    }
});

export default router
