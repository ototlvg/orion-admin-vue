<template>
    <div class="hello">
        <div class="main">
            <!-- <p>Hola mundo</p> -->
            <div class="main__header">
                <h1 class="main__header__title">Escala basica</h1>
                <select class="custom-select main__select main__header__select">
                    <!-- <option selected>O</option> -->
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <div class="main__body">

                

                <div class="main__body__chart-window">

                    
                    <div class="main__body__chart-window__kdata">
                        <!-- <div class="main__body__chart-window__kdata__data">
                            <p class="main__body__chart-window__kdata__data__title">Puntuacion cruda</p>
                            <p class="main__body__chart-window__kdata__data__data">45</p>
                            <p class="main__body__chart-window__kdata__data__title">Factor K Agregado</p>
                            <p class="main__body__chart-window__kdata__data__data">45</p>
                        </div> -->
                        <p>Hola</p>
                    </div>

                    <div class="main__body__chart-window__chart-container">
                        <canvas id="myChart" class="main__body__chart-window__chart-container__chart"></canvas>
                    </div>

                </div>


                <!-- TX01 -->
                <!-- <div class="main__body__hs-window">
                    <p>Puntuacion cruda</p>
                    <p>45</p>
                    <p>Factor K Agregado</p>
                    <p>45</p>
                </div>
                <div class="main__body__dp-window main__body__mini-window">
                    <p class="main__body__mini-window__title">Puntuacion cruda</p>
                    <p class="main__body__mini-window__data">45</p>
                    <p class="main__body__mini-window__title">Factor K Agregado</p>
                    <p class="main__body__mini-window__data">45</p>
                </div>
                <div class="main__body__pt-window main__body__mini-window">
                    <span>Uno</span>
                    <span>Dos</span>
                </div>
                <div class="main__body__es-window main__body__mini-window">
                    <span>Uno</span>
                    <span>Dos</span>
                </div>
                <div class="main__body__ms-window main__body__mini-window">
                    <span>Uno</span>
                    <span>Dos</span>
                </div> -->
                

            </div>
        </div>
    </div>
</template>

<script>
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
export default {
    name: "HelloWorld",
    data() {
        return {
            msg: "Welcome to Your Vue.js App",
            data: {"escalas": [{"id": 1,"escala": "L","nombre": "Mentira","tipo": 1},{"id": 2,"escala": "F","nombre": "Infrecuencia","tipo": 1},{"id": 3,"escala": "K","nombre": "Correccion","tipo": 1},{"id": 4,"escala": "Hs","nombre": "Hipocondriasis","tipo": 1},{"id": 5,"escala": "D","nombre": "Depresion","tipo": 1},{"id": 6,"escala": "Hi","nombre": "Histeria","tipo": 1},{"id": 7,"escala": "Dp","nombre": "Desviacion psicotica","tipo": 1},{"id": 8,"escala": "Mf","nombre": "Masculino-femeneidad","tipo": 1},{"id": 9,"escala": "Pa","nombre": "Paranoia","tipo": 1},{"id": 10,"escala": "Pt","nombre": "Psicastenia","tipo": 1},{"id": 11,"escala": "Es","nombre": "Esquizofrenia","tipo": 1},{"id": 12,"escala": "Ma","nombre": "Hipomania","tipo": 1},{"id": 13,"escala": "Is","nombre": "Introversion social","tipo": 1}],"puntuacionesCrudas": [15,19,29,21,37,47,26,33,15,9,19,11,35],"factorKAgregado": [15,12,29,29,6],"puntuacionCrudaConK": [36,38,38,48,17],"puntuacionesCompletas": [15,19,29,36,37,47,38,33,15,38,48,17,35],"puntuacionesT": [95,95,81,0,80,101,87,43,67,69,83,39,59],"interpretaciones": {"validez": [{"id": 1,"escala": 1,"nivel": "Muy Alto","identificador": 80,"puntuacion": "80 o más","utilidad": "Probablemente inválido","elevacion": "El sujeto aparenta estar bien adaptado","interpretacion": "Resistencia a la prueba o ingenuidad"},{"id": 6,"escala": 2,"nivel": "Muy alto","identificador": 91,"puntuacion": "91 o más","utilidad": "Probablemente inválido","elevacion": "Respuestas al azar-Errores de calificación-Dislexia grave","interpretacion": "Poco cooperativo, finge síntomas equivocados-Habilidad de lectura limitada-Resistencia a la prueba"},{"id": 7,"escala": 2,"nivel": "Alto","identificador": 71,"puntuacion": "71 a 90","utilidad": "Validez cuestionable","elevacion": "Patología fingida-Proceso psicótico-Se responde a todo \"verdadero\"","interpretacion": "Súplica de ayuda-Crisis de identidad adolescente-Estado de confusión"}],"clinicas": [{"id": 448,"escala": 4,"nivel": 5,"interpretacion": "Puede presentarse cuando se niegan signos o síntomas de enfermedad-Puede tratarse también de personas optimistas y energéticas que pueden ser además capaces y eficientes"},{"id": 449,"escala": 5,"nivel": 1,"interpretacion": "Puede implicar que se trata de un sujeto retraído, abrumado por los problemas o desesperanzado-Puede indicar también sentimientos de culpa, devaluación e inadecuación-El sujeto puede además estar preocupado por la muerte y el suicidio-Se puede relacionar también con abatimiento y lentitud en el pensamiento y la acción"},{"id": 454,"escala": 6,"nivel": 1,"interpretacion": "Puede implicar una persona fácilmente influenciable-Ansiedad repentina y episodios de pánico-Sujeto desinhibido o caprichoso-Conductas infantiles ante la frustración-Se puede reaccionar a los problemas emocionales desarrollando síntomas físicos"},{"id": 459,"escala": 7,"nivel": 1,"interpretacion": "Se presenta en personas que tienen poca capacidad de juicio-Puede indicar inestabilidad e irresponsabilidad en un sujeto inmaduro y centrado en sí mismo-Se pueden presentar conductas antisociales-Puede tratarse de un individuo agresivo o explotador"},{"id": 472,"escala": 8,"nivel": 9,"interpretacion": "Persona capaz y eficiente-Considerada con los demás, empática y de trato fácil-Idealista"},{"id": 475,"escala": 9,"nivel": 2,"interpretacion": "El sujeto puede ser violento y resentido-Puede proyectar la culpa y las críticas-Es una persona hostil y suspicaz-Indica rigidez y obstinación-Tendencia a interpretar mal las situaciones sociales"},{"id": 480,"escala": 10,"nivel": 2,"interpretacion": "El sujeto puede ser inseguro, preocupado y ansioso-La persona puede ser aprensiva y tener miedo al fracaso-Puede tratarse de un individuo extremadamente meticuloso e indeciso-Se presenta también en personas moralistas, tenaz e infelices"},{"id": 484,"escala": 11,"nivel": 1,"interpretacion": "Puede indicar alteraciones del pensamiento y conductas excéntricas-Se puede tratar de un sujeto aislado socialmente-El contacto con la realidad puede ser pobre y manifestarse tendencias delirantes-Puede darse en personas que presentan alucinaciones y autismo"},{"id": 493,"escala": 12,"nivel": 5,"interpretacion": "El sujeto puede ser apático y pesimistas-Tímido y dependiente-Falta de energía con poca confianza en sí mismo-Puede estar deprimido y fatigarse fácilmente"},{"id": 496,"escala": 13,"nivel": 3,"interpretacion": "Puede ser reservado y serio-Las personas pueden ser autoevaluadas y cautelosas, con un control exagerado de sus impulsos-El individuo puede ser reservado y torpe socialmente"}]}}
        };
    },
    created() {
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
            // color: '#FE777B'
            align: 'top'
        });
    },
    mounted: function () {
        this.grafica()
    },
    methods: {
        grafica(){

            // console.log(this.data.puntuacionesCompletas)
            // let dataNumber= this.data.puntuacionesCompletas
            let escalasData= this.data.escalas
            let escalas= []
            escalasData.forEach((value,index) => {
                // console.log(value)

                if(value.id==4){
                    value.escala= `${value.escala}+.5K`
                }else if(value.id==7){
                    value.escala= `${value.escala}+.4K`;
                }else if(value.id==10 || value.id==11){
                    value.escala= `${value.escala}+.1K`
                }else if(value.id==12){
                    value.escala= `${value.escala}+.2K`
                }

                escalas.push(value.escala)
            })

            var ctx = document.getElementById('myChart');
            ctx.height =40;
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: escalas,
                    datasets: [{
                        // label: '# of Votes',
                        fill: false,
                        lineTension: 0,
                        // tension: 0,
                        data: this.data.puntuacionesCompletas,
                        // backgroundColor: [
                        //     'rgba(255, 99, 132, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(255, 206, 86, 0.2)',
                        //     'rgba(75, 192, 192, 0.2)',
                        //     'rgba(153, 102, 255, 0.2)',
                        //     'rgba(255, 159, 64, 0.2)',
                        //     'rgba(255, 99, 132, 0.2)',
                        //     'rgba(54, 162, 235, 0.2)',
                        //     'rgba(255, 206, 86, 0.2)',
                        //     'rgba(75, 192, 192, 0.2)',
                        //     'rgba(153, 102, 255, 0.2)',
                        //     'rgba(255, 159, 64, 0.2)',
                        //     'rgba(255, 99, 132, 0.2)'
                        // ],
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
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$mainPadding: 0;
.hello{
    // background: red;
    width: 100%;
    display: flex;
    .main{
        // background: blue;
        width: 100%;
        // padding: $mainPadding;
        // padding: 0 3em;
        &__header{
            width: 100%;
            height: 100px;
            background: tomato;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 3em;
            margin-bottom: 3em;
            &__title{
                font-size: 2em;
                padding: 0;
                margin: 0;
            }
            &__select{
                width: 4em;
            }
        }
        &__body{
            padding: 0 3em;
            display: grid;
            &__chart-window{
                &__kdata{
                    display: flex;
                    background: red;
                    // main__body__chart-window__kdata__data__title
                    &__data{
                        // background: blue;
                        flex: 1 1 auto;
                        &__title{
                            color: white;
                        }
                    }
                }
            }
            

            // <!-- TX01 -->
            // grid-template-columns: 5fr 1fr 1fr 1fr;
            // grid-template-rows: 120px 120px;
            // grid-template-areas: 
            //     "chart hs dp pt"
            //     "chart hs es ms"
            // ;
            // gap: 1.2em;
            // // background: gray;

            // &__mini-window{
            //     background: gray;
            //     padding: 0.6em;
            //     p{
            //         margin: 0;
            //         width: 100%;
            //         text-align: right;
            //     }
            //     &__title{
            //         font-size: 0.9em;
            //     }
            //     &__data{
            //         // color: red;
            //         font-size: 1.2em;
            //     }

            // }

            // &__chart-window{
            //     grid-area: chart;
            //     display: flex;
            //     align-items: center;
            //     // background: gray;
            //     width: 100%;
            //     &__chart-container{
            //         // background: red;
            //         // padding: 1em;
            //         width: 100%;
            //         // height: 10em !important;
            //         &__chart{
            //             // width: 100%;
            //             // height: 26em !important;
            //         }
            //     }
            // }

            // &__hs-window{
            //     background: gray;
            //     grid-area: hs;
            // }

            // &__dp-window{
            //     // background: gray;
            //     grid-area: dp;
            // }

            // &__pt-window{
            //     // background: purple;
            //     grid-area: pt;
            // }

            // &__es-window{
            //     // background: red;
            //     grid-area: es;
            // }
            
            // &__ms-window{
            //     // background: red;
            //     grid-area: ms;
            // }

        }
    }
}
.contenedor{
    /* height: 300px !important; */
    // background: red;
    
    
}
#myChart{
    height: 2em;
}
</style>