<template>
    <div class="login">
        <div class="login__container">
            <div class="login__container__login-container">
                <div class="login__container__login-container__section">
                    <p>MMPI-2</p>
                </div>
                <div class="login__container__login-container__section">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group">
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
        this.$store.commit('setLoading', false)
        this.$Progress.finish()
    },
    data(){
        return {
            sidebarOpen: false,
            email: '',
            password: '',
            loading: false
        }
    },
    computed: {
        isDisabled(){
            // return this.$store.getters.getDisabled
        },
        
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

            let store = this.$store
            let data = { email: this.email, password: this.password }
            let este = this
            store.dispatch('login', data)
            .then( data => {
                let expDate = este.getExpDate(data)
                // document.cookie = `jwt=${data}; expires=${expDate}; path=/; samesite=None;Secure`;
                console.log(data)
                document.cookie = `jwt=${data}; expires=${expDate}; path=/; samesite=none`;
                store.commit('setToken', true)
                este.$router.push({ name: 'Patients', params: { page:1 } })
                // document.cookie = `jwt=${data}; path=/; samesite=none`;
                // console.log(document.cookie = `jwt=${data}; expires=${expDate}; path=/;`)
            })
            .catch( data => {
                console.log(data.response.data)
                let message = data.response.data
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

.login{
    // background: red;
    &__container{
        max-width: 1080px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        &__login-container{
            background: white;
            padding: 3em;
            justify-content: center;
        }
    }
}
</style>
