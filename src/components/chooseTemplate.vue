<template>
<h2>2. Wähle den Vertrag aus, den du erstellen willst:</h2>
  <h3>Contracts</h3>
  <input type="radio" id="c-rv-pp" value="c-rv-pp">
  <label for="c-rv-pp">Rahmenvereinbarung Projektpartner</label>
  <input type="radio" id="c-ev-pp" value="c-ev-pp">
  <label for="c-ev-pp">Projekteinzelauftrag Projektpartner</label>

  <h3>Contracts - Englisch</h3>
  <input type="radio" id="c-rv-pp-eng" value="c-rv-pp-eng">
  <label for="c-r-pp-eng">Rahmenvereinbarung Projektpartner</label>
  <input type="radio" id="c-ev-pp-eng" value="c-ev-pp-eng">
  <label for="c-r-pp-eng">Projekteinzelauftrag Projektpartner</label>
<!--
  <h3>IT Perm</h3>
  <input type="radio" id="p-rv-mitNach" value="p-rv-mitNach">
  <label for="p-rv-mitNach">Rahmenvertrag mit Nachbesetzung</label>
  <input type="radio" id="p-rv-ohneNach" value="p-rv-ohneNach">
  <label for="p-rv-ohneNach">Rahmenvertrag ohne Nachbesetzung</label>
  <input type="radio" id="p-rv-mitNachmitVer" value="p-rv-mitNachmitVer">
  <label for="p-rv-mitNachmitVer">Rahmenvertrag mit Nachbesetzung und Abweichenden Vereinbarungen</label>
  <input type="radio" id="p-rv-ohneNachmitVer" value="p-rv-ohneNachmitVer">
  <label for="p-rv-ohneNachmitVer">Rahmenvertrag ohne Nachbesetzung mit Abweichenden Vereinbarungen</label>
  <input type="radio" id="p-rv-mitRe" value="p-rv-mitRe">
  <label for="p-rv-mitRe">Rahmenvertrag mit Rückerstattung</label>
  <input type="radio" id="p-rv-ohneNach" value="p-rv-ohneNach">
  <label for="p-rv-ohneNach">Rahmenvertrag ohne Nachbesetzung</label>
 -->
  <button id="logoutButton" class="btn btn-outline-primary" @click="logout"><b>Logout</b></button>
</template>

<script>
import router from "@/router";

export default {
  name: "chooseTemplate",
  methods: {
    logout(){
      localStorage.clear();
      localStorage.setItem('userInfo', "");
      router.push('/');
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

  .btn-outline-primary {
    color: #007772;
    border-color: #007772;
  }

  .btn-outline-primary:hover {
    color: white;
    background-color: #007772;
  }

</style>