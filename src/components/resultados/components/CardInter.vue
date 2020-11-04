<template>
    <div class="card-inter">
        <div class="card-inter__title-container" :class="alerta" v-if="checkIfInterIsObject" data-toggle="tooltip" :title="escala.nombre">
            <p>{{escala.escala}}</p>
        </div>
        <div class="card-inter__body" v-if="checkIfInterIsObject">
            <!-- Nivel de puntuacion T -->
            <div class="card-inter__body__title-container">
                <!-- Quita el :class y descomenta la propiedad background-color de &__logo (Si se queda activado y :class esta activado el color igual se ve) -->
                <span class="material-icons card-inter__body__title-container__logo" :class="alerta">title</span>
                <p class="card-inter__body__title-container__title">{{inter.nivel.nivel}}</p>
            </div>
            <ul class="card-inter__body__ul">
                <li class="card-inter__body__ul__li" v-for="(interpretacion,index) in interpretaciones" :key="index">{{interpretacion}}.</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardInter",
    // props: {
    //     inter: { type: Object },
    //     escala: { type: Object}
    // },
    props: ['inter', 'escala'],
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
            if(this.inter.nivel.nivel == 'Muy alto'){
                return 'MuyAlto'
            }else{
                return this.inter.nivel.nivel
            }
        },
        checkIfInterIsObject(){
            let to = (typeof this.inter)
            
            return to == 'object'
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
.card-inter{
    box-shadow: $box-shadow;
    width: 100%;
    display: flex;
    // flex-wrap: wrap;
    &__title-container{
        // background: blue;
        flex: 0 0 auto;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        // box-shadow: $box-shadow;
        @media (min-width: $medium){
            width: 100px;
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
            // box-shadow: $box-shadow;
        }
    }

    &__body{
        // display: flex;
        // flex-wrap: wrap;
        flex: 1 1 auto;
        background: white;
        padding: 1.5em;
        // background: red;
        // width: 50%;

        &__title-container{
            margin-bottom: 9px;
            
            width: 100%;
            // background: red;
            font-size: 1.3em;
            color: rgba(0, 0, 0, 0.445);
            display: flex;
            align-items: center;
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
            }

            &__title{
                margin: 0;
                margin-left: 8px;
            }
        }

        &__ul{
            margin: 0;
            padding-left: 16px;
            &__li{

            }
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