<template>
    <div id="app" class="app">
        <!-- <router-view /> -->
        <aside class="app__aside" :class="{ open: sidebarOpen }">
            <div class="app__aside__brand-container">
                <span class="material-icons app__aside__brand-container__icon">hdr_weak</span>
            </div>
            <nav class="app__aside__nav">
                <ul class="app__aside__nav__ul" @click="openSidebar">
                    <li class="app__aside__nav__ul__li">
                        <router-link class="app__aside__nav__ul__li__router-link" :class="{ active: actualView == 'Pacientes' }" :to="{ name: 'Patients', params: { page:1 } }">
                            <span class="material-icons app__aside__nav__ul__li__router-link__icon">supervisor_account</span>
                            <p class="app__aside__nav__ul__li__router-link__p">Orion</p>
                        </router-link>
                    </li>
                    <li class="app__aside__nav__ul__li">
                        <router-link class="app__aside__nav__ul__li__router-link" :class="{ active: actualView == 'Autobus' }" :to="{ name: 'HelloWorld' }">
                            <span class="material-icons app__aside__nav__ul__li__router-link__icon">directions_bus</span>
                            <p class="app__aside__nav__ul__li__router-link__p">Patients</p>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </aside>
        <div class="app__overlay" :class="{ open: sidebarOpen }" @click="openSidebar">
            
        </div>
        <div class="app__header">
            <span class="material-icons app__header__icon app__header__icon__hamburguer" @click="openSidebar">menu</span>
            <h2 class="app__header__title">{{actualView}}</h2>
            <span v-if="inResults" class="material-icons app__header__icon app__header__icon__user" @click="toggleUserInfo">dashboard</span>
            <span v-else class="material-icons app__header__icon app__header__icon__user--oculto">dashboard</span>
        </div>
        <main class="app__main">
            <router-view class="app__main__router-view"/>
            <!-- <div class="app__main__loading-container">

            </div> -->
        </main>
    </div>
</template>


<script>
export default {
    name: "App",
    created(){
        
    },
    data(){
        return {
            sidebarOpen: false,
        }
    },
    computed: {
        isDisabled(){
            // return this.$store.getters.getDisabled
        },
        inResults(){
            return this.$store.getters.getInResults
        },
        actualView(){
            return this.$store.getters.getActualView
        }
        
    },
    methods: {
        openSidebar(){
            let s= matchMedia('(min-width: 992px)').matches
            // console.log(!s)
            if(!s){
                this.sidebarOpen=!this.sidebarOpen
                // console.log(this.sidebarOpen)
            }
        },
        toggleUserInfo(){
            this.$store.commit('setOpenUserInfo')
        }
    }
};
</script>

<style lang="scss">
// $medium: 768px;
// $large: 992px;
@import 'assets/scss/variables';
$padding-headers: 1em;
// $header-main-padding: 2em;
$header-main-padding: 0;
// $headerBranHeight: 60px;
$headerBrandHeight: 75px;
.app {
    
    width: 100vw;
    height: 100vh;
    background: tomato;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: $headerBrandHeight 12fr;
    grid-template-areas:
        "header"
        "main"
    ;
    position: relative;
    @media (min-width: $large){
        // grid-template-columns: 75px 1fr;
        grid-template-columns: 67px 1fr;
        grid-template-rows: auto auto;
        grid-template-areas:
            "aside main"
            "aside main"
        ;
    }
    &__overlay{
        position: fixed;
        z-index: 50;
        width: 100vw;
        height: 100vh;
        background: black;
        opacity: 0.1;
        display: none;
        &.open{
            display: block;
        }
    }
    &__aside{
        // width: 75px;
        overflow: hidden;
        // width: 250px;
        width: 190px;
        height: 100vh;
        // padding: 0 2em;
        position: fixed;
        left: -100%;
        top: 0;
        z-index: 100;
        // background: #5864ff;
        background: white;
        transition: left 0.3s;
        @media (min-width: $large){
            position: static;
            grid-area: aside;
            width: 100%;
            padding: 0;
            // box-shadow: 1px 5px 2px 0px rgba(0,0,0,0.75);
            border-right: solid 1px rgba(0,0,0,0.1);
        }

        &.open{
            left: 0;
        }

        &__brand-container{
            width: 100%;
            height: $headerBrandHeight;
            // background: red;
            display: flex;
            justify-content: center;
            align-items: center;
            // margin-bottom: 3em;
            // padding: 2em;
            &__icon{
                color: white;
                font-size: 2em;
                @media (min-width: $large){

                }
            }
            // background: rgb(51, 51, 51);
            background: $primary-color;
        }
        &__nav{
            width: 100%;
            &__ul{
                width: 100%;
                margin: 0;
                padding: 0;
                &__li{
                    width: 100%;
                    // background: pink;
                    &__router-link{
                        width: 100%;
                        display: flex;
                        &:hover{
                            text-decoration: none;
                        }
                        // justify-content: space-around;
                        align-items: center;
                        height: 3em;
                        color: rgb(180, 180, 180);                        
                        padding: 2.2em 2em;
                        @media (min-width: $large){
                            padding: 0;
                            justify-content: center;
                            transition: color 0.4s;
                            height: 5em;
                            // margin-top: 3em;
                        }
                        &:hover{
                            color: rgba(59, 59, 59,0.5);
                        }
                        // &.router-link-exact-active.router-link-active{
                        &.active{
                            // background: #f6f8fb;
                            color: $primary-color;
                            // background: #3a42ac;
                            // color: white;
                            @media (min-width: $large){
                                // border-left: solid #5864ff;

                            }
                        }
                        &__icon{
                            margin-right: 0.5em;
                            @media (min-width: $large){
                                margin: 0;
                            }
                        }
                        &__p{
                            // visibility: hidden;
                            // opacity: 0;
                            // width: 0;
                            // margin: -50px;
                            margin: 0;
                            padding: 0;
                            @media (min-width: $large){
                                width: 0;
                                // margin-left: -10px;
                                // display: none;
                                opacity: 0;
                                visibility: hidden;
                            }
                        }
                    }

                }
            }
        }
    }
    &__header{
        // height: 60px;
        grid-area: header;
        // background: white;
        background: $primary-color;
        display: flex;
        align-items: center;
        // border: solid 10px black;
        // background: red;
        justify-content: space-around;
        color: black;
        padding: $header-main-padding;
        &__icon{
            color: white;

            &__hamburguer{
                cursor: pointer;
                // padding: 1em;
                // @media (min-width: $large){
                //     display: none;
                // }
            }
            &__user{
                cursor: pointer;
                &--oculto{
                    visibility: hidden;
                }
            }

        }
        &__title{
            color: white;
        }

        @media (min-width: $large){
            justify-content: flex-start;
            display: none;
        }
    }

    &__main{
        position: relative;
        overflow: auto;
        grid-area: main;
        background: $background-color;
        // border-top: solid 1px rgba(0,0,0,0.1);
        display: flex; // <-------ESTO CONTROLA QUE EL router-view YA ESTA EN 100% POR DEFAULT
        flex-direction: column;
        padding: $header-main-padding;
        // overflow: hidden;
        &__router-view{
            width: 100%;
            background: $background-color;
            flex: 1 1 auto;
            // overflow: auto;
        }
        @media (min-width: $large){
            background: red !important;
            // width: auto;
        }
        // &__loading-container{
        //     width: 100%;
        //     height: 100vh;
        //     // grid-area: main;
        //     background: red;
        //     position: absolute;
        // }
    }
    
}

.face{
    color: red;
    font-size: 30em;
}
</style>
