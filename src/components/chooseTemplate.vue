<template>
  <div>
    <button @click="pageBack()" class="btn btn-outline-primary">Zurück</button>
  </div>

<h2>2. Wähle den Vertrag aus, den du erstellen willst:</h2>
  <h3>Contracts</h3>
  <input type="radio" id="c-rv-pp" value="c-rv-pp" name="radio" @click="confirmClick()">
  <label for="c-rv-pp" @click="confirmClick()">Rahmenvereinbarung Projektpartner</label><br/>
  <input type="radio" id="c-ev-pp" value="c-ev-pp" name="radio" @click="confirmClick()">
  <label for="c-ev-pp" @click="confirmClick()">Projekteinzelauftrag Projektpartner</label><br/>

  <h3>Contracts - Englisch</h3>
  <input type="radio" id="c-rv-pp-eng" value="c-rv-pp-eng" name="radio" @click="confirmClick()">
  <label for="c-rv-pp-eng" @click="confirmClick()">Rahmenvereinbarung Projektpartner</label><br/>
  <input type="radio" id="c-ev-pp-eng" value="c-ev-pp-eng" name="radio" @click="confirmClick()">
  <label for="c-ev-pp-eng" @click="confirmClick()">Projekteinzelauftrag Projektpartner</label><br/>

  <h2>3. Prüfe, ob folgende Daten<br />zum Versand des Vertrags korrekt sind:</h2>

  <h3>Vertrag Absender</h3>
  <label for="absender_mail">E-Mail:</label>
  <input v-model="wematchAnsprechpartnerMail" type="email" id="absender_mail">
  <label for="absender_name">Name:</label>
  <input v-model="wematchAnsprechpartnerName" type="text" id="absender_mail"><br />

  <h3>Vertrag Empfänger</h3>
  <label for="empfaenger_mail">E-Mail:</label>
  <input v-model="projektpartnerMail" type="email" id="empfaenger_mail">
  <label for="empfaenger_name">Name:</label>
  <input v-model="projektpartnerName" type="text" id="empfaenger_mail"><br />

  <h3>Consultant in CC</h3>
  <label for="cc_mail">E-Mail:</label>
  <input type="email" id="cc_mail">
  <label for="cc_name">Name:</label>
  <input type="text" id="cc_name"><br />
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
      powerFormsURL: "",
      finalURL: "",
      match: localStorage.getItem('match'),
      projektpartnerName: localStorage.getItem('projektpartnerName'),
      projektpartnerMail: localStorage.getItem('projektpartnerMail'),
      wematchAnsprechpartnerName: localStorage.getItem('wematchAnsprechpartnerName'),
      wematchAnsprechpartnerMail: localStorage.getItem('wematchAnsprechpartnerMail'),
      tagessatz: "X",
      stundensatz: "X",
      festpreis: "X",
      vergutungsart: localStorage.getItem('vergutungsart')
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
      if(this.vergutungsart === "Stundensatz"){
        this.stundensatz = this.match.at(6);
      } else if(this.vergutungsart === "Tagessatz"){
        this.tagessatz = this.match.at(6);
      } else if(this.vergutungsart === "Festpreis"){
        this.festpreis = this.match.at(6);
      }

      if(document.getElementById('c-rv-pp').checked){
        this.powerFormsURL = "";
      }
      else if(document.getElementById('c-ev-pp').checked){

        this.powerFormsURL = "https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=90f5f8f0-1e48-4e4c-a4c2-611e5de2cd80&env=na4&acct=8c292057-41c5-41bd-8966-3d233e7af0bc&v=2";
        this.finalURL = this.powerFormsURL +
            "&Absender_UserName=" + encodeURIComponent(this.wematchAnsprechpartnerName) +
            "&Absender_Email=" + encodeURIComponent(this.wematchAnsprechpartnerMail) +
            "&Projektpartner_UserName=" + encodeURIComponent(this.projektpartnerName) +
            "&Projektpartner_Email=" + encodeURIComponent(this.projektpartnerMail) +
            "&Consultant%20in%20cc_UserName=" + encodeURIComponent(this.cc_name) +
            "&Consultant%20in%20cc_Email=" + encodeURIComponent(this.cc_mail) +
            "&Wematch_Ansprechpartner=" + encodeURIComponent(this.wematchAnsprechpartnerName) +
            "&Projektpartner=" + encodeURIComponent(this.match.at(2)) + " " + encodeURIComponent(this.projektpartnerName) +
            "&Startdatum=" + encodeURIComponent(this.match.at(11)) +
            "&Enddatum=" + encodeURIComponent(this.match.at(12)) +
            "&Kuendigungsfrist=" + encodeURIComponent(this.match.at(18)) +
            "&Tagessatz=" + encodeURIComponent(this.tagessatz) +
            "&Stundensatz=" + encodeURIComponent(this.stundensatz) +
            "&Festpreis=" + encodeURIComponent(this.festpreis) +
            "&Endkunde=" + encodeURIComponent(this.match.at(15)) +
            "&Endkunde_Adresse=" + encodeURIComponent(this.match.at(16)) +
            "&Einsatzort=" + encodeURIComponent(this.match.at(19)) +
            "&Position=" + encodeURIComponent(this.match.at(13)) +
            "&Aufgabenbeschreibung=" + encodeURIComponent(this.match.at(8))
        ;
      }
      else if(document.getElementById('c-rv-pp-eng').checked){
        this.powerFormsURL = "";
      }
      else if(document.getElementById('c-ev-pp-eng').checked){
        this.powerFormsURL = "";
      }

      window.open(this.finalURL, "_blank");
    }
  },

  watch: {
    projektpartnerName(newValue){
      localStorage.setItem('projektpartnerName', newValue);
    },
    projektpartnerMail(newValue){
      localStorage.setItem('projektpartnerMail', newValue);
    },
    wematchAnsprechpartnerName(newValue){
      localStorage.setItem('wematchAnsprechpartnerName', newValue);
    },
    wematchAnsprechpartnerMail(newValue){
      localStorage.setItem('wematchAnsprechpartnerMail', newValue);
    },
    cc_name(newValue){
      localStorage.setItem('cc_name', newValue);
    },
    cc_mail(newValue){
      localStorage.setItem('cc_mail', newValue);
    }
  }
}
</script>

<style scoped>
  [type="email"] {
    margin-left: 0.5rem;
    margin-right: 2rem;
  }

  [type="text"] {
    margin-left: 0.5rem;
  }

  .btn-primary {
    background-color: #007772;
    border-color: #007772;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .bestatigen-button {
    margin-top: 1rem;
    margin-bottom: 2rem;
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