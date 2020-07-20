<template>
    <div class="card">
        <div class="card__section card__section--top">
            <div class="card__section--top__logo">{{escala.escala}}</div>
            <!-- {{escala.escala}} -->
        </div>
        <div class="card__section card__section--body">
            <div class="card__section--body__container">
                <p class="card__section--body__container__data">{{factorKAgregado}}</p>
                <p class="card__section--body__container__title">Factor K Agregado</p>
            </div>
            <div class="card__section--body__container">
                <p class="card__section--body__container__data">{{puntuacionCrudaConK}}</p>
                <p class="card__section--body__container__title">Puntuacion cruda con K</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: {
        factorKAgregado: {type: Number},
        puntuacionCrudaConK: {type: Number},
        escala: { type: Object }
    },
    data() {
        return {

        };
    },
    created() {
        
    },
    mounted: function () {
        console.log('Hola mundo')
    },
    methods: {
        
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../../assets/scss/variables';
$padding: 1em;
$gap: 0.5em;
$medium: 768px;
$large: 992px;
.card{
    box-shadow: $box-shadow;
    width: 100%;
    border: 0;
    // background: red;
    // border: 1px solid black;
    border-radius: 0;
    @media (min-width: $large){
        // padding: 1.5em;
        // font-size: 14px;
    }
    &:nth-child(1){
        // background: blue;
        grid-column: 1/3;
        @media (min-width: $medium){
            grid-column: 1/3;
        }
        @media (min-width: $large){
            grid-column: auto;
        }
    }
    p{
        margin: 0
    }
    &__section{
        padding: $padding;
        &--top{
            background: $primary-color;
            width: 100%;
            display: flex;
            justify-content: center;
            color: white;
            // padding: $gap;



            &__logo{
                $circle: 45px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: $circle;
                height: $circle;
                border-radius: 50%;
                background-color:white;
                color: $primary-color;
            }
        }

        &--body{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            &__container{
                width: 100%;
                // background: green;
                &:nth-child(odd){
                    margin-bottom: $gap;
                }
                &__data{
                    text-align: center;
                    color: black;
                    font-size: 1.2em;
                }
                &__title{
                    // background: purple;
                    width: 100%;
                    text-align: center;
                    color: rgba(82, 82, 82,0.8);
                    font-size: 0.85em;
                }

            }
        }

    }
    
}
</style>