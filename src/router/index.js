import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Patients from '@/components/Patients'
import Resultados from '@/components/Resultados'
import Basica from '@/components/resultados/Basica'
import Doble from '@/components/resultados/Doble'
import Login from '@/components/Login'
import Logout from '@/components/Logout'

Vue.use(Router)

export default new Router({
    routes: [
        {
          path: '/',
          name: 'HelloWorld',
          component: HelloWorld
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout
        },
        {
            path: '/pacientes/:page',
            name: 'Patients',
            component: Patients
        },
        {
            path: '/resultados',
            // name: 'resultados',
            component: Resultados,
            children: [
                {
                    path: 'basica/:survey',
                    component: Basica
                },
                {
                    path: 'suplementaria/:survey',
                    component: Doble
                },
                {
                    path: 'contenido/:survey',
                    component: Doble
                }
            ]
        }
    ],
    mode: 'history'
})
