// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
// import App from './App'
import router from './router'
import { store } from './store/store'

// import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
// Vue.use(Buefy)
// Vue.use(Vuex)


// const variablesSCSS= require('./assets/scss/_variables.scss');red

window.$ = window.jQuery = require('jquery');
import popperjs from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Forma oficial
import 'bootstrap/dist/js/bootstrap.js'; // Forma oficial


Vue.config.productionTip = false

/* eslint-disable no-new */
import iconos from './assets/iconfont/material-icons.css'
import styles from './assets/scss/styles.scss'
import App from './App'
new Vue({
    el: '#app',
    router,
    store: store,
    components: { App },
    template: '<App/>'
})
