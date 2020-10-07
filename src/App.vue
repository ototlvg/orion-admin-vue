<template>
    <div id="app" class="app">
        <!-- <router-view /> -->
        <aside class="app__aside" :class="{ open: sidebarOpen }">
            <div class="app__aside__brand-container">
                <span class="material-icons app__aside__brand-container__icon">hdr_weak</span>
                
            </div>
            <nav class="app__aside__nav">
                <ul class="app__aside__nav__ul" @click="openSidebar">
                    <span class="app__aside__nav__ul__span">
                        <li class="app__aside__nav__ul__span__li" v-if="token">
                            <router-link class="app__aside__nav__ul__span__li__router-link" :class="{ active: actualView == 'Pacientes' }" :to="{ name: 'Patients', params: { page:1 } }">
                                <span class="material-icons app__aside__nav__ul__span__li__router-link__icon">supervisor_account</span>
                                <p class="app__aside__nav__ul__span__li__router-link__p">Pacientes</p>
                            </router-link>
                        </li>
                        <li class="app__aside__nav__ul__span__li" v-if="!token">
                            <router-link class="app__aside__nav__ul__span__li__router-link" :class="{ active: actualView == 'Login' }" :to="{ name: 'Login' }">
                                <span class="material-icons app__aside__nav__ul__span__li__router-link__icon">face</span>
                                <p class="app__aside__nav__ul__span__li__router-link__p">Login</p>
                            </router-link>
                        </li>

                    </span>

                    <span class="app__aside__nav__ul__span" v-if="token">
                        <li class="app__aside__nav__ul__span__li app__aside__nav__ul__span__li--logout">
                            <router-link class="app__aside__nav__ul__span__li__router-link app__aside__nav__ul__span__li app__aside__nav__ul__span__li--logout__router-link" :class="{ active: actualView == 'Logout' }" :to="{ name: 'Logout' }">
                                <span class="material-icons app__aside__nav__ul__span__li__router-link__icon">highlight_off</span>
                                <p class="app__aside__nav__ul__span__li__router-link__p">Salir</p>
                            </router-link>
                        </li>
                    </span>
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
        <main class="app__main" style="position:relative">
            <router-view class="app__main__router-view"/>

            <div v-if="loading" class="app__main__loading-container">
                <div class="lds-ring big"><div></div><div></div><div></div><div></div></div>
            </div>
        </main>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>


<script>
export default {
    name: "App",
    created(){
        this.checkAuth()
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
        },
        loading(){
            return this.$store.getters.getLoading
        },
        token(){
            return this.$store.getters.getToken
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
        },
        checkAuth(){
            let store = this.$store
            let router = this.$router
            this.$store.dispatch('checkAuth')
            .then( data => {
                // Manda una peticion al servidor, si retorna error significa que no existe el cookie en el front
                store.commit('setToken', true)
                console.log('El servidor dice que el navegador envio el cookie jwt: ' + data)
                if(data){
                    console.log('Estar intentando entrar a login, pero como el servidor dice que tienes una cookie jwt valida, se reedireccionara a Patients')
                    router.push( { name: 'Patients', params: { page:1 }} )
                }
            })
            .catch( data => {
                console.log(data)
            })
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
        
        // Nuevo XL3
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        flex-direction: column;
        // background: red;
        //

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
            display: flex;
            justify-content: center;
            align-items: center;
            &__icon{
                color: white;
                font-size: 2em;
                @media (min-width: $large){

                }
            }
            background: $primary-color;
            // Nuevo XL3
            flex: 0 0 static;
        }
        &__nav{
            width: 100%;
            // Nuevo XL3
            flex: 1 1 auto;
            // background: skyblue;
            display: flex;
            //
            &__ul{
                // Nuevo XL3
                // background: pink;
                display: flex;
                // align-items: space-between;
                flex-wrap: wrap;
                // flex-direction: column;
                align-content: space-between;
                //
                width: 100%;
                margin: 0;
                padding: 0;
                &__span{
                    width: 100%;
                    &__li{
                        width: 100%;
                        &--logout{
                            // Nuevo XL3
                            align-self: flex-end;
                            //
                            // background: purple;
                            &__router-link{
                                &:hover{
                                    color: red !important;
                                }
                            }
    
                        }
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
        position: relative !important;
        overflow: auto;
        grid-area: main;
        background: $background-color;
        // border-top: solid 1px rgba(0,0,0,0.1);
        display: flex; // <-------ESTO CONTROLA QUE EL router-view YA ESTA EN 100% POR DEFAULT
        flex-direction: column;
        padding: $header-main-padding;
        // background: blue;
        // overflow: hidden;
        &__router-view{
            width: 100%;
            background: $background-color;
            flex: 1 1 auto;
            // overflow: auto;
        }
        @media (min-width: $large){
            // background: red !important;
            // width: auto;
        }
        position: relative;
        &__loading-container{
            position: absolute;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            // background: rgba(0, 0, 0, 0.205);
            z-index: 5000;
            // position: absolute !important;
            // z-index: 10000000000000000000000;
            // top:0;
            // right: 0;
            // left: 0;
            // bottom: 0;
            // background: red;

        }
    }
    
}

.face{
    color: red;
    font-size: 30em;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: scale(0.25);
  &.big{
      transform: scale(0.9);
      
  }
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
