<template>
    <div class="basica">
        <select class="custom-select main__select main__header__select" @change="getNewEscala($event)">
            <!-- <option :selected="true" disabled hidden>{{actualResults.name}}</option> -->
            <!-- <option value="1">Basica</option>
            <option value="2">Suplementaria</option>
            <option value="3">Contenido</option> -->
            <option :value="index" v-for="index in patient.completed_surveys" :key="index">{{index}}</option>
        </select>
        <!-- <p>{{patient}}</p> -->
        <p v-if=" escala!=null ">{{escala.survey}}</p>
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
            escala: null,
            flag: false
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
        // console.log(this.basica.length)
        let survey= 1;
        if(this.basica.length==0){
            this.flag=1
            this.getEscala(survey)
        }else{
            let este= this
            // this.basica.forEach(element => {
            //     console.log()
            //     if(element.survey==survey){
            //         este.escala=element
            //     }
            // });
            const found = this.basica.find(element => element.survey == survey);
            console.log("Encontrado: " + found)
        }



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
    methods: {
        getEscala(survey){
            let este= this
            this.$store.dispatch('getEscalaBasica',survey)
            .then( data => {
                if(este.flag){
                    este.escala=data
                    este.flag=false
                }
                console.log(data)
                this.$store.commit('setBasica', data)
            })
            .catch( data => {
                // console.log('error funcionando correctamente')
            })
        },
        cheackIfExists(){

        }
        ,
        getNewEscala(event){
            let survey= event.target.value
            // let survey= 2
            const found = this.basica.find(element => element.survey == survey);
            if(found == undefined){
                console.log('Se necesita mandar a buscar')
                this.flag=true
                this.getEscala(survey)
            }else{
                console.log(`Escala ${survey} already in app`)
                this.escala= found
            }
        }
    }
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
