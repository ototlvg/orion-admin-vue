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
          component: HelloWorld, 
          redirect: '/login' 
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                requiresVisitor: true,
            },
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
            path: '/pacientes',
            name: 'Patientsn',
            component: Patients,
            redirect: '/pacientes/1' 
        },


        {
            path: '/resultados',
            // name: 'resultados',
            component: Resultados,
            meta: {
                requiresData: true,
            },
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
