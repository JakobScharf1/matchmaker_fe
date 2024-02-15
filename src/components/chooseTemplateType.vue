<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
<h2>Bitte wähle aus, was für eine Vertragsart du erstellen willst:</h2>
  <button class="btn btn-primary" @click="toLegal">Kundenvertrag</button><br />
  <button class="btn btn-primary" @click="toNormal">Projektpartnervertrag</button>
</template>

<script>
import router from "@/router";
import { logout } from "@/firebase-config";

export default {
  name: 'chooseTemplateType',
  methods: {
    logout,
    toLegal() {
      router.push('chooseTemplateLegal');
    },
    toNormal() {
      router.push('chooseTemplate');
    },
    pageBack(){
      router.go(-1);
    },
  }
}

</script>

<style scoped>
</style>