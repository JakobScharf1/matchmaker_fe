<template>
    <form id="MatchIDForm" @submit="checkForm" action="" method="post">
      <p>
        <label for="MatchID">1. Bitte gib die ID des Matches ein</label>
      </p>
      <div class="input-group mb-3">
        <input id="MatchID" type="number" name="Match ID" class="form-control" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="submit" value="Bestätigen">Bestätigen</button>
        </div>
      </div>
    </form>
</template>

<script>
export default {
  name: 'MatchIDInput',
  methods: {
    checkForm: function () {
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
.btn-outline-secondary:hover {
  background-color: #007772;
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
