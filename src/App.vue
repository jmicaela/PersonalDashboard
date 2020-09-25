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
		<DailyExpensesTable
			v-bind:doRefreshExpenseTable="doRefreshExpenseTable"
			v-on:isExpenseInputFormSubmitted="doRefreshExpenseTable=false"></DailyExpensesTable>
		<p></p>
		<DailyExpensesInputForm 
			v-bind:expenseCategoriesTableId="expenseCategoriesTableId"
			v-bind:accountTypesTableId="accountTypesTableId"
			v-on:doRefreshExpenseTable="doRefreshExpenseTable=true">
			</DailyExpensesInputForm>
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
		data() {
			return {
				dbAdminUserId: "SuperAdmin",
				dbAdminPassword: "xS6-Vuy-hmR-9LB",
				/* PC localhost DB instance */
				// accountTypesTableId: "38b00fc0484d4d3f92a3b75324002496",
				// expenseCategoriesTableId: "38b00fc0484d4d3f92a3b75324009711",
				
				/* laptop localhost DB instance */
				accountTypesTableId: "8fbc4e2fae13ae4f1791061263000660",
				expenseCategoriesTableId: "8fbc4e2fae13ae4f1791061263001fad",
				doRefreshExpenseTable: false
			}
		},
		watch: {
			doRefreshExpenseTable: function(newVal, oldVal) {
			}
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
	margin: 2% 2% 2% 2%;
}

</style>
