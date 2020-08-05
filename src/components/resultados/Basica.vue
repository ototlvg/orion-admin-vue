<template>
    <div class="basica">
        <!-- <p>{{iValidez}}</p>
        <p>{{iBasica}}</p> -->
        <!-- <p>{{energia.basico}}</p> -->
        <div class="basica__header">
            <div class="basica__header__title-container">
                <p class="basica__header__title-container__title">Resultados</p>
            </div>

            <div class="basica__header__select-container">
                <select class="custom-select main__select main__header__select" @change="pushToNewSurvey($event)">
                    <option :selected="index == numero" :value="index" v-for="index in patient.completed_surveys" :key="index">{{index}}</option>
                </select>
            </div>
        </div>

        <div class="basica__main">

            <div class="basica__main__section basica__main__section--chart">
                <div class="basica__main__section--chart__extra-container">
                    <Card v-for="(K,index) in dataEscala.factorKAgregado" :key="index" :factorKAgregado="K" :puntuacionCrudaConK="dataEscala.puntuacionCrudaConK[index]" :escala="escalasK[index]"></Card>
                </div>
                <div class="basica__main__section--chart__chart-container">
                    <canvas id="myChart" class="chart__chart"></canvas>

                </div>
            </div>

            <div class="chart">
            </div>
        </div>

        <div class="basica__punt">
            <div class="basica__punt__header">
                <p class="basica__punt__header__title">Puntuaciones T</p>
            </div>
            <div class="basica__punt__main">
                <!-- <p>{{dataEscala.puntuacionesT}}</p> -->
                <div class="basica__punt__main__card" v-for="(escala,index) in dataEscala.escalas" :key="index">
                    <div class="basica__punt__main__card__section basica__punt__main__card__section--title-container">
                        <!-- <p>{{escala.escala}}</p> -->
                        <p class="basica__punt__main__card__section--title-container__p basica__punt__main__card__section--title-container__p--uno">{{escala.escala}}</p>
                        <p class="basica__punt__main__card__section--title-container__p basica__punt__main__card__section--title-container__p--dos">({{escala.nombre}})</p>

                    </div>
                    <div class="basica__punt__main__card__section basica__punt__main__card__section--data">
                        <p>{{dataEscala.puntuacionesT[index]}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="basica__inter">
            <div class="basica__inter__header">
                <p>Interpretaciones</p>
            </div>
            <div class="basica__inter__main">
                <div class="basica__inter__main__section basica__inter__main__section--validez">
                    <div class="basica__inter__main__section__header">
                        <p>Escalas de Validez</p>
                    </div>
                    <div class="basica__inter__main__section__body">
                        {{iValidez}}
                    </div>

                </div>
                <div class="basica__inter__main__section basica__inter__main__section--clinica">
                    <div class="basica__inter__main__section__header">
                        <p>Escalas Clinicas</p>
                    </div>
                    <div class="basica__inter__main__section__body basica__inter__main__section__body--clinica">
                        <div class="basica__inter__main__section__body--clinica__card-container">
                            <!-- <span>klasjdklasj</span> -->
                            <!-- <CardInter></CardInter> -->
                            <CardInter v-for="(inter,index) in iClinicas" :key="index" :inter="inter" :escala="escalasClinicas[index]"></CardInter>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Card from './components/Card'
import CardInter from './components/CardInter'
export default {
    name: 'Basica',
    components: {Card, CardInter},
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            dataEscala: {"survey":"2","escalas":[{"id":1,"escala":"L","nombre":"Mentira","tipo":1},{"id":2,"escala":"F","nombre":"Infrecuencia","tipo":1},{"id":3,"escala":"K","nombre":"Correccion","tipo":1},{"id":4,"escala":"Hs","nombre":"Hipocondriasis","tipo":1},{"id":5,"escala":"D","nombre":"Depresion","tipo":1},{"id":6,"escala":"Hi","nombre":"Histeria","tipo":1},{"id":7,"escala":"Dp","nombre":"Desviacion psicotica","tipo":1},{"id":8,"escala":"Mf","nombre":"Masculino-femeneidad","tipo":1},{"id":9,"escala":"Pa","nombre":"Paranoia","tipo":1},{"id":10,"escala":"Pt","nombre":"Psicastenia","tipo":1},{"id":11,"escala":"Es","nombre":"Esquizofrenia","tipo":1},{"id":12,"escala":"Ma","nombre":"Hipomania","tipo":1},{"id":13,"escala":"Is","nombre":"Introversion social","tipo":1}],"puntuacionesCrudas":[0,41,1,11,20,13,24,25,25,39,59,35,34],"factorKAgregado":[1,0,1,1,0],"puntuacionCrudaConK":[12,24,40,60,35],"puntuacionesCompletas":[1,1,1,1,1,1,1,1,1,1,1,1,1],"puntuacionesT":[30,154,0,44,50,33,51,52,103,74,102,83,61],"interpretaciones":{"validez":[{"id":5,"escala":1,"nivel":"Bajo","identificador":49,"puntuacion":"49 o menos","utilidad":"Posiblemente se aparenta tener problemas emocionales o graves","elevacion":"Se responde verdadero a todo lo que produce un perfil elevado","interpretacion":"Patología exagerada-Indicada un sujeto confiado en sí mismo e independiente-Persona cínica o sarcástica"},{"id":6,"escala":2,"nivel":"Muy alto","identificador":91,"puntuacion":"91 o más","utilidad":"Probablemente inválido","elevacion":"Respuestas al azar-Errores de calificación-Dislexia grave","interpretacion":"Poco cooperativo, finge síntomas equivocados-Habilidad de lectura limitada-Resistencia a la prueba"},{"id":14,"escala":3,"nivel":"Bajo","identificador":40,"puntuacion":"40 o menos","utilidad":null,"elevacion":"Al responder finge en forma inadecuada-Responde a todo \"verdadero\"-Suplica ayuda-Defensas inadecuadas","interpretacion":"Cínico,escéptico-Estado de pánico-Pobre autoconcepto-Critico de si mismo y de otros"}],"clinicas":[{"id":447,"escala":4,"nivel":{"id":4,"nivel":"Medio","identificador":41,"puntuacion":"41 a 55"},"interpretacion":"Se manifiesta poco o ningún interés especial acerca del cuerpo o de la salud-La persona es emocionalmente abierta y equilibrada, así como realista y con capacidad de insight"},{"id":452,"escala":5,"nivel":{"id":4,"nivel":"Medio","identificador":41,"puntuacion":"41 a 55"},"interpretacion":"Indica que se trata de una persona conforme consigo misma-Puede ser también un sujeto estable, equilibrado y realista"},{"id":458,"escala":6,"nivel":{"id":5,"nivel":"Bajo","identificador":40,"puntuacion":"40 o menos"},"interpretacion":"Se da en personas cínicas o agresivas-Puede implicar también aislamiento y poco interés en los demás-Personas con pocos intereses"},{"id":462,"escala":7,"nivel":{"id":4,"nivel":"Medio","identificador":41,"puntuacion":"41 a 55"},"interpretacion":"Puede ser una persona sincera, confiable, tensa y responsable"},{"id":467,"escala":8,"nivel":{"id":4,"nivel":"Medio","identificador":41,"puntuacion":"41 a 55"},"interpretacion":"Sujeto práctico y despreocupado-También puede ser realista y convencional"},{"id":474,"escala":9,"nivel":{"id":1,"nivel":"Muy alto","identificador":76,"puntuacion":"76 o mas"},"interpretacion":"Puede indicar alteración del pensamiento-Creencias equivocadas-Ideas de referencia-El sujeto puede ser vengativo y preocupado-La persona puede actuar con base en delirios o fantasías"},{"id":480,"escala":10,"nivel":{"id":2,"nivel":"Alto","identificador":66,"puntuacion":"66 a 75"},"interpretacion":"El sujeto puede ser inseguro, preocupado y ansioso-La persona puede ser aprensiva y tener miedo al fracaso-Puede tratarse de un individuo extremadamente meticuloso e indeciso-Se presenta también en personas moralistas, tenaz e infelices"},{"id":484,"escala":11,"nivel":{"id":1,"nivel":"Muy alto","identificador":76,"puntuacion":"76 o mas"},"interpretacion":"Puede indicar alteraciones del pensamiento y conductas excéntricas-Se puede tratar de un sujeto aislado socialmente-El contacto con la realidad puede ser pobre y manifestarse tendencias delirantes-Puede darse en personas que presentan alucinaciones y autismo"},{"id":489,"escala":12,"nivel":{"id":1,"nivel":"Muy alto","identificador":76,"puntuacion":"76 o mas"},"interpretacion":"Los sujetos pueden ser comunicativos, irritables y extravagantes-La persona puede ser también hiperactiva y dispersa-El individuo puede estar confuso, tomar decisiones impulsivas y mostrar poco control de sus emociones"},{"id":496,"escala":13,"nivel":{"id":3,"nivel":"Moderado","identificador":56,"puntuacion":"56 a 65"},"interpretacion":"Puede ser reservado y serio-Las personas pueden ser autoevaluadas y cautelosas, con un control exagerado de sus impulsos-El individuo puede ser reservado y torpe socialmente"}]}},
            flag: false,
            myChart: null,
            escalasK: [ 
                {escala: 'Hs', nombre: 'Hipocondriasis'}, 
                {escala: 'Dp', nombre: 'Desviacion psicotica'}, 
                {escala: 'Pt', nombre: 'Psicastenia'}, 
                {escala: 'Es', nombre: 'Esquizofrenia'}, 
                {escala: 'Ma', nombre: 'Hipomania'} 
                
            ]
            // 'Hs', 'Dp', 'Pt', 'Es', 'Ms'
        }
    },
    computed: {
        patient(){
            return this.$store.getters.getPatient
        },
        basica(){
            return this.$store.getters.getBasica
        },
        numero(){
            return this.$route.params.survey
        },
        iValidez(){
            return this.dataEscala.interpretaciones.validez
        },
        iClinicas(){
            return this.dataEscala.interpretaciones.clinicas
        },
        escalasValidez(){

        },
        escalasClinicas(){
            let x= JSON.parse(JSON.stringify(this.dataEscala.escalas));
            return x.splice(3,11)
        },
        // loading(){
        //     return this.$store.getters.getLoading
        // }
    },
    beforeCreate(){
        this.$store.commit('setActualResults', { id: 1, name: "Basica"})
    },
    mounted: function () {
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
            // color: '#FE777B'
            align: 'top'
        });
        this.grafica()
    },
    created(){
        this.getEscala()
        
    },
    methods: {
        getEscala(){
            let survey=this.$route.params.survey
            let escalaDataArray= this.$store.getters.getBasica
            // console.log(escalaDataArray)
            if(escalaDataArray.length == 0){
                this.$store.commit('setLoading',true)
                console.log('No hay nada en array, mandando a buscar')
                this.getNewEscala(survey)
            }else{
                console.log('Buscando')
                const found= escalaDataArray.find(element => element.survey == survey);
                if(found == undefined){
                    console.log('Aun no esta en la app, llamando informacion')
                    this.$store.commit('setLoading',true)
                    this.getNewEscala(survey)
                }else{
                    console.log('Encontrado')
                    this.dataEscala= found
                    // this.grafica()
                }
            }
        },
        pushToNewSurvey(event){
            let survey= event.target.value
            if(this.numero != survey){
                this.$router.push({ path: `/resultados/basica/${survey}` })
            }
        },
        getNewEscala(survey){
            let este= this
            this.$store.dispatch('getEscalaBasica',survey)
                .then( data => {
                    this.$store.commit('setLoading',false)
                    // console.log(data)
                    this.$store.commit('setBasica', data)
                    este.dataEscala= data
                    // este.grafica()
                })
                .catch( data => {
                    // console.log('error funcionando correctamente')
                })
        },
        grafica(){
            // console.log('Funcion de grafica activada')
            let escalasData= this.dataEscala.escalas
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
            ctx.height =300;
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
                        data: this.dataEscala.puntuacionesCompletas,
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
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 3,
                        lineColor: "#1ff502",
                        // backgroundColor: "#1ff502",
                        borderColor: "rgba(0, 132, 255,0.7)",
                        // borderDash: [5, 5],
                        // backgroundColor: "#1ff502",
                        // pointBackgroundColor: "#1ff502",
                        // pointBorderColor: "#1ff502",
                        // pointHoverBackgroundColor: "#1ff502",
                        // pointHoverBorderColor: "#1ff502"
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
        prueba(){
            // this.myChart.data.datasets[0].data=[4,4,4,4,4,4,4,4,4,4,4,4,4]
            // this.myChart.update();
        }
    },
    watch: {
        $route(to, from) {
            // console.log(this.$route.path)
            this.getEscala()
        },
        dataEscala(){
            this.myChart.data.datasets[0].data=this.dataEscala.puntuacionesCompletas
            this.myChart.update();
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/scss/variables';
// EL CONTROL DEL OVERFLOW DEL VIEW SE HACE DESDE "Resultados"
$gap: 1.5em;
$font-size: 1.3em;
.basica{
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
                font-size: $font-size;
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
        // background: blue;
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
                    padding: 2em;
                    background: white;
                    // box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                    // box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                    box-shadow: $box-shadow;
                }

            }
        }
    }

    &__punt{
        width: 100%;
        // background: blue;
        // overflow: hidden;
        margin-bottom: $gap;
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
            // overflow: hidden;
            @media (min-width: $large){
                display: flex;
            }
            &__card{
                width: 100%;
                display: flex;
                box-shadow: $box-shadow;
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

    &__inter{
        width: 100%;
        // background-color: red;
        &__header{
            p{
                font-size: $font-size;
                margin: 0;
            }
            margin-bottom: $gap;
        }

        &__main{
            width: 100%;
            // background: green;
            display: grid;
            // grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 1em;
            &__section{
                // background-color: white;
                &__header{
                    p{
                        margin: 0;
                    }
                    margin-bottom: $gap;
                }

                &__body{
                    width: 100%;
                    &--clinica{

                        &__card-container{
                            // background: red;
                            display: grid;
                            gap: $gap;
                            width: 100%;
                        }
                    }
                }
            }
        }  

    }
}

.chart{
    width: 100%;
    &__chart{
        width: 100%;
    }
}
</style>
