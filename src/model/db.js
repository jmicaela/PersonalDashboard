export let account = [
	{institution: 'TD', accounts: ['chequing', 'savings']},
	{institution: 'Scotiabank', accounts: ['chequing', 'savings']}];

export let expenseCategories = [
	{category: 'food', subcategories: ['coffee', 'lunch']},
	{category: 'home', subcategories: ['cleaning supplies', 'kitchen stuff']}]

export class DailyExpenseRow {
	constructor (cost, category, comment) {
		if (cost < 0) throw new Error("Negative price value.");
		this._cost = cost;
		this._category = category;
		this._comment = comment;

		this._raw_date = new Date();
		this._date = this._raw_date.toDateString();
		this._time = this._raw_date.toLocaleTimeString();
	}
}


/*
this.$pouch.post({
        expenseCategories: [
          {category: 'food', subcategories: ['coffee', 'lunch']},
          {category: 'home', subcategories: ['cleaning supplies', 'kitchen stuff']}
          ]
      });
{
  "_id": "38b00fc0484d4d3f92a3b75324009711",
  "_rev": "1-2c9e898d5130ee2d42fdf132b779c6b9",
  "expenseCategories": [
    {
      "category": "food",
      "subcategories": [
        "coffee",
        "lunch"
      ]
    },
    {
      "category": "home",
      "subcategories": [
        "cleaning supplies",
        "kitchen stuff"
      ]
    }
  ]
}

this.$pouch
.allDocs({ include_docs: true, attachments: true })
.then(function(response) {
  console.log("this.$pouch.allDocs() " + response);
  console.log(response);
});

this.$pouch.find({
selector: {category: "food"} 
}).then(function(result) {
console.log(result);
});
*/



