<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs"></BreadCrumbs>
  <button class="btn btn-primary chooseButtons" @click="toPP()">Projektpartnervertrag</button><br />
  <button class="btn btn-primary chooseButtons" @click="toOffer()">Angebot</button>
</template>

<script>
import router from "@/router";
import { logout } from "@/firebase-config";
import BreadCrumbs from "@/elements/BreadCrumbs.vue";
import {useGlobalStore} from "@/stores/global";

export default {
  name: 'chooseType',
  components: {BreadCrumbs},
  data() {
    return {
      breadcrumbs: [
        { name: 'ID-Input', path: this.$router.resolve({ name: 'ID-Input' }).href },
        { name: 'Typ', path: this.$router.resolve({ name: 'Typ' }).href }
      ],
      gStore: useGlobalStore()
    }
  },
  beforeMount() {
    this.gStore.updateIsLogin(false)
  },
  methods: {
    logout,
    toPP() {
      router.push('/consultants/docusign');
    },
    toOffer() {
      router.push('/leaders/offer');
    },
  },
}

</script>