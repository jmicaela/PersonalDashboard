import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import PouchDB from "pouchdb-browser";
import PouchFind from "pouchdb-find";
import PouchLiveFind from "pouchdb-live-find";
import PouchVue from "pouch-vue";
import JQuery from "jquery";
window.$ = JQuery;


PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchLiveFind);
PouchDB.plugin(require("pouchdb-authentication"));
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.use(PouchVue, {
  pouch: PouchDB, 
  defaultDB: "http://SuperAdmin:password@localhost:5984/personal-dashboard",
  optionDB: {}
});

new Vue({
  render: h => h(App)
}).$mount("#app");



