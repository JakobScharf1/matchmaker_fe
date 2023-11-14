<template>
  <label for="MatchID">1. Bitte gib die ID des Matches ein</label>
    <div class="input-group mb-3">
      <input id="MatchID" type="number" name="Match ID" v-model="matchIDField" class="form-control" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-secondary"><b>Bestätigen</b></button> <!-- @click="" hinzufügen -->
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
    </table>
  </div>
  <button class="btn btn-outline-secondary" @click="goToChooseTemplate"><b>Weiter</b></button>
</template>

<script>
export default {
  name: 'MatchIDInput',
  methods: {
    checkForm: function () {
    },

    goToChooseTemplate() {
      this.$router.push('chooseTemplate');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.input-group {
  width: 300px;
  margin: 0 auto;
}

.btn-secondary {
  background-color: #007772;
}

.btn-secondary:hover {
  background-color: #fff;
  color: #000;
}

.btn-outline-secondary:hover {
  background-color: #007772;
}
.valueTable {
  text-align: left;
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
