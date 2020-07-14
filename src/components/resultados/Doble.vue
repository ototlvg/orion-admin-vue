<template>
    <div class="doble">
        <p>Escala</p>
        <p>{{actual}}</p>
        <!-- <p>{{ $route.path }}</p> -->
        <!-- <p>{{ $route.fullPath }}</p> -->
        
    </div>
</template>

<script>
export default {
    name: 'Doble',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            actual: null,
        }
    },
    beforeCreate(){
    },
    created(){
        this.setActualView()
    },
    methods: {
        getEscalaSuplementaria(survey){
            this.$store.dispatch('getEscalaSuplementaria',survey)
            .then( data => {
                console.log(data)
                this.$store.commit('setSuplementaria', data)
            })
            .catch( data => {
                // console.log('error funcionando correctamente')
            })
        },
        getEscalaContenido(survey){
            this.$store.dispatch('getEscalaContenido',survey)
            .then( data => {
                console.log(data)
                this.$store.commit('setContenido', data)
            })
            .catch( data => {
                // console.log('error funcionando correctamente')
            })
        },
        setActualView(){
            let escala= this.$route.path.split('/')[2]
            this.actual= escala
            if(escala == 'suplementaria'){
                this.$store.commit('setActualResults', { id: 2, name: "Suplementaria"})
                // console.log(this.suplementaria)
                if(this.suplementaria==null){
                    console.log('go suplementaria')
                    this.getEscalaSuplementaria(1)
                }else{
                    console.log('Suplementaria already in app')
                }
            }else{
                this.$store.commit('setActualResults', { id: 3, name: "Contenido"})
                // console.log(this.contenido)
                if(this.contenido == null){
                    console.log('go contenido')
                    this.getEscalaContenido(1)
                }else{
                    console.log('Contenido already in app')
                }
            }
        }
    },
    computed: {
        suplementaria(){
            return this.$store.getters.getSuplementaria
        },
        contenido(){
            return this.$store.getters.getContenido
        },
    },
    watch: {
        $route(to, from) {
            // console.log(this.$route.path)
            this.setActualView()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
