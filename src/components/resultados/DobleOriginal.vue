<template>
    <div class="doble">
        <p>Escala: {{escalaActual}}</p>
        <select class="custom-select main__select main__header__select" @change="pushToNewSurvey($event)">
            <!-- <option :selected="true" disabled hidden>{{numero}}</option> -->
            <option :selected="index == numero" :value="index" v-for="index in patient.completed_surveys" :key="index">{{index}}</option>
        </select>

        <!-- <p>{{dataEscala}}</p> -->
        <!-- <p>{{ $route.params.survey }}</p> -->
        <!-- <p>{{ $route.fullPath }}</p> -->
        <p>{{dataEscalaActual}}</p>
        
        
    </div>
</template>

<script>
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
export default {
    name: 'Doble',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            escalaActual: null,
            dataEscalaActual: null
        }
    },
    beforeCreate(){
    },
    created(){
        this.setActualView()
    },
    mounted: function () {
        this.grafica()
    },
    methods: {
        getEscala(escala){
            
        },
        setActualView(){
            let escalaActual= this.$route.path.split('/')[2]
            this.escalaActual= escalaActual
            let survey=this.$route.params.survey
            // console.log(survey)

            const escalaCapitalized = escalaActual.charAt(0).toUpperCase() + escalaActual.slice(1)
            let escalaDataArray= this.$store.getters['get'+escalaCapitalized]
            // console.log(escalaCapitalized)
            this.$store.commit('setActualResults', { id: escalaCapitalized=='Suplementaria' ? 2 : 3, name: escalaCapitalized })
            
            let obj= { name: escalaActual, survey: survey }

            if(escalaDataArray.length == 0){
                // console.log('No hay nada en array, mandando a buscar')
                this.getNewEscala(obj, escalaCapitalized)
            }else{
                console.log('Buscando')
                const found= escalaDataArray.find(element => element.survey == survey);
                // console.log(found)
                if(found == undefined){
                    // console.log('Aun no esta en la app, llamando informacion')
                    this.getNewEscala(obj, escalaCapitalized)
                }else{
                    // console.log('Encontrado')
                    this.dataEscalaActual= found
                }
            }
        },
        getNewEscala(obj,escala){
            let este= this
            this.$store.dispatch('getEscalaDoble',obj)
                .then( data => {
                    // console.log(data)
                    este.$store.commit(('set'+escala), data)
                    este.dataEscalaActual= data
                })
                .catch( data => {
                    // console.log('error funcionando correctamente')
                })

        },
        pushToNewSurvey(event){
            let survey= event.target.value
            if(this.numero != survey){
                this.$router.push({ path: `/resultados/${this.escalaActual}/${survey}` })
            }
        },
        grafica(){
            
        }
    },
    computed: {
        // suplementaria(){
        //     return this.$store.getters.getSuplementaria
        // },
        // contenido(){
        //     return this.$store.getters.getContenido
        // },
        patient(){
            return this.$store.getters.getPatient
        },
        numero(){
            return this.$route.params.survey
        }
    },
    watch: {
        $route(to, from) {
            // console.log(this.$route.path)
            this.setActualView()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
