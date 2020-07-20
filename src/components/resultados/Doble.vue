<template>
    <div class="doble">
        <!-- <p>Escala: {{escalaActual}}</p> -->
        <!-- <select class="custom-select main__select main__header__select" @change="pushToNewSurvey($event)">
            <option :selected="index == numero" :value="index" v-for="index in patient.completed_surveys" :key="index">{{index}}</option>
        </select> -->
        <!-- <p>{{dataEscalaActual}}</p> -->



        <div class="doble__header">
            <div class="doble__header__title-container">
                <p class="doble__header__title-container__title">Resultados</p>
            </div>

            <div class="doble__header__select-container">
                <select class="custom-select main__select main__header__select" @change="pushToNewSurvey($event)">
                    <option :selected="index == numero" :value="index" v-for="index in patient.completed_surveys" :key="index">{{index}}</option>
                </select>
            </div>
        </div>


        <!-- <p v-if=" dataEscala!=null ">{{dataEscala}}</p> -->

        <div class="doble__main">

            <div class="doble__main__section doble__main__section--chart">
                <div class="doble__main__section--chart__chart-container">
                    <canvas id="myChart" class="chart__chart"></canvas>
                </div>
            </div>

            <div class="chart">
            </div>
        </div>

        <div class="doble__punt">
            <div class="doble__punt__header">
                <p class="doble__punt__header__title">Puntuaciones T</p>
            </div>
            <div class="doble__punt__main">
                <div class="doble__punt__main__card" v-for="(escala,index) in escalasFiltrado" :key="index">
                    <!-- <p>{{escala.escala}}</p> -->
                    <div class="doble__punt__main__card__section doble__punt__main__card__section--title-container">
                        <p class="doble__punt__main__card__section--title-container__p doble__punt__main__card__section--title-container__p--uno">{{escala.escala}}</p>
                        <p class="doble__punt__main__card__section--title-container__p doble__punt__main__card__section--title-container__p--dos">({{escala.nombre}})</p>

                    </div>
                    <div class="doble__punt__main__card__section doble__punt__main__card__section--data">
                        <p>{{dataEscalaActual.puntuacionesT[index]}}</p>
                    </div>
                </div>
            </div>
        </div>
        
        
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
            myChart: null,
            dataEscalaActual: {"survey":"2","escalas":[{"id":14,"escala":"A","nombre":"Ansiedad","tipo":2},{"id":15,"escala":"R","nombre":"Represion","tipo":2},{"id":16,"escala":"Fyo","nombre":"Fuerza del yo","tipo":2},{"id":17,"escala":"A-MAC","nombre":"Alcoholismo de MacAndrew revisada","tipo":2},{"id":18,"escala":"Fp","nombre":"Infrecuencia posterior","tipo":2},{"id":19,"escala":"HR","nombre":"Hostilidad reprimida","tipo":2},{"id":20,"escala":"Do","nombre":"Dominancia","tipo":2},{"id":21,"escala":"Rs","nombre":"Responsabilidad social","tipo":2},{"id":22,"escala":"Dpr","nombre":"Desajuste profesional","tipo":2},{"id":23,"escala":"GM","nombre":"Genero Masculino","tipo":2},{"id":24,"escala":"GF","nombre":"Genero femenino","tipo":2},{"id":25,"escala":"EPK","nombre":"Desorden de estres postraumatico de Keane","tipo":2},{"id":26,"escala":"EPS","nombre":"Desorden de estres postraumatico de Schelenger","tipo":2},{"id":27,"escala":"Is1","nombre":"Timidez/inhibicion","tipo":2},{"id":28,"escala":"Is2","nombre":"Evitacion social","tipo":2},{"id":29,"escala":"Is3","nombre":"Alineacion - si mismo y otros","tipo":2},{"id":45,"escala":"INVAR","nombre":"Inconsistencia de respuestas contradictorias","tipo":2},{"id":46,"escala":"INVER","nombre":"Inconsistencia en las respuestas verdadero","tipo":2}],"puntuacionesCrudas":[38,0,20,38,37,7,6,6,28,19,15,38,47,8,2,17],"puntuacionesT":[88,0,0,99,188,0,0,0,74,0,0,97,92,59,45,86],"invar":5,"inver":23,"puntuacionesCompletas":[38,0,20,38,37,7,6,6,28,19,15,38,47,8,2,17,5,23]}

        }
    },
    beforeCreate(){
    },
    created(){
        this.setDataEscala()
        this.setActualView()
    },
    mounted: function () {
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
            // color: '#FE777B'
            align: 'top'
        });
        this.grafica()
    },
    methods: {
        getEscala(escala){
            
        },
        setActualView(){
            let escalaActual= this.$route.path.split('/')[2]
            // console.log(escalaActual)
            this.escalaActual= escalaActual
            let survey=this.$route.params.survey

            const escalaCapitalized = escalaActual.charAt(0).toUpperCase() + escalaActual.slice(1)
            let escalaDataArray= this.$store.getters['get'+escalaCapitalized]
            // console.log(escalaCapitalized)
            this.$store.commit('setActualResults', { id: escalaCapitalized=='Suplementaria' ? 2 : 3, name: escalaCapitalized })
            
            let obj= { name: escalaActual, survey: survey }

            if(escalaDataArray.length == 0){
                // console.log('No hay nada en array, mandando a buscar')
                this.getNewEscala(obj, escalaCapitalized)
            }else{
                // console.log('Buscando')
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
            let escalaActual= this.$route.path.split('/')[2]
            if(this.numero != survey){
                this.$router.push({ path: `/resultados/${escalaActual}/${survey}` })
            }
        },
        grafica(){
            // console.log('Funcion de grafica activada')
            let escalasData= this.dataEscalaActual.escalas
            let escalas= []
            // console.log(escalas)
            escalasData.forEach((value,index) => {
                // console.log(value)
                let x=value.escala;
                if(value.id==4){
                    x= `${value.escala}+.5K`
                }else if(value.id==7){
                    x= `${value.escala}+.4K`;
                }else if(value.id==10 || value.id==11){
                    x= `${value.escala}+.1K`
                }else if(value.id==12){
                    x= `${value.escala}+.2K`
                }

                escalas.push(x)
            })
            
            let ctx= document.getElementById('myChart');
            // console.log(ctx)
            ctx.height =100;
            // myChart.data.datasets[0].data
            this.myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: escalas,
                    datasets: [{
                        // label: '# of Votes',
                        fill: false,
                        lineTension: 0,
                        // tension: 0,
                        data: this.dataEscalaActual.puntuacionesCompletas,
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 4
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: false,
                            // gridLines: {
                            //     display:false
                            // }
                        }],
                        
                    },
                    legend: {
                            display: false
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.yLabel;
                            }
                        }
                    }
                }
            })
        },
        setDataEscala(){
            let escalaActual= this.$route.path.split('/')[2]
            if(escalaActual == 'suplementaria'){
                this.dataEscalaActual= {"survey":"2","escalas":[{"id":14,"escala":"A","nombre":"Ansiedad","tipo":2},{"id":15,"escala":"R","nombre":"Represion","tipo":2},{"id":16,"escala":"Fyo","nombre":"Fuerza del yo","tipo":2},{"id":17,"escala":"A-MAC","nombre":"Alcoholismo de MacAndrew revisada","tipo":2},{"id":18,"escala":"Fp","nombre":"Infrecuencia posterior","tipo":2},{"id":19,"escala":"HR","nombre":"Hostilidad reprimida","tipo":2},{"id":20,"escala":"Do","nombre":"Dominancia","tipo":2},{"id":21,"escala":"Rs","nombre":"Responsabilidad social","tipo":2},{"id":22,"escala":"Dpr","nombre":"Desajuste profesional","tipo":2},{"id":23,"escala":"GM","nombre":"Genero Masculino","tipo":2},{"id":24,"escala":"GF","nombre":"Genero femenino","tipo":2},{"id":25,"escala":"EPK","nombre":"Desorden de estres postraumatico de Keane","tipo":2},{"id":26,"escala":"EPS","nombre":"Desorden de estres postraumatico de Schelenger","tipo":2},{"id":27,"escala":"Is1","nombre":"Timidez/inhibicion","tipo":2},{"id":28,"escala":"Is2","nombre":"Evitacion social","tipo":2},{"id":29,"escala":"Is3","nombre":"Alineacion - si mismo y otros","tipo":2},{"id":45,"escala":"INVAR","nombre":"Inconsistencia de respuestas contradictorias","tipo":2},{"id":46,"escala":"INVER","nombre":"Inconsistencia en las respuestas verdadero","tipo":2}],"puntuacionesCrudas":[38,0,20,38,37,7,6,6,28,19,15,38,47,8,2,17],"puntuacionesT":[88,0,0,99,188,0,0,0,74,0,0,97,92,59,45,86],"invar":5,"inver":23,"puntuacionesCompletas":[38,0,20,38,37,7,6,6,28,19,15,38,47,8,2,17,5,23]}
            }else{
                this.dataEscalaActual= {"survey":"2","escalas":[{"id":30,"escala":"ANS","nombre":"Ansiedad","tipo":3},{"id":31,"escala":"MIE","nombre":"Miedos","tipo":3},{"id":32,"escala":"OBS","nombre":"Obsesividad","tipo":3},{"id":33,"escala":"DEP","nombre":"Depresion","tipo":3},{"id":34,"escala":"SAU","nombre":"Preocupacion por la salud","tipo":3},{"id":35,"escala":"DEL","nombre":"Pensamiento delirante","tipo":3},{"id":36,"escala":"ENJ","nombre":"Enojo","tipo":3},{"id":37,"escala":"CIN","nombre":"Cinismo","tipo":3},{"id":38,"escala":"PAS","nombre":"Practicas antisociales","tipo":3},{"id":39,"escala":"PTA","nombre":"Personalidad tipo A","tipo":3},{"id":40,"escala":"BAE","nombre":"Baja autoestima","tipo":3},{"id":41,"escala":"ISO","nombre":"Incomodidad social","tipo":3},{"id":42,"escala":"FAM","nombre":"Problemas familiares","tipo":3},{"id":43,"escala":"DTR","nombre":"Dificultad en el trabajo","tipo":3},{"id":44,"escala":"RTR","nombre":"Rechazo al tratamiento","tipo":3}],"puntuacionesCompletas":[18,16,16,28,14,22,15,23,21,19,21,13,20,28,23],"puntuacionesT":[78,84,0,0,71,0,81,74,0,78,0,63,87,0,0],"nota":"Aqui las puntuaciones crudas son iguales a las puntuaciones completas"}
            }
        }
    },
    computed: {
        patient(){
            return this.$store.getters.getPatient
        },
        numero(){
            return this.$route.params.survey
        },
        escalasFiltrado(){
            let escalasObj= this.dataEscalaActual.escalas
            let escalaActual= this.$route.path.split('/')[2]
            if(escalaActual=="suplementaria"){
                console.log('Filtrado de suplementaria activado')
                let f= [];
                escalasObj.forEach(function(element){
                    if(element.escala != 'INVAR' && element.escala!='INVER'){
                        f.push(element)
                    }

                });
                return f
            }else{
                return escalasObj
            }
        },
        // escalaActual(){
        //     return this.$route.path.split('/')[2]
        // }
    },
    watch: {
        $route(to, from) {
            // console.log(this.$route.path)
            this.setActualView()
        },
        dataEscalaActual(){
            // console.log(this.dataEscalaActual.puntuacionesCompletas)
            // console.log(this.myChart.data.labels)

            let escalasData= this.dataEscalaActual.escalas
            let escalas= []
            // console.log(escalas)
            escalasData.forEach((value,index) => {
                // let x=value.escala;
                // console.log(value.escala)
                escalas.push(value.escala)
            })
            // console.log(this.myChart.data.labels)
            this.myChart.data.labels= escalas
            this.myChart.data.datasets[0].data=this.dataEscalaActual.puntuacionesCompletas
            this.myChart.update();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/scss/variables';
/* EL CONTROL DEL OVERFLOW DEL VIEW SE HACE DESDE "Resultados" */
$gap: 1.5em;
.doble{
    padding: $gap;
    // padding-top: $gap;
    @media (min-width: $medium){
        padding: 3em;
        padding-top: $gap;
    }
    .oculto{
        display: none;
    }

    &__header{
        // background: red;
        display: flex;
        justify-content: space-between;
        margin-bottom: $gap;
        &__title-container{
            // background: blue;
            display: flex;
            align-items: center;
            &__title{
                font-size: 1.3em;
                margin: 0;
            }
        }

        &__select-container{
            margin: 0;

        }
    }
    // background: white;
    &__main{
        // width: 100%;
        // background: white;
        margin-bottom: $gap;
        &__section{

            &--chart{
                &__extra-container{
                    // display: flex;
                    // flex-wrap: wrap;
                    // background: red;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: $gap;
                    @media (min-width: $medium){
                        grid-template-columns: 1fr 1fr 1fr;
                    }
                    @media (min-width: $large){
                        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                    }
                    margin-bottom: $gap;
                }

                &__chart-container{
                    box-shadow: $box-shadow;
                    padding-bottom: 1.2em;
                    padding-top: 1.2em;
                    @media (min-width: $medium){
                        padding: 2em;
                    }
                    background: white;
                }

            }
        }
    }

    &__punt{
        // width: 100%;
        width: 100%;
        // background: blue;
        
        &__header{
            margin-bottom: $gap;
            &__title{
                font-size: 1.3em;
                margin: 0;
            }
        }
        &__main{
            // display: flex;
            // flex-direction: column;
            // flex-wrap: wrap;
            display: grid;
            grid-template-columns: 1fr;
            gap: 1em;
            width: 100%;
            overflow: auto;
            @media (min-width: $large){
                display: flex;
            }
            &__card{
                // border: 10px solid black;
                box-shadow: $box-shadow;
                width: 100%;
                display: flex;
                @media (min-width: $large){
                    flex-wrap: wrap;
                }
                &__section{
                    padding: 1em;
                    // padding-left: 0;
                    // p{
                    //     margin: 0;
                    // }
                    display: flex;
                    align-items: center;
                    &--title-container{
                        background: $primary-color;
                        width: 65%;
                        color: white;
                        @media (min-width: $large){
                            display: flex;
                            flex-wrap: wrap;
                            width: 100%;
                        }
                        &__p{
                            margin: 0;
                            &--uno{
                                // color: red;
                                // background: red;
                                text-align: center;
                            }
                            &--dos{
                                // color: red;
                                margin-left: 5px;
                                @media (min-width: $large){
                                    display: none;

                                }
                            }
                            @media (min-width: $large){
                                width: 100%;
                            }
                        }
                    }
                    &--data{
                        // width: 100%;
                        justify-content: center;
                        flex: 1 1 auto;
                        background: white;
                        p{
                            margin: 0;
                        }
                    }
                }
            }
        }
    }

    
}
</style>
