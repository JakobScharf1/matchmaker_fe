<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>

<h2>2. Wähle den Vertrag aus, den du erstellen willst:</h2>
  <h3>Contracts</h3>
  <input type="radio" id="c-rv-pp" value="c-rv-pp" name="radio" @click="confirmClick()">
  <label for="c-rv-pp">Rahmenvereinbarung Projektpartner</label><br/>
  <input type="radio" id="c-ev-pp" value="c-ev-pp" name="radio" @click="confirmClick()">
  <label for="c-ev-pp" @click="confirmClick()">Projekteinzelauftrag Projektpartner</label><br/>

  <h3>Contracts - Englisch</h3>
  <input type="radio" id="c-rv-pp-eng" value="c-rv-pp-eng" name="radio" @click="confirmClick()">
  <label for="c-rv-pp-eng" @click="confirmClick()">Rahmenvereinbarung Projektpartner</label><br/>
  <input type="radio" id="c-ev-pp-eng" value="c-ev-pp-eng" name="radio" @click="confirmClick()">
  <label for="c-ev-pp-eng" @click="confirmClick()">Projekteinzelauftrag Projektpartner</label><br/>
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
  <button class="btn" v-bind:class="{'bestatigen-button btn-outline-primary': !confirmed, 'btn-primary': confirmed}" @click="chooseTemplate">Bestätigen</button>
  <button id="logoutButton" class="btn btn-outline-primary" @click="logout"><b>Logout</b></button>
</template>

<script>
import router from "@/router";

export default {
  name: "chooseTemplate",
  data() {
    return {
      confirmed: false,
      powerFormsURL: ""
    }
  },
  methods: {
    logout(){
      localStorage.clear();
      localStorage.setItem('userInfo', "");
      router.push('/');
    },
    pageBack(){
      router.push('/home');
    },
    confirmClick() {
      this.confirmed = true;
    },
    chooseTemplate(){
      if(document.getElementById('c-rv-pp').checked){
        this.powerFormsURL = "";
      }
      else if(document.getElementById('c-ev-pp').checked){
        this.powerFormsURL = "";
      }
      else if(document.getElementById('c-rv-pp-eng').checked){
        this.powerFormsURL = "";
      }
      else if(document.getElementById('c-ev-pp-eng').checked){
        this.powerFormsURL = "";
      }
    }
  },
}
</script>

<style scoped>
.btn-primary {
  background-color: #007772;
  border-color: #007772;
}

  .bestatigen-button {
    pointer-events: none;
  }

  h2 {
    margin-top: 2rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  [type="radio"] {
    margin-right: 5px;
  }

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