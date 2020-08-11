// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueProgressBar from 'vue-progressbar'
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

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '50px',
    thickness: '4px',
  
})



window.$ = window.jQuery = require('jquery');
import popperjs from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Forma oficial
import 'bootstrap/dist/js/bootstrap.js'; // Forma oficial


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.getToken == false) {
        next({
            name: 'Login',
        })
        } else {
        next()
        }
    } 
    
    else if (to.matched.some(record => record.meta.requiresData)) {
        if (store.getters.getPatient == null) {
            next({
                name: 'Patients',
            })
        } else {
            next()
        }
    }
    else if (to.matched.some(record => record.meta.requiresVisitor)) {
        // console.log('getToken: ' + store.getters.getToken)

        if (store.getters.getToken == true) {
            // console.log('reedireccionar a Patients')
            next({
                name: 'Patients',
            })
        } else {
            // console.log('Continuando a donde queremos')
            next()
        }
    } 
    else {
        next()
    }
})

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
