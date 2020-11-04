<template>
    <div class="resultados">
        <!-- <div v-if="loading" class="resultados__loading-container"> -->
        <div v-if="loading" class="resultados__loading-container">
        </div>

        <div class="resultados__fixed" :class="{ show: open }">
            <span class="material-icons resultados__fixed__arrow" @click="closeUserInfo">keyboard_tab</span>
            <div class="resultados__fixed__container">

                <div class="resultados__fixed__container__card">

                    <div class="resultados__fixed__container__card__section resultados__fixed__container__card__section--top">
                        <span class="material-icons resultados__fixed__container__card__section--top__icon resultados__fixed__container__card__section--top__icon--name">info</span>
                        <p>Info Paciente</p>
                    </div>
                    <div class="resultados__fixed__container__card__section resultados__fixed__container__card__section--center resultados__fixed__container__card__section--center__name">
                        <!-- <p>Alfonso&nbsp;</p>
                        <p class="resultados__fixed__container__card__section--center__name__second-name">Othoniel&nbsp;</p>
                        <p>Obregon Martinez</p> -->
                        <p>{{patient.name}} {{patient.apaterno}} {{patient.amaterno}}</p>
                    </div>
                    <div class="resultados__fixed__container__card__section resultados__fixed__container__card__section--bottom resultados__fixed__container__card__section--bottom--user-info">
                        <p class="resultados__fixed__container__card__section--bottom--p-marital">{{birthdayYear}}, {{genderName}}</p>
                    </div>

                </div>

                <div class="resultados__fixed__container__card">

                    <div class="resultados__fixed__container__card__section resultados__fixed__container__card__section--top">
                        <span class="material-icons resultados__fixed__container__card__section--top__icon resultados__fixed__container__card__section--top__icon--marital">account_circle</span>
                        <p>Estado Civil</p>
                    </div>
                    <div class="resultados__fixed__container__card__section resultados__fixed__container__card__section--center">
                        <p>{{maritalName}}</p>
                    </div>
                    <!-- <div class="resultados__fixed__container__card__section resultados__fixed__container__card__section--bottom">
                        <p>32, Masculino</p>
                    </div> -->

                </div>

                <div class="resultados__fixed__container__card">

                    <div class="resultados__fixed__container__card__section resultados__fixed__container__card__section--top">
                        <span class="material-icons resultados__fixed__container__card__section--top__icon resultados__fixed__container__card__section--top__icon--job">public</span>
                        <p>Ocupacion</p>
                    </div>
                    <div class="resultados__fixed__container__card__section resultados__fixed__container__card__section--center">
                        <p>{{jobName}}</p>
                    </div>
                    <!-- <div class="resultados__fixed__container__card__section resultados__fixed__container__card__section--bottom">
                        <p>32, Masculino</p>
                    </div> -->

                </div>

                <div class="resultados__fixed__container__card">

                    <div class="resultados__fixed__container__card__section resultados__fixed__container__card__section--top resultados__fixed__container__card__section--top--escala">
                        <span class="material-icons resultados__fixed__container__card__section--top__icon resultados__fixed__container__card__section--top__icon--escala">explicit</span>
                        <p>Escala</p>
                    </div>
                    <div class="resultados__fixed__container__card__section resultados__fixed__container__card__section--center">
                        <select class="custom-select main__select main__header__select" @change="goToResult($event)">
                            <option :selected="true" disabled hidden>{{actualResults.name}}</option>
                            <option value="1">Basica</option>
                            <option value="2">Suplementaria</option>
                            <option value="3">Contenido</option>
                        </select>
                    </div>

                </div>

            </div>
        </div>

        <div class="resultados__view">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Resultados',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            goTo: null
        }
    },
    created(){
        this.$store.commit('setInResults',true)
        // this.$store.commit('setLoading',true)
    },
    computed: {
        patient(){
            return this.$store.getters.getPatient
        },
        formData(){
            return this.$store.getters.getFormData
        },
        genderName(){
            let id= this.patient.gender
            let genders= this.formData.genders
            return genders.find( (obj) => obj.id == id).gender
        },
        maritalName(){
            let id= this.patient.marital_status
            let maritals= this.formData.marital
            return maritals.find( (obj) => obj.id == id).status
        },
        jobName(){
            let id= this.patient.job
            let jobs= this.formData.jobs
            return jobs.find( (obj) => obj.id == id).name
        },
        actualResults(){
            return this.$store.getters.getActualResults
        },
        birthdayYear(){
            let dString= this.$store.getters.getPatient.birthday
            let d= new Date(dString)
            let actualYear= new Date().getFullYear()
            let complete= (actualYear)-(d.getFullYear())
            return complete
            // return 1
        },
        open(){
            return this.$store.getters.getOpenUserInfo
        },
        loading(){
            return this.$store.getters.getLoading
        }
    },
    methods: {
        goToResult(event){
            let escala= event.target.value
            let completedSurveys= this.patient.completed_surveys
            // this.$router.push({ path: `/resultados/${escalas[escala]}` })
            // console.log(event.target.value)
            console.log('Pegaso')
            if(escala==1){
                // this.$store.commit('setActualResults', { id: 1, name: "Basica"})
                this.$router.push({ path: `/resultados/basica/${completedSurveys}` })
            }else if(escala==2){
                // this.$store.commit('setActualResults', { id: 2, name: "Suplementaria"})
                this.$router.push({ path: `/resultados/suplementaria/${completedSurveys}` })
            }else if(escala==3){
                this.$router.push({ path: `/resultados/contenido/${completedSurveys}` })
            }
        },
        closeUserInfo(){
            this.$store.commit('setOpenUserInfo')
        }
    },
    watch: {
        $route(to, from) {
            // this.$store.commit('unsetEscalas')
        }
    },
    beforeRouteLeave (to, from , next) {
        this.$store.commit('setInResults',false)
        next()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/scss/variables';
// $medium: 768px;
// $large: 992px;
.resultados{
    position: relative;
    &__loading-container{
        position: absolute;
        top:0px;
        bottom: 0px;
        right: 0px;
        left:0px;
        background: rgba(0, 0, 0, 0.205);
        z-index: 4000;
    }
    // background: blue;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: flex-start;
    width: 100%;
    // position: relative;
    // overflow: auto; --ESTE DESACTIVADO
    // overflow: auto; // -- ACTIVADO
    &__fixed{
        &__arrow{
            position: absolute;
            bottom: 0;
            right: 0;
            background: rgb(255, 160, 71);
            color: white;
            border-left: solid 1px rgba(0,0,0,0.1);
            border-top: solid 1px rgba(0,0,0,0.1);
            padding: 0.5em;
            cursor: pointer;
            @media (min-width: $large){
                display: none;
            }
        }
        
        position: fixed;
        background: white;
        top: 0;
        right: -100%;
        height: 100vh;
        border-left: solid 1px rgba(0,0,0,0.1);
        max-width: 250px;
        transition: right 0.5s;
        z-index: 100000000;
        @media (min-width: $large){
            max-width: 100%;
            // background: red;
            position: relative;
            height: auto;
            border-left: none;
            right: 0;
            // transition: all 0;
        }
        &.show{
            right: 0;
        }
        
        &__container{
            display: flex;
            flex-direction: column;
            &__card{
                padding: 1.8em;
                // background: blue;
                @for $i from 1 through 3{
                    &:nth-child(#{$i}){
                        // background: red;
                        border-right: 1px solid rgba(0,0,0,0.1);
                        // border-right: 1px solid rgba(34,36,38,0.15);
                        border-bottom: 1px solid rgba(0,0,0,0.1);
                        
                    }
                }
                @media (min-width: $large){
                    display: flex;
                    justify-content: flex-start;
                    align-content: center;
                    flex-wrap: wrap;
                    padding: 1.5em 3em;
                    flex: 1 1 auto;
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                }
                
                &__section{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    p{
                        margin: 0;
                    }
                    &--top{
                        // text-align: left;
                        &--escala{
                            margin-bottom: 10px;
                        }

                        @media (min-width: $large){
                            // display: block;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            &--escala{
                                margin-bottom: 5px;
                            }
                        }
                        p{
                            margin-left: 5px;
                            // background: red;
                            display: flex;
                            @media (min-width: $large){
                                font-size: 14px;
                            }
                        }

                        &__icon{
                            @media (min-width: $large){
                                font-size: 14px;
                            }
                            &--name{
                                color: rgb(0, 132, 255);
                            }
                            &--marital{
                                color: rgb(255, 157, 0);
                            }
                            &--job{
                                color: rgb(11, 195, 57);
                            }
                            &--escala{
                                color: rgb(155, 19, 1);
                            }
                        }
                    }
                    &--center{
                        font-size: 1.6em;
                        // background: red;
                        @media (min-width: $large){
                            display: flex;
                            justify-content: flex-start;
                        }
                        &__name{
                            // display: flex;
                            // flex-wrap: wrap;
                            // justify-content: center;
                            text-align: center;
                            &__second-name{
                                display: none;
                                @media (min-width: $large){
                                    display: block;
                                }
                            }
                        }
                        
                    }
                    &--bottom{
                        &--user-info{
                            @media (min-width: $large){
                                display: flex;
                                justify-content: flex-start;
                                // background: tomato;
                                text-align: left;
                                font-size: 14px;
                            }
                        }
                    }
                }
            }

            @media (min-width: $large){
                flex-direction: row;
                width: 100%;
            }
        }
        

    }

    &__view{
        width: 100%;
        flex: 1 1 auto;
        background: $background-color;
        // background: skyblue;
        background: #f2f3f7;
        // display: flex;

        // overflow: auto; // ESTE
        // padding: 5em;

    }
}



</style>
