export let account = [
	{institution: 'TD', accounts: ['chequing', 'savings']},
	{institution: 'Scotiabank', accounts: ['chequing', 'savings']}];

export let expenseCategories = [
	{category: 'food', subcategories: ['coffee', 'lunch']},
	{category: 'home', subcategories: ['cleaning supplies', 'kitchen stuff']};


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


