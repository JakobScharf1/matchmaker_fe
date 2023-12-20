<template>
  <h2 for="MatchID">1. Bitte gib die ID des Matches ein</h2>
    <div class="input-group mb-3">
      <input v-model="matchIdFromInput" id="MatchID" type="number" name="Match ID" class="form-control" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-primary" @click="() => { confirmClick(); getMatch();}"><b>Bestätigen</b></button>
      </div>
    </div>
  <div class="valueTable">
    <table>
      <thead>
      <tr>
        <th>Attribut</th>
        <th>Wert</th>
      </tr>
      </thead>
     <tbody>
      <tr>
        <td>Projektpartner:</td>
        <td>{{matches.length > 0 ? matches[0].projektpartner : '' }}</td>
      </tr>
      <tr>
        <td>Kunde:</td>
        <td>{{matches.length > 0 ? matches[0].kunde : '' }}</td>
      </tr>
      <tr>
        <td>Ansprechpartner Kunde:</td>
        <td>{{matches.length > 0 ? matches[0].ansprechpartnerKunde : '' }}</td>
        <!--<td v-for="match in matches" v-bind:key="match.id">{{match.ansprechpartnerKunde}}</td>-->
      </tr>
      <tr>
        <td>Adresse Kunde:</td>
        <td>{{matches.length > 0 ? matches[0].adresseKunde : '' }}</td>
      </tr>
      <tr>
        <td>Startdatum:</td>
        <td>{{matches.length > 0 ? matches[0].startdatum : '' }}</td>
      </tr>
      <tr>
        <td>Enddatum:</td>
        <td>{{matches.length > 0 ? matches[0].enddatum : '' }}</td>
      </tr>
      <tr>
        <td>EK-Preis:</td>
        <td>{{matches.length > 0 ? matches[0].ek : '' }}</td>
      </tr>
      <tr>
        <td>VK-Preis:</td>
        <td>{{matches.length > 0 ? matches[0].vk : '' }}</td>
      </tr>
      <tr>
        <td>Position:</td>
        <td>{{matches.length > 0 ? matches[0].ppPosition : '' }}</td>
      </tr>
      <tr>
        <td>Aufgabenbeschreibung:</td>
        <td>{{matches.length > 0 ? matches[0].aufgabenbeschreibung : '' }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <button class="btn" v-bind:class="{'weiter-button': !confirmed, 'btn-primary': confirmed}" @click="goToChooseTemplate"><b>Weiter</b></button><br />
  <button id="logoutButton" class="btn btn-outline-primary" @click="logout"><b>Logout</b></button>
</template>

<script>
import router from "@/router";
import BackendService from "@/services/BackendService";

export default {
  name: 'MatchIDInput',
  data() {
    return {
      matchIdFromInput: "",
      matches: [],
      confirmed: false
    }
  },
  methods: {
    getMatch() {
      BackendService.getMatch(this.matchIdFromInput).then((response) => {
        this.matches = response.data;
        console.log(this.matches);
      });
    },
     /* const endpoint = "http://localhost:8081/match/" + this.matchIdFromInput;
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        //headers: {'Content-Type': 'application/json'},
      };
      fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(result => {
            this.matches = result;
            console.log(this.matches);
          })
          .catch(error => console.log('error', error));
    },*/

    confirmClick() {
      this.confirmed = true;
    },

    goToChooseTemplate() {
      router.push('chooseTemplate');
    },
    logout(){
      localStorage.clear();
      localStorage.setItem('userInfo', "");
      router.push('/');
    },
  },
  beforeMount() {
    const userInfo = localStorage.getItem('userInfo');
    console.log("userInfo Prüfung: " + userInfo);
    if(userInfo === "null" || userInfo === "" || userInfo === null){
      router.push('/')
    }
  }
  //TODO mounted Methode hinzufügen, dass Login gecheckt wird
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

td {
  width: fit-content;
  padding-right: 10px;
}

h2 {
  font-size: 1.5rem;
}

#logoutButton {
  position: fixed;
  top: 10px;
  right: 10px;
}

.input-group {
  width: 300px;
  margin: 0 auto;
}

.btn-primary {
  background-color: #007772;
  border-color: #007772;
}

.btn-primary:hover {
  background-color: transparent;
}

.btn-primary:active {
  box-shadow: #007772;
}

.btn-outline-primary {
  color: #007772;
  border-color: #007772;
}

.btn-outline-primary:hover {
  color: white;
  background-color: #007772;
}

.valueTable {
  text-align: left;
}

.weiter-button {
  background-color: transparent;
  border-color: #007772;
  color: #007772;
  pointer-events: none;
}

/*Pre-generated*/

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
