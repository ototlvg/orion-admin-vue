<template>
    <div class="basica">
        <select class="custom-select main__select main__header__select">
            <!-- <option :selected="true" disabled hidden>{{actualResults.name}}</option> -->
            <!-- <option value="1">Basica</option>
            <option value="2">Suplementaria</option>
            <option value="3">Contenido</option> -->
            <option :value="index" v-for="index in patient.completed_surveys" :key="index">{{index}}</option>
        </select>
        <p>{{patient}}</p>
        <p>{{basica}}</p>
      <!-- <p>{{basica}}</p>
      <p>{{basica}}</p>
      <p>{{basica}}</p> -->
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
        console.log(this.basica)
        // if(this.basica == null){
        //     this.$store.dispatch('getEscalaBasica',1)
        //     .then( data => {
        //         console.log(data)
        //         this.$store.commit('setBasica', data)
        //     })
        //     .catch( data => {
        //         // console.log('error funcionando correctamente')
        //     })
        // }else{
        //     console.log('Info already in app')
        // }
    },
    // beforeRouteLeave (to, from , next) {
    //     this.$store.commit('setInResults',false)
    //     next()
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.basica{
    display: flex;
    flex-wrap: wrap;
    // background: red;
    overflow: hidden;
}
</style>
