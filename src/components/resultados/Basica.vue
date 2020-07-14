<template>
  <div class="basica">
      <p>{{patient}}</p>
  </div>
</template>

<script>
export default {
    name: 'Basica',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
        }
    },
    computed: {
        patient(){
            return this.$store.getters.getPatient
        },
        basica(){
            return this.$store.getters.getBasica
        }
    },
    beforeCreate(){
        this.$store.commit('setActualResults', { id: 1, name: "Basica"})
    },
    created(){
        // console.log()
        if(this.basica == null){
            this.$store.dispatch('getEscalaBasica',1)
            .then( data => {
                console.log(data)
                this.$store.commit('setBasica', data)
            })
            .catch( data => {
                // console.log('error funcionando correctamente')
            })
        }else{
            console.log('Info already in app')
        }
    },
    beforeRouteLeave (to, from , next) {
        this.$store.commit('setInResults',false)
        next()
        // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        // if (answer) {
        //     next()
        // } else {
        //     next(false)
        // }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.basica{
    background: red;
}
</style>
