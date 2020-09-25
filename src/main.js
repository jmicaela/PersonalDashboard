import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import PouchDB from "pouchdb-browser";
import PouchFind from "pouchdb-find";
import PouchLiveFind from "pouchdb-live-find";
import PouchDBAuthentication from 'pouchdb-authentication';
import PouchVue from "pouch-vue";

import JQuery from "jquery";
window.$ = JQuery;


PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchLiveFind);
PouchDB.plugin(PouchDBAuthentication);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.use(PouchVue, {
	pouch: PouchDB, 
	defaultDB: "http://SuperAdmin:xS6-Vuy-hmR-9LB@localhost:5984/personal-dashboard",
	optionDB: {}
});
/* http://127.0.0.1:5984/_utils/#_config/couchdb@localhost */

new Vue({
	render: h => h(App)
}).$mount("#app");



