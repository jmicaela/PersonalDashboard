<template>
  <div id="app">
    <b-jumbotron bg-variant="warning" text-variant="white" border-variant="dark" header-level=4>
    <template v-slot:header>Personal Dashboard</template>
    <template v-slot:lead>
      Personalized Daily Expense Tracker
    </template>
    <hr class="my-3">
    <p>Learn about personal spending habits.</p>
  </b-jumbotron>
    <DailyExpensesTable></DailyExpensesTable>
    <DailyExpensesInputForm></DailyExpensesInputForm>
  </div>
</template>

<script>
import DailyExpensesTable from "./components/DailyExpensesTable.vue";
import DailyExpensesInputForm from "./components/DailyExpensesInputForm.vue";

export default {
  name: "App",
  components: {
    DailyExpensesTable,
    DailyExpensesInputForm
  },
  created: function() {
    this.$pouch
      .allDocs({ include_docs: true, attachments: true })
      .then(function(response) {
        console.log("allDocs() " + response);
        console.log(response);
      });
    this.$pouch.info("personal-dashboard")
      .then(function(result) {
        console.log("DB info: ");
        console.log(result);
      }).catch(function(err) {
        console.log("DB info error: ");
        console.log(err);
      });
  }
};

</script>

<style>
#app {
  font-family: Consolas, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 2% 2% 2% 2%; /* top right bottom left */
}

</style>
