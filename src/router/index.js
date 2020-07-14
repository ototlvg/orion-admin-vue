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
          path: '/hello',
          name: 'HelloWorld',
          component: HelloWorld
        },
        {
            path: '/',
            name: 'Patients',
            component: Patients
        },
        {
            path: '/resultados',
            // name: 'resultados',
            component: Resultados,
            children: [
                {
                    path: 'basica',
                    component: Basica
                },
                {
                    path: 'suplementaria',
                    component: Doble
                },
                {
                    path: 'contenido',
                    component: Doble
                }
            ]
        }
    ],
    mode: 'history'
})
