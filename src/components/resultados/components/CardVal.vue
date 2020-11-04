<template>
    <div class="card-val">
        <!-- <p>Hola mundo</p> -->
        <!-- <div class="card-val__title-container" :class="alerta"> -->
        <div class="card-val__title-container">
            <p>{{escala.escala}}</p>
            <!-- {{escala.escala}} -->
        </div>
        <div class="card-val__body">
            <!-- Nivel de puntuacion T -->
            <div class="card-val__body__section card-val__body__section--main">
                <div class="card-val__body__section--main__title-container">

                    <!-- Quita el :class y descomenta la propiedad background-color de &__logo (Si se queda activado y :class esta activado el color igual se ve) -->
                    <span class="material-icons card-val__body__section--main__title-container__logo" :class="alerta">title</span>
                    <p class="card-val__body__section--main__title-container__title">{{inter.nivel}}</p>
                </div>
                <div class="card-val__body__section--main__title-container" v-if="inter.utilidad!=null">

                    <!-- Quita el :class y descomenta la propiedad background-color de &__logo (Si se queda activado y :class esta activado el color igual se ve) -->
                    <span class="material-icons card-val__body__section--main__title-container__logo card-val__body__section--main__title-container__logo--utilidad">build</span>
                    <p class="card-val__body__section--main__title-container__title">{{inter.utilidad}}</p>
                </div>
                <!-- <ul class="card-val__body__section--main__ul">
                    <li class="card-val__body__section--main__ul__li" v-for="(interpretacion,index) in interpretaciones" :key="index">{{interpretacion}}.</li>
                </ul> -->
            </div>
        </div>
        <div class="card-val__extra">
            <div class="card-val__extra__section">
                <p class="card-val__extra__section__title" v-if="inter.utilidad!=null">Fuentes de elevacion</p>
                <p class="card-val__extra__section__title" v-else>Funcion de elevacion</p>
                <ul>
                    <li v-for="(e, index) in elevaciones" :key="index">{{e}}</li>
                </ul>
            </div>
            <div class="card-val__extra__section">
                <p class="card-val__extra__section__title">Interpretaciones</p>
                <ul>
                    <li v-for="(i, index) in interpretaciones" :key="index">{{i}}</li>
                </ul>
            </div>

        </div>
        
    </div>
</template>

<script>
export default {
    name: "CardVal",
    props: {
        inter: { type: Object },
        escala: { type: Object}
    },
    data() {
        return {
            // hola: 'Alto'
        };
    },
    computed: {
        interpretaciones(){
            return this.inter.interpretacion.split("-");
        },
        alerta(){
            if(this.inter.nivel == 'Muy alto'){
                return 'MuyAlto'
            }else{
                return this.inter.nivel
            }
        },
        elevaciones(){
            return this.inter.elevacion.split('-')
        }
    },
    created() {
        
    },
    mounted: function () {
        // console.log('Hola mundo')
    },
    methods: {
        
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../../assets/scss/variables';
$margin-master: 1em;
.card-val{
    margin-bottom: 1em;
    box-shadow: $box-shadow;
    @media (min-width: $medium){
        box-shadow: none;
    }
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &__title-container{ // Primero
        background: $primary-color;
        flex: 0 0 auto;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1em;
        @media (min-width: $medium){
            width: 100px;
            padding: 0;
        }

        p{
            // background: white;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            margin: 0;
            color: white;
            @media (min-width: $medium){

            }
            // box-shadow: $box-shadow;
        }
    }
    $padding-inter: 1.5em;
    &__body{ // Segundo
        display: flex;
        align-items: center;
        // flex-wrap: wrap;
        flex: 0 0 auto;
        background: white;
        padding: $padding-inter;
        width: 100%;
        border-bottom: solid 2px rgba(0,0,0,0.1);
        // background-color: red;
        @media (min-width: $medium){
            width: 40%;
            border-bottom: 0;
        }
        @media (min-width: $large){
            width: 30%;
        }
        

        // background: red;
        &__section{
            // background: red;
            &--main{
                &__title-container{
                    margin-bottom: 9px;
                    
                    width: 100%;
                    // background: red;
                    font-size: 1.3em;
                    color: rgba(0, 0, 0, 0.445);
                    display: flex;
                    align-items: center;
                    @media (min-width: $medium){
                        &:nth-last-child(1){
                            // background: red !important;
                            margin-bottom: 0;
                        }
                    }
                    &__logo{
                        $size: 23px;
                        width: $size;
                        height: $size;
                        // background-color: rgba(0, 0, 0, 0.445);
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        font-size: 13px;
                        &--utilidad{
                            background-color: $primary-color;
                        }
                    }

                    &__title{
                        margin: 0;
                        margin-left: 8px;
                    }
                }

                    // background: red;
                &__ul{
                    margin: 0;
                    padding-left: 16px;
                    &__li{

                    }
                }

            }
        }

    }

    &__extra{
        width: 100%;
        // background: red;
        // color: rgba(0, 0, 0, 0.445);
        @media (min-width: $medium){
            width: 1px;
            flex: 1 1 auto;
            margin-left: $margin-master;
        }
        @media (min-width: $large){
            display: flex;
        }

        &__section{
            &__title{
                color: rgba(0, 0, 0, 0.445);
            }
            // background: red !important;
            padding: $padding-inter;
            // padding-bottom: 0;
            background: white;
            // border-bottom: 1px solid black;
            border-bottom: solid 2px rgba(0,0,0,0.1);
            @media (min-width: $medium){
                border-bottom: 0;
                &:nth-child(1){
                    margin-bottom: $margin-master;
                }
            }
            @media (min-width: $large){
                &:nth-child(1){
                    margin-bottom: 0;
                    margin-right: $margin-master;
                }
                // background: red;
                width: 50%;
            }
            ul{
                margin: 0;
            }

            // margin-bottom: 1em;
        }
    }
}

.MuyAlto{
    $color: rgb(49, 185, 49);
    background: $color;
}

.Alto{
    // background: rgb(0, 138, 192);
    background: $primary-color;
}

.Moderado{
    // background: #FFC300;
    // background: rgb(230, 177, 3);
    background: rgb(212, 164, 4);
}

.Medio{
    $color: orangered;
    background: $color;
    // color: $color;
}

.Bajo{
    // background: #C70039;
    background: rgb(199, 0, 17);
}

</style>