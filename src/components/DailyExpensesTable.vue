<template>
  <div id="daily-expense-table">
    <b-table 
      hover 
      responsive
      :items="myProvider" 
      :fields="fields"
      :tbody-tr-class="rowClass"
      :head-variant="headVariant"
      :table-variant="tableVariant"
      ></b-table>
  </div>
</template>

<script>
  export default {
    name: "DailyExpensesTable",
    data() {
      return {
        fields: [
          { key: 'cost', label: 'Expenses', sortable: true },
          { key: 'category', label: 'Expense Category', sortable: true  },
          { key: 'comment', label: 'Comments', variant: 'warning'},
          { key: 'time', label: 'Time', variant: 'info', sortable: true  }
        ],
        headVariant: 'dark',
        tableVariant: 'light',
        rowClass(item, type) {
            if (!item || type !== 'row') return null
            if (item.cost > 100) return 'table-danger'
          },
        myProvider() {
          let items = [
           {cost: 4.15, category: 'food', comment: 'coffee', time: 'Mon 9:00', date: '2020-08-29'},
           {cost: 15, category: 'food', comment: 'lunch', time: 'Mon 13:05', date: '2020-08-29'},
           {cost: 500, category: 'clothing', comment: 'Guess clothing', time: 'Mon 15:30', date: '2020-08-29'},
           {cost: 2.15, category: 'food', comment: 'coffee', time: 'Tue 9:20', date: 'Tue2020-08-30'},
           {cost: 15, category: 'food', comment: 'lunch', time: 'Tue 13:05', date: '2020-08-30'},
           {cost: 67.89, category: 'home', comment: 'kitchen stuff', time: 'Tue 15:30', date: '2020-08-30'}]
          return items || []
        }
      }
    }
  };
</script>

<style>
  #daily-expense-table .table-responsive{
    margin-bottom: 0;
  }
</style>