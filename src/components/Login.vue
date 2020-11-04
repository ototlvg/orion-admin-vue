<template>
    <div class="login"> 
        <div class="login__container">
            <div class="login__container__wrapper">
                <div class="login__container__wrapper__section login__container__wrapper__section--title-section">
                    <!-- <p>MMPI-2</p> -->
                    <span class="material-icons login__container__wrapper__section--title-section__icon">hdr_weak</span>
                </div>

                <div class="login__container__wrapper__section login__container__wrapper__section--error-section" v-if="error!=null">
                    <p>{{error}}</p>
                </div>

                <div class="login__container__wrapper__section login__container__wrapper__section--data-section">
                    <div class="form-group login__container__wrapper__section--data-section__input-wrapper">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group login__container__wrapper__section--data-section__input-wrapper">
                        <label for="exampleInputPassword1">Contraseña</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
                    </div>
                    <button type="submit" class="btn btn-primary" @click="login">
                        <span v-if="!loading">Iniciar sesion</span>
                        <div v-else class="spinner-border text-light" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "Login",
    beforeCreate(){
        this.$store.commit('setActualView', 'Login')
        
    },
    created(){
        // console.log('VSCODE: ' +this.$store.getters.getToken)
        this.$store.commit('setLoading', false)
        if(!this.$store.getters.getToken){
            this.$store.commit('setToken', false)

        }


        this.$Progress.finish()
    },
    data(){
        return {
            sidebarOpen: false,
            email: '',
            password: '',
            loading: false,
            error: null,
        }
    },
    computed: {
        isDisabled(){
            // return this.$store.getters.getDisabled
        },
        getToken(){
            console.log('Estamos en Login: ' + this.$store.getters.getToken)
            // this.$router.push({ name: 'Patients' })
            return this.$store.getters.getToken
        }
        
    },
    methods: {
        login(){
            
            if(this.loading){
                return false
            }

            if( this.email.length == 0 || this.password.length == 0 ){
                return false
            }

            let validEmail = this.validateEmail(this.email)

            if(!validEmail){
                console.log('Correo invalido')
                return false
            }

            // this.loading = true
            // console.log('Valido')
            this.error = null
            let store = this.$store
            let data = { email: this.email, password: this.password }
            let este = this
            store.dispatch('login', data)
            .then( data => {
                console.log('Informacion retornada al presionar Login: ' + data)
                let expDate = este.getExpDate(data)
                document.cookie = `jwt=${data}; expires=${expDate}; path=/; samesite=Secure`;
                
                // document.cookie = `jwt=${data}; expires=${expDate}; path=/; samesite=none`;
                // document.cookie='jwt='+data
                
                
                // console.log('Imprimir cookie')
                // console.log(document.cookie)
                store.commit('setToken', true)
                este.$router.push({ name: 'Patients', params: { page:1 } })
                // document.cookie = `jwt=${data}; path=/; samesite=none`;
                // console.log(document.cookie = `jwt=${data}; expires=${expDate}; path=/;`)
            })
            .catch( data => {
                console.log(data.response.data)
                let message = data.response.data
                este.error = message
            })

            
        },
        validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        getExpDate(token){ // Expiration
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            let payloadBody =  JSON.parse(jsonPayload);

            let secToExpire = payloadBody.exp - payloadBody.iat
            let msToExpire = secToExpire*1000
            let actualDate = new Date
            let expDate = new Date(actualDate.getTime() + msToExpire)

            return expDate.toUTCString()
        },
    }
};
</script>

<style lang="scss" scoped>
// $medium: 768px;
// $large: 992px;
@import '../assets/scss/variables';
// login__container__section
.login{
    &__container{
    // background: red;
        max-width: 1080px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        &__wrapper{
            background: white;
            padding: 3em;
            justify-content: center;
            box-shadow: $box-shadow;
            max-width: 350px;
            &__section{
                &--error-section{
                    color: rgb(245, 2, 2);
                    text-align: center;
                    width: 100%;
                }
                &--title-section{
                    // background: red;
                    color: rgba(0, 0, 0, 0.445);
                    text-align: center;
                    // font-size: 5em;
                    &__icon{
                        // color: rgba(0, 0, 0, 0.445);
                        color: $primary-color;
                        font-size: 5em;
                    }
                }
                &--data-section{
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    &__input-wrapper{
                        // background: red;
                        width: 100%;
                    }
                }
                button{
                    // background-color: red !important;
                    margin-top: 1em;
                }
            }

        }
    }
}
</style>
