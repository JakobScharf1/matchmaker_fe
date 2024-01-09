<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>
<h2>Bitte wähle aus, was für eine Vertragsart du erstellen willst:</h2>
  <button class="btn btn-primary" @click="toLegal">Kundenvertrag</button><br />
  <button class="btn btn-primary" @click="toNormal">Projektpartnervertrag</button>

  <button id="logoutButton" class="btn btn-outline-primary" @click="logout"><b>Logout</b></button>
</template>

<script>
import router from "@/router";

export default {
  name: 'chooseTemplateType',
  methods: {

    toLegal() {
      router.push('chooseTemplateLegal');
    },
    toNormal() {
      router.push('chooseTemplate');
    },
    pageBack(){
      router.go(-1);
    },
    logout(){
      localStorage.clear();
      localStorage.setItem('idToken', "");
      router.push('/login');
    },
  }
}

</script>

<style scoped>

#logoutButton {
  position: fixed;
  top: 10px;
  right: 10px;
}

.btn-primary {
  background-color: #007772;
  border-color: #007772;
  margin-top: 1rem;
}

h2 {
  margin-top: 2rem;
}

.btn-outline-primary {
  color: #007772;
  border-color: #007772;
}

.btn-outline-primary:hover {
  color: white;
  background-color: #007772;
}

</style>