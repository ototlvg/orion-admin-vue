<template>
    <div class="logout">
        <p>Logout</p>
    </div>
</template>


<script>
export default {
    name: "Logout",
    beforeCreate(){
        this.$store.commit('setActualView', 'Logout')
        
    },
    created(){
        this.logout()
    },
    data(){
        return {
            data: true
        }
    },
    computed: {
        isDisabled(){
            // return this.$store.getters.getDisabled
        },
        
    },
    methods: {
        login(){

        },
        logout(){
            console.log('eliminando')
            this.$store.commit('setToken', false)
            let date = new Date()
            document.cookie = `jwt= ; expires=${date.toUTCString()}; path=/; samesite=Secure`
            // document.cookie = `jwt= `
            this.$router.push({name:'Login'})
        }
    }
};
</script>

<style lang="scss" scoped>
// $medium: 768px;
// $large: 992px;
@import '../assets/scss/variables';
.logout{

}
</style>
