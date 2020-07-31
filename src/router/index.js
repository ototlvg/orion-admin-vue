import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Patients from '@/components/Patients'
import Resultados from '@/components/Resultados'
import Basica from '@/components/resultados/Basica'
import Doble from '@/components/resultados/Doble'

Vue.use(Router)

export default new Router({
    routes: [
        {
          path: '/',
          name: 'HelloWorld',
          component: HelloWorld
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
