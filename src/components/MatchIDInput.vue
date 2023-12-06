<template>
  <h2 for="MatchID">1. Bitte gib die ID des Matches ein</h2>
    <div class="input-group mb-3">
      <input id="MatchID" type="number" name="Match ID" v-model="matchIDField" class="form-control" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-primary" @click="confirmClick"><b>Bestätigen</b></button>
      </div>
    </div>
  <div class="valueTable">
    <table class="table table-striped">
      <thead>
        <th>Projektpartner</th>
        <th>Kunde</th>
        <th>Ansprechpartner Kunde</th>
        <th>Adresse Kunde</th>
        <th>Startdatum</th>
        <th>Enddatum</th>
        <th>EK-Preis</th>
        <th>VK-Preis</th>
        <th>Position</th>
        <th>Aufgabenbeschreibung</th>
      </thead>
      <tbody>
        <tr v-for="match in matches" v-bind:key="match.id">
          <td>{{match.projektpartner}}</td>
          <td>{{match.kunde}}</td>
          <td>{{match.ansprechpartnerKunde}}</td>
          <td>{{match.adresseKunde}}</td>
          <td>{{match.startdatum}}</td>
          <td>{{match.enddatum}}</td>
          <td>{{match.ek}}</td>
          <td>{{match.vk}}</td>
          <td>{{match.ppPosition}}</td>
          <td>{{match.aufgabenbeschreibung}}</td>
        </tr>
      </tbody>
    </table>
    <!--
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
        <td>{{ matchIDField }}</td>
      </tr>
      <tr>
        <td>Kunde:</td>
        <td>{{ matchIDField }}</td>
      </tr>
      <tr>
        <td>Ansprechpartner Kunde:</td>
        <td>{{ matchIDField }}</td>
      </tr>
      <tr>
        <td>Adresse Kunde:</td>
        <td>{{ matchIDField }}</td>
      </tr>
      <tr>
        <td>Startdatum:</td>
        <td>{{ matchIDField }}</td>
      </tr>
      <tr>
        <td>Enddatum:</td>
        <td>{{ matchIDField }}</td>
      </tr>
      <tr>
        <td>EK-Preis:</td>
        <td>{{ matchIDField }}</td>
      </tr>
      <tr>
        <td>VK-Preis:</td>
        <td>{{ matchIDField }}</td>
      </tr>
      <tr>
        <td>Position:</td>
        <td>{{ matchIDField }}</td>
      </tr>
      <tr>
        <td>Aufgabenbeschreibung:</td>
        <td>{{ matchIDField }}</td>
      </tr>
      </tbody>
    </table>-->
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
      matches: [],
      confirmed: false
    }
  },
  methods: {
    getMatch(){
      BackendService.getMatch().then((response) => {
        this.matches = response.data;
      });
    },

    checkForm: function () {
    },

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

  created() {
    this.getMatch();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
