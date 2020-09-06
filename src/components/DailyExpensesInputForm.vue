<template>
	<div>
		
		<b-form-row 
		  v-if="show"
		  responsive
		  inline 
		  validated
		  fluid
		  @submit="onSubmit" 
		  @reset="onReset" 
		  class="mx-0">
				
				<b-col>
				<b-form-input
		          required
		          prepend="$"
		          v-model="form.cost"
		          type="text"
		          placeholder="enter cost"
		          class="mx-auto"
		        ></b-form-input>
		    	</b-col>

		        <b-col>
		        <b-form-select
		          required
		          v-model="form.category"
		          type="text"
		          :options="expenseCategories"
		          class="mx-auto"
		        ></b-form-select>
		        </b-col>

		        <b-col>
		        <b-input-group-append>
		        <b-form-input
		          required
		          v-model="form.comment"
		          type="text"
		          placeholder="`impulse shopping on boxing day`"
		          class="mx-auto"
		        ></b-form-input>

		        <!-- <b-form-input
		          required
		          v-model="form.time"
		          type="time"
		          class="mx-auto"
		        ></b-form-input> -->
			    </b-input-group-append>
				</b-col>
		</b-form-row>
		        <b-button type="submit" variant="primary">Submit</b-button>
				<b-button type="reset" variant="danger">Reset</b-button>
		
	</div>
</template>

<script>
	export default {
		name: "DailyExpensesInputForm",
		data() {
			return {
				form: {
					cost: '',
					category: null,
					comment: '',
					time: null
				},
				expenseCategories: [{ text: 'Select One', value: null }, 'coffee', 'lunch', 'cleaning supplies', 'kitchen stuff'],
				show: true
			}
		},
		methods: {
			onSubmit(evt) {
				evt.preventDefault()
				alert(JSON.stringify(this.form))
			},
			onReset(evt) {
				evt.preventDefault()
				// Reset our form values
				this.form.cost = ''
				this.form.category = null
				this.form.comment = ''
				this.form.time = null
				// Trick to reset/clear native browser form validation state
				this.show = false
				this.$nextTick(() => {
				  this.show = true
				})
			}
		}
	};
</script>