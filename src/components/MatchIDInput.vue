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
       <td>WeMatch Ansprechpartner:</td>
       <td>{{wematchAnsprechpartnerName}}</td>
     </tr>
      <tr>
        <td>Projektpartner:</td>
        <td>{{projektpartnerName}}</td>
      </tr>
      <tr>
        <td>Projektpartner Gesellschaft:</td>
        <td>{{matches.at(2)}}</td>
      </tr>
      <tr>
        <td>Kunde:</td>
        <td>{{matches.at(14)}}</td>
      </tr>
      <tr>
        <td>Ansprechpartner Kunde:</td>
        <td>NOCH NICHT VORHANDEN</td>
      </tr>
      <tr>
        <td>Adresse Kunde:</td>
        <td>{{adresseKunde}}</td>
      </tr>
      <tr>
        <td>Startdatum:</td>
        <td>{{startdatum}}</td>
      </tr>
      <tr>
        <td>Enddatum:</td>
        <td>{{enddatum}}</td>
      </tr>
      <tr>
        <td>Kündigungsfrist PP:</td>
        <td>{{matches.at(19) }}</td>
      </tr>
      <tr>
        <td>Kündigungsfrist Kunde:</td>
        <td>{{matches.at(20) }}</td>
      </tr>
      <tr>
        <td>Zahlungsziel PP:</td>
        <td>{{matches.at(3)}}</td>
      </tr>
      <tr>
        <td>Zahlungsziel Kunde:</td>
        <td>{{matches.at(4)}}</td>
      </tr>
      <tr>
        <td>Vergütungssatz:</td>
        <td>{{matches.at(5)}}</td>
      </tr>
      <tr>
        <td>EK-Preis:</td>
        <td>{{ek}}</td>
      </tr>
      <tr>
        <td>VK-Preis:</td>
        <td>{{vk}}</td>
      </tr>
     <tr>
       <td>Einsatzort:</td>
       <td>{{matches.at(21)}}</td>
     </tr>
      <tr>
        <td>Position:</td>
        <td>{{matches.at(13)}}</td>
      </tr>
      <tr>
        <td>Aufgabenbeschreibung:</td>
        <td>{{matches.at(8)}}</td>
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
      confirmed: false,
      projektpartnerName: "",
      wematchAnsprechpartnerName: "",
      adresseKunde: "",
      startdatum: "",
      enddatum: "",
      ek: "",
      vk: "",
      projektpartnerMail: "",
      wematchAnsprechpartnerMail: ""
    }
  },
  methods: {
    getMatch() {
      BackendService.getMatch(this.matchIdFromInput).then((response) => {
        this.matches = response.data;
        this.projektpartnerName = this.matches.at(0) + " " + this.matches.at(1);
        this.wematchAnsprechpartnerName = this.matches.at(9) + " " + this.matches.at(10);
        this.adresseKunde = this.matches.at(15) + ", " + this.matches.at(16) + ", " + this.matches.at(18) + " " + this.matches.at(17);
        this.startdatum = this.dateFormatter(this.matches.at(11));
        this.enddatum = this.dateFormatter(this.matches.at(12));
        this.ek = this.preisFormatter(this.matches.at(6));
        this.vk = this.preisFormatter(this.matches.at(7));

        localStorage.setItem('match', this.matches);
        localStorage.setItem('projektpartnerName', this.projektpartnerName);
        localStorage.setItem('wematchAnsprechpartnerName', this.wematchAnsprechpartnerName)
        localStorage.setItem('projektpartnerMail', this.matches.at(22));
        localStorage.setItem('wematchAnsprechpartnerMail', this.matches.at(23));

        console.log(this.matches);
      });
    },

    confirmClick() {
      this.confirmed = true;
    },

    goToChooseTemplate() {
      router.push('chooseTemplate');
    },
    logout(){
      localStorage.clear();
      localStorage.setItem('idToken', "");
      router.push('/login');
    },
    dateFormatter(timestamp){
        const date = new Date(parseInt(timestamp));
        const formatedDate = date.toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'});
        return formatedDate;
    },

    preisFormatter(preis){
      let formatedValue = preis.toString().replace(/\./g, ',');
      if (formatedValue.indexOf(',') !== -1) {
        const nachkomma = formatedValue.split(',')[1].length;
        if(nachkomma === 1){
          formatedValue = formatedValue + "0";
        } else if(nachkomma === 0) {
          formatedValue += "00";
        }
      }
      return formatedValue;
    }
  },
  beforeMount() {
    const token = localStorage.getItem('idToken');
    console.log("userInfo Prüfung: " + token);
    if(token === "null" || token === "" || token === null){
      router.push('/login')
    } else {
      router.push('/home')
    }
  }
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
