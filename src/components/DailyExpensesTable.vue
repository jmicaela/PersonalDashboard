<template>
	<div id="daily-expense-table">
		<b-table 
			hover 
			responsive
			sticky-header
			ref="table"
			:items="expenseRows" 
			:fields="fields"
			:head-variant="headVariant"
			:table-variant="tableVariant"
			:tbody-tr-class="rowClass"
			></b-table>
	</div>
</template>

<script>
	export default {
		name: "DailyExpensesTable",
		props: ['doRefreshExpenseTable'],
		data() {
			return {
				fields: [
					{ key: 'account', label: 'Account'},
					{ key: 'cost', label: 'Expenses', sortable: true},
					{ key: 'category', label: 'Expense Category', sortable: true},
					{ key: 'comment', label: 'Comments'},
					{ key: 'displayDate', label: 'Date'},
				],
				headVariant: 'dark',
				tableVariant: 'light',
				rowClass(item, type) {
					if (item.cost > 300) return 'table-danger'
				},
				expenseRows: [],
			}
		},
		watch: {
			doRefreshExpenseTable: function(newVal, oldVal) {
				console.log("watch on Table this.doRefreshExpenseTable");
				console.log(this.doRefreshExpenseTable);
				if (newVal) {
					this.getTableRows();
					this.$refs.table.refresh();
					this.$emit('isExpenseInputFormSubmitted');
				}
			}
		},
		methods: {
			/* a, b are expense objects */
			sorterByJsRawDate(a, b) {
				return (new Date(a.rawJavascriptDate) - new Date(b.rawJavascriptDate));
			},

			/* get expense transactions */
			getTableRows() {
				var flatTableRows = new Array(0);
				var sorter = this.sorterByJsRawDate;
				this.$pouch.allDocs({ 
					include_docs: true, 
					attachments: true
				}).then(function(response){
					response.rows.map(function(row) {
						if (row.doc !== undefined && row.doc.expense !== undefined) {
							flatTableRows.push(row.doc.expense);
						}
					});
					flatTableRows.sort(sorter);
				}).catch(function(err){
					console.log("Database get all docs request error");
					console.log(err);
				})
				this.expenseRows = flatTableRows;
			}
		},
		mounted() {			
			this.getTableRows();
		}
	};
</script>

<style>
	#daily-expense-table .table-responsive{
		margin-bottom: 0;
	}
	.b-table .my-top-border {
		border-left: 3px solid #000;
	}

	/* Scrollbar styling */
	/* Firefox-only emerging W3C standard*/
	* {
	  scrollbar-width: thin;
	  scrollbar-color: rgb(52, 58, 64) rgb(253, 253, 254);
	}
	/* Works on Chrome/Edge/Safari */
	*::-webkit-scrollbar {
	  width: 12px;
	}
	*::-webkit-scrollbar-track {
	  background: rgb(253, 253, 254);
	}
	*::-webkit-scrollbar-thumb {
	  background-color: rgb(52, 58, 64);
	  border-radius: 20px;
	  border: 3px solid rgb(253, 253, 254);
	}
</style>