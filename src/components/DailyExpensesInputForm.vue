<template>
	<div>
		<b-card bg-variant="dark">
			<b-form
			@submit="onSubmit" 
			@reset="onReset"
			v-if="show">
				<b-form-row>
					<b-col cols="3">
						<h4 id="clock">{{date}} {{day}} {{time}}</h4> <p></p>
						<b-button type="submit" variant="primary">Submit</b-button>
						<p></p>
				    	<b-button type="reset" variant="danger">Reset</b-button>
					</b-col>

					<b-col>	
					    <b-form-group>
					    <b-form-input
				          required
				          prepend="$"
				          v-model="form.cost"
				          type="text"
				          placeholder="Expense Cost"
				          class="mx-auto">
				        </b-form-input> <p></p>

				        <b-form-select
				          required
				          v-model="form.category"
				          type="text"
				          :options="expenseCategories"
				          class="mx-auto"
				        ></b-form-select> <p></p>

						<b-input-group-append>
					        <b-form-input
					          required
					          v-model="form.comment"
					          type="text"
					          placeholder="eg. 'Impulse shopping on boxing day'"
					          class="mx-auto"
					        ></b-form-input>
					    </b-input-group-append>	<p></p>
					    
					    <b-form-select
				          required
				          v-model="form.account"
				          type="text"
				          :options="accountTypes"
				          class="mx-auto"
				        ></b-form-select>
						</b-form-group>
			    	</b-col>
				</b-form-row>
			</b-form>
		</b-card>
	</div>
</template>

<script>
	export default {
		name: 'DailyExpensesInputForm',
		props: ['expenseCategoriesTableId','accountTypesTableId'],
		data() {
			return {
				form: {
					cost: '',
					category: null,
					comment: '',
					account: null
				},
				hiddenForm: {
					displayDate: '',
					rawJavascriptDate: ''
				},
				show: true,
				expenseCategories: [{
			        text: 'Expense Category',
			        value: null
			    }],
			    accountTypes: [{
			        text: 'Account',
			        value: null
			    }],
			    month: ['January','February','March','April','May','June','July','August','September','October','November','December'],
			    week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
			    date: '',
			    day: '',
			    time: '',
			}
		},
		methods: {
			zeroPadding(num, digit) {
			    var zero = '';
			    for(var i = 0; i < digit; i++) {
			        zero += '0';
			    }
			    return (zero + num).slice(-digit);
			},
			updateTime() {
			    var cd = new Date();

			    this.hiddenForm.rawJavascriptDate = cd;
			    this.hiddenForm.displayDate = this.day + ' ' + this.time;

			    this.date = this.month[cd.getMonth() - 1] + ' ' + cd.getDate() + ', ' + this.zeroPadding(cd.getFullYear(), 4);
			    this.day =  ' ' + this.week[cd.getDay()];
			    this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2);
			},
			onSubmit(evt) {
				evt.preventDefault()
				var f = {...this.form, ...this.hiddenForm}
				console.log(JSON.stringify(f))

				this.$pouch.post({
					expense: f
				}).then(function(response){
					console.log(response)
				}).catch(function(err){
					console.log("Database post request error");
					console.log(err);
				})

				this.onReset(evt)
			},
			onReset(evt) {
				evt.preventDefault()
				// Reset our form values
				this.form.cost = ''
				this.form.category = null
				this.form.comment = ''
				this.form.time = null
				this.form.account = null

				// Trick to reset/clear native browser form validation state
				this.show = false
				this.$nextTick(() => {
				  this.show = true
				})
			}
		},
		mounted() {
			/* get account types */
			var flatAccountsData = new Array(0);
			this.$pouch.get(this.accountTypesTableId).then(function(response) {
				response.data.map(function(i) {
					return i.accounts.map(function(account){
						flatAccountsData.push({
							text : i.institution + ": " + account,
							value: i.institution + ": " + account
						});
					});
				});
			}).catch(function(err) {
			    console.log("DB get account types error: ");
			    console.log(err);
			});
			flatAccountsData.push(this.accountTypes[0]);
			this.accountTypes = flatAccountsData;

			/* clock */
			this.updateTime();
			var timerID = setInterval(this.updateTime(), 1000);

			/* get expense categories */
			var flatExpCategoriesData = new Array(0);
			this.$pouch.get(this.expenseCategoriesTableId).then(function(response) {
				response.expenseCategories.map(function(c) {
					return c.subcategories.map(function(subc){
						flatExpCategoriesData.push({
							text : c.category + ": " + subc,
							value: c.category + ": " + subc
						});
					});
				});
			}).catch(function(err) {
			    console.log("DB get expense categories error: ");
			    console.log(err);
			});
			flatExpCategoriesData.push(this.expenseCategories[0]);
			this.expenseCategories = flatExpCategoriesData;
		}
	};
</script>
<style>
	#clock {
		font-family: Consolas, Avenir, Helvetica, Arial, sans-serif;
		font-weight: bold;
		color: #ffd900;
		margin:  3% 2% 2% 2%;
	}
	/*.form-row > .col, .form-row > [class*="col-"] {
		padding: 0;
		padding-left: 0 !important;
		padding-right: 0 !important;
		border: none;
	}*/
</style>