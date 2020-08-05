<template>
    <div class="patients">
        <div v-if="loading" class="patients__loading-container">
            <!-- <div class="patients__loading-container__container">
                <div class="lds-ring big"><div></div><div></div><div></div><div></div></div>
            </div> -->
        </div>
        
        <!-- <div class="container">
            <button @click="start">Buton 1</button>
            <button @click="set">Buton 2</button>
            <button @click="increase">Buton 3</button>
            <button @click="decrease">Buton 4</button>
            <button @click="finish">Buton 5</button>
        </div> -->

        <!-- Patient Header -->
        <div class="patients__header">
            <div class="patients__header__title-container">
                <h2>Pacientes</h2>
            </div>

            <div class="patients__header__searchbox-container">
                <input @keyup="getDataFromSearch" type="text" class="form-control" id="" v-model="searchBox" placeholder="Buscar">
                <!-- <input type="text" class="form-control" id="" v-model="searchBox" placeholder="Buscar"> -->
            </div>

        </div>

        <!-- Searchbox -->
        <!-- <div class="patients__searchbox">
            <input @keyup="getDataFromSearch" type="text" class="form-control" id="" v-model="searchBox">
        </div> -->

        <!-- Table Container -->
        <div class="patients__table-container">
            <!-- <table class="table table-borderless"> -->
            <table class="patients__table-container__table table">
                <thead class="patients__table-container__table__thead">
                    <tr class="patients__table-container__table__thead__tr">
                        <th class="patients__table-container__table__thead__tr__th" scope="col">ID</th>
                        <th class="patients__table-container__table__thead__tr__th d-none d-lg-table-cell" scope="col">Codigo</th>
                        <th class="patients__table-container__table__thead__tr__th d-none d-lg-table-cell" scope="col">Nombre</th>
                        <th class="patients__table-container__table__thead__tr__th" scope="col">Apellidos</th>
                        <th class="patients__table-container__table__thead__tr__th d-none d-md-table-cell" scope="col">Estado</th>
                        <th class="patients__table-container__table__thead__tr__th" scope="col">Acciones</th>
                        <th class="patients__table-container__table__thead__tr__th" scope="col">Resultados</th>
                    </tr>
                </thead>
                <tbody class="tbody">
                    <tr class="tbody__tr" v-for="(patient,index) in patients" :key="index">
                        <td class="tbody__tr__td" scope="row">{{patient.id}}</td>
                        <td class="tbody__tr__td d-none d-lg-table-cell">{{patient.code}}</td>
                        <td class="tbody__tr__td d-none d-lg-table-cell">{{patient.name}}</td>
                        <td class="tbody__tr__td">{{patient.apaterno}} {{patient.amaterno}}</td>
                        <td class="tbody__tr__td tbody__tr__td--status status d-none d-md-table-cell">
                            <div class="tbody__tr__td--status__cell tbody__tr__td--status__cell--active" v-if="patient.survey_available==1">
                                <p class="m-0 ml-1" v-if="!patient.loading.activate">ACTIVO</p>
                                <div v-else class="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </div>

                            <div class="tbody__tr__td--status__cell tbody__tr__td--status__cell--inactive" v-else @click="reactivateSurvey('activate',patient.id)">
                                <p class="m-0 ml-1" v-if="!patient.loading.activate">INACTIVO</p>
                                <div v-else class="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </div>
                        </td>

                        <td class="tbody__tr__td tbody__tr__td--detalles">
                            <div class="tbody__tr__td--detalles__container d-flex flex-column flex-lg-row">
                                <div class="tbody__tr__td--detalles__container__icon-container" :class="{ loading: patient.loading.delete }" @click="deleteUser(patient.id)">
                                    <span v-if="!patient.loading.delete" class="material-icons">delete</span>
                                    <span v-else class="material-icons">hourglass_full</span>

                                    <!-- <div class="tbody__tr__td--detalles__container__icon-container__loading-container">
                                        <div class="lds-ring tbody__tr__td--detalles__container__icon-container__loading-container__icon-container icon-in">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div> -->

                                </div>
                                <div class="tbody__tr__td--detalles__container__icon-container" @click="openDetailsModal(index)">
                                    <span class="material-icons">info</span>

                                </div>

                                <div v-if="patient.survey_available==0" class="tbody__tr__td--detalles__container__icon-container d-md-none" @click="reactivateSurvey('activate',patient.id)">
                                    <span class="material-icons" >cached</span>
                                </div>
                                <div v-else class="tbody__tr__td--detalles__container__icon-container disabled d-md-none">
                                    <span class="material-icons">cached</span>
                                </div>

                            </div>
                        </td>
                        <td v-if="patient.completed_surveys!=0" class="tbody__tr__td tbody__tr__td--results">
                            <p @click="goToResultados(0,index,patient.completed_surveys)">B</p>
                            <p @click="goToResultados(1,index,patient.completed_surveys)">S</p>
                            <p @click="goToResultados(2,index,patient.completed_surveys)">C</p>
                        </td>
                        <td v-else class="tbody__tr__td tbody__tr__td--results disabled">
                            <p>B</p>
                            <p>S</p>
                            <p>C</p>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <!-- Pagination Container -->
        <div class="patients__pagination-container">
            <ul class="pagination">
                <li v-if="!(current_page==1)" class="page-item preNext-link preNext-link--active" @click="getPage('previous')" >
                    <span class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</span>
                </li>
                <li v-else class="page-item disabled preNext-link preNext-link--disabled">
                    <span class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</span>
                </li>


                <li v-for="index in last_page" :key="index" class="page-item specific-link" :class="{ active: current_page==index }" @click="getPage('specific',index)">
                    <span class="page-link" href="#">{{index}}</span>
                </li>

                <li v-if="!(current_page==last_page)" class="page-item preNext-link preNext-link--active" @click="getPage('next')" ref="next">
                    <span class="page-link" href="#">Siguiente</span>
                </li>
                <li v-else class="page-item disabled preNext-link preNext-link--disabled" ref="next">
                    <span class="page-link" href="#">Siguiente</span>
                </li>
            </ul> 
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Detalles</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body modalp">
                    <div class="modalp__container">

                        
                        <!-- <span class="material-icons">account_circle</span> -->
                        <form v-if="patient !=null">
                            <div class="form-group">
                                <div class="form-group-container-nombre">
                                    <label for="name">Nombre</label>
                                    <div class="custom-control custom-switch">
                                        <input type="checkbox" class="custom-control-input" id="customSwitch1">
                                        <label class="custom-control-label" for="customSwitch1" @click="editarButton">Editar</label>
                                    </div>
                                </div>
                                <!-- <input type="text" class="form-control" id="name" :value="patient.name" disabled> -->
                                <input type="text" class="form-control" id="name"  v-model="patient.name" disabled>
                            </div>
                            <div class="form-group">
                                <label for="apaterno">Apellido Paterno</label>
                                <input type="text" class="form-control" id="apaterno" v-model="patient.apaterno" disabled>
                            </div>
                            <div class="form-group">
                                <label for="amaterno">Apellido Materno</label>
                                <input type="text" class="form-control" id="amaterno" v-model="patient.amaterno" disabled>
                            </div>
                            <div class="form-group">
                                <label for="genero">Genero</label>
                                <!-- <select class="custom-select" v-if="formData != null" id="genero" disabled>
                                    <option selected disabled hidden>{{genderName}}</option>
                                    <option v-for="(obj,index) in formData.genders" :key="index">{{obj.gender}}</option>
                                </select> -->
                                
                                <select class="custom-select" v-if="formData != null" id="genero" disabled v-model="patient.gender">
                                    <option selected disabled hidden>{{genderName}}</option>
                                    <option v-for="(obj,index) in formData.genders" :key="index" :value="obj.id">{{obj.gender}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="marital">Estado Civil</label>
                                <select class="custom-select" v-if="formData != null" id="marital" disabled v-model="patient.marital_status">
                                    <option selected disabled hidden>{{maritalName}}</option>
                                    <option v-for="(obj,index) in formData.marital" :key="index" :value="obj.id">{{obj.status}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="birthdayInput">Fecha de nacimiento</label>
                                <input type="date" id="birthdayInput" name="trip-start" v-model="patient.birthday" disabled>
                            </div>
                            <div class="form-group">
                                <label for="job">Ocupacion</label>
                                <select class="custom-select" id="job" disabled v-model="patient.job">
                                    <option selected disabled hidden>{{jobName}}</option>
                                    <option v-for="(obj,index) in formData.jobs" :key="index" :value="obj.id">{{obj.name}}</option>
                                </select>
                            </div>
                            <!-- <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div> -->
                            <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" v-show="showSaveButton" @click="saveForm">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">Cerrar</button>
                    <!-- <button type="button" class="btn btn-primary">Entendido</button> -->
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import _ from 'lodash'
export default {
    name: 'Patients',
    data () {
        return {
            welcome: 'Bienvenido',
            searchBox: '',
            patients: '',
            last_page: 1,
            totalPatientsInScreen: 1,
            patient: null,
            // formData: {"prueba": null,"genders": [{"id": 1,"gender": "Masculino"},{"id": 2,"gender": "Femenino"}],"marital": [{"id": 1,"status": "Soltero"},{"id": 2,"status": "Casado"},{"id": 3,"status": "Union libre"},{"id": 4,"status": "Divorciado"},{"id": 5,"status": "Separado"},{"id": 6,"status": "Viudo"}],"jobs": [{"id": 1,"name": "Estudiante"},{"id": 2,"name": "Medico"},{"id": 3,"name": "Ingeniero"}]}
            // formData: null,
            showSaveButton: false,
            prueba: null,
            flag: true,
            teclado: [
                {id: 1, name: 'Jason'},
                {id: 2, name: 'Oto'},
                {id: 3, name: 'Prime'},
                {id: 4, name: 'Geo'},
                {id: 5, name: 'Cygnus'},
                {id: 6, name: 'Taurus'},
            ]
        }
    },
    beforeCreate(){
        this.$store.commit('setActualView', 'Pacientes')
        
    },
    created(){
        this.getPageFromServer(`?page=${this.$route.params.page}`, 'first')
        this.$store.commit('unsetEscalas')
    },
    computed: {
        searchBoxIsEmpty(){
            return this.searchBox.length==0
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
        current_page(){
            return this.$route.params.page
        },
        loading(){
            return this.$store.getters.getLoading
        }
    },
    methods:{
        getPatients(){
            // let page = this.$route.params.page
            // this.$store.dispatch('getFirstPageOfPatients')
            // .then( data => {
            //     // console.log(data)
            //     this.patients= data.data
            //     // this.current_page= data.current_page
            //     this.last_page= data.last_page
            //     this.totalPatientsInScreen= data.total
            //     // este.$store.commit('setDashboardData',data)
            // })
            // .catch( data => {
            //     // console.log('error funcionando correctamente')
            // })

            // this.$store.dispatch('getFormData')
            // .then( data => {
            //     // console.log(data)
            //     // this.formData= data
            //     this.$store.commit('setFormData',data)
            // })
            // .catch( data => {
            //     // console.log('error funcionando correctamente')
            // })


        },
        deleteUser(patientid){
            // console.log(patientid)
            let store = this.$store
            let patients = this.patients
            let found = patients.find( element => element.id == patientid )
            if(found.loading.delete){
                console.log('En proceso')
                return false
            }
            Swal.fire({
                title: '¿Esta seguro?',
                text: "Tanto el usuario como sus datos seran eliminados sin posibilidad de recuperarlos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmo'
            }).then((result) => {
                // Esto siempre se ejecuta
                if (result.value) {
                    // Aqui envia la señal, si retorna true manda el mensaje
                    

                    if(found != undefined){
                        found.loading.delete = true
                        // console.log(found)
                    }

                    store.dispatch('deletePatient', patientid)
                    .then( data => {
                        // console.log(found)

                        let found = patient => patient.id == data.patientid
                        const index = patients.findIndex(found)
                        // console.log()

                        console.log(patients.splice(index, 1))

                        // let found = patients.find( element => element.id == data.patientid )
                        // if(found){
                        //     found.loading.delete = false
                        // }

                        // console.log(found)

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `Paciente eliminado`,
                            showConfirmButton: false,
                            timer: 1500
                        }) 

                    })
                    .catch( error => {
                        
                    })



                    // console.log(found)

                    // Swal.fire(
                    //     'Eliminado!',
                    //     'El usuario junto a sus datos han sido eliminados',
                    //     'success'
                    // )
                }
            })
        },
        reactivateSurvey(type,id){
            let patients = this.patients
            let find = patients.find( element => element.id == id )
            
            if(find.loading.activate == true){
                return false
            }
            
            let data = { type, id }
            let name = type == 'activate' ? 'activara' : 'desactivara'
            let store = this.$store
            
            // console.log(find.loading.activate)
            Swal.fire({
                title: '¿Esta seguro?',
                text: `Se ${name} la encuesta para este paciente`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar'
            }).then((result) => {
                if (result.value) {
                    find.loading.activate = true
                    store.dispatch('reactivateSurvey', data)
                    .then( data => {
                        // find.loading.activate = false
                        console.log(data)

                        let patientid = data.patientid
                        
                        
                        let find = patients.find( element => element.id == patientid )
                        console.log(find)
                        if(find != undefined){
                            find.loading.activate = false
                            find.survey_available = 1
                        }

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `Encuesta de paciente con id = ${patientid} reactivada`,
                            showConfirmButton: false,
                            timer: 1500
                        })

                    })
                    .catch( error => {
                        // console.log('error regresado')
                        let message = error.data.message
                        let patientid = error.data.patientid
                        let find = patients.find( element => element.id == patientid )
                        
                        if(find != undefined){
                            find.loading.activate = false
                        }

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: message,
                            // footer: '<a href>Why do I have this issue?</a>'
                        })

                        // console.log('error funcionando correctamente')
                    })


                }
            })


            // console.log(type)
            // this.$store.dispatch('reactivateSurvey', id)
        },
        evaluateNextPage(type,page){
            page == undefined ? page = this.current_page : false
            let link
            if(type == 'previous'){
                page--
            }else if(type == 'next'){
                page++
            }
            if(!this.searchBoxIsEmpty){
                // Si hay cosas en el searchbox
                link = `/search?page=${page}&search=${this.searchBox}`
            }else{
                // Si no hay nada en el searchbox
                link = `?page=${page}`
            }
            // console.log(type)
            // console.log(page)
            // console.log(link)
            return { page, link }
        },

        getPage(type,page){
            if(this.$route.params.page == page){
                return false
            }

            this.flag = false
            let data = this.evaluateNextPage(type,page)
            // console.log(data)
            this.getPageFromServer(data.link, 'secondary')
            this.$router.push({ path: `/pacientes/${data.page}` })



            // this.$store.dispatch('getPage', link)
            // .then( data => {
            //     console.log(data)
            // })
        },
        getPageFromServer(link, load){
            let este = this
            if(load == 'first'){
                this.$store.commit('setLoading',true)
            }else if(load == 'secondary'){
                console.log('Secundario')
                this.$Progress.start()
            }
            this.$store.dispatch('getPage',link)
            .then( data => {
                // console.log(data.data)

                data.data.forEach(element => {
                    // console.log(element)
                    element.loading = { activate: false, delete: false }
                })

                este.patients= data.data
                este.last_page= data.last_page
                este.totalPatientsInScreen= data.total

                if(load == 'first'){
                    este.$store.commit('setLoading',false)
                }else if(load == 'secondary'){
                    console.log('Secundario')
                    este.$Progress.finish()
                }
            })
            .catch( data => {
                // console.log('error funcionando correctamente')
            })
        },

        getDataFromSearch: _.debounce(function(){
            if(this.searchBoxIsEmpty){
                // Aqui manda a pedir la primera pagina
                this.getPageFromServer('?page=1', 'secondary')
            }else{
                // Aqui manda a pedir la informacion perzonalida
                this.flag = false
                if(this.$route.params.page !=1){
                    this.$router.push({ path: `/pacientes/1` })
                }
                let link= `/search?page=1&search=${this.searchBox}`
                // console.log(link)
                this.getPageFromServer(link)

            }
        }, 200),

        ignorar(){
            // evaluatePage(type,specificPage){
            //     let page
            //     if(type=='next'){
            //         page= this.current_page+1;
            //     }else if(type=='previous'){
            //         page= this.current_page-1;
            //     }else{
            //         page= specificPage
            //     }
            //     return page

            //     // let page = this.$route.params.page
            //     // let nextPage
            //     // if(type=='next'){
            //     //     nextPage= page+1;
            //     // }else if(type=='previous'){
            //     //     nextPage= page-1;
            //     // }else{
            //     //     nextPage= specificPage
            //     // }
            //     // return nextPage
            // },
            // getPage(type, specificPage=1){
            //     let page
            //     let link
            //     page= this.evaluatePage(type, specificPage)
            //     if(this.searchBoxIsEmpty){
            //         link= `/crud?page=${page}`
            //     }else{
            //         link= `/crud/search?page=${page}&search=${this.searchBox}`
            //     }
            //     this.$store.dispatch('getPage', link)
            //         .then( data => {
            //             // console.log(data)
            //             this.patients= data.data
            //             this.current_page= data.current_page
            //             this.last_page= data.last_page
            //             this.totalPatientsInScreen= data.total
            //         })
            //         .catch( data => {
            //             // console.log('error funcionando correctamente')
            //         })
                
            // },

        },

        openDetailsModal(index){
            // this.patient= this.patients[index]
            this.patient= JSON.parse(JSON.stringify(this.patients[index]));
            $('#exampleModalCenter').modal({})
        },
        editarButton(){
            this.showSaveButton= !this.showSaveButton
            let inputs= ['#name','#apaterno','#amaterno',"#genero","#marital","#birthdayInput","#job"]
            inputs.forEach(value => {
                // console.log(value)
                let status = $(value).prop('disabled');
                $(value).prop('disabled', !status);
            })

            // var status = $('#name').prop('disabled');
            // $('#name').prop('disabled', !status);
            // $('#name').prop('disabled', !false);
            // console.log( $('#name').prop('disabled', false) )
        },
        closeModal(){
            // this.patient=null
        },
        saveForm(){
            // this.patients // Este arreglo ya contiene toda la informacion necesario, solo mandalo
            console.log(this.patient)
        },
        goToResultados(escala,patient_index,completedSurveys){
            let escalas= [`basica/${completedSurveys}`,`suplementaria/${completedSurveys}`,`contenido/${completedSurveys}`]
            
            if(escala == 0){
                this.$store.commit('setActualResults', { id: 1, name: "Basica"})
            }else if(escala == 1){
                this.$store.commit('setActualResults', { id: 2, name: 'Suplementaria' })
            }else{
                this.$store.commit('setActualResults', { id: 3, name: 'Contenido' })
            }

            this.$store.commit('setActualPatient', this.patients[patient_index])

            this.$router.push({ path: `/resultados/${escalas[escala]}` })

        },

        tecladoFunc(name){
            // console.log('klaskdklsaj')
            let anterior = 'Nombre anterior: '+name;
            this.$store.dispatch('teclado',name)
            .then( data => {
                // console.log(data)
                console.log(anterior)
            })
            .catch( data => {
                // console.log('error funcionando correctamente')
            })
        },
        start () {
            // console.log(this.$Progress)
            this.$Progress.start()
        },
        set (num) {
            this.$Progress.set(num)
        },
        increase (num) {
            this.$Progress.increase(num)
        },
        decrease (num) {
            this.$Progress.decrease(num)
        },
        finish () {
            this.$Progress.finish()
        },
        fail () {
            this.$Progress.fail()
        },
    },
    watch: {
        $route(to, from) {
            if(this.flag){
                console.log('Watcher activado')
                let type = 'specific'
                let page = this.$route.params.page
                let data = this.evaluateNextPage(type,page)
                this.getPageFromServer(data.link)
            }
            this.flag = true
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/scss/variables';
$cell-padding: 2em;
.patients{
    position: relative;
    &__loading-container{
        position: absolute;
        top:0px;
        bottom: 0px;
        right: 0px;
        left:0px;
        background: rgba(0, 0, 0, 0.205);
        z-index: 1000;
        &__container{
            width: 100%;
            height: 100vh;
            // background: red;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    $padding-master: 1.5em;
    $padding-master-md: 3em;
    $padding-master-lg: 5em;
    &__header{
        padding: $padding-master;
        padding-bottom: 0;
        width: 100%;
        // background: red;
        @media (min-width: $medium){
            padding: 1.5em $padding-master-md;
        }

        @media (min-width: $large){
            display: flex;
            justify-content: space-around;
            padding: 1.5em $padding-master-lg;
        }
        &__title-container{
            display: none;
            @media (min-width: $large){
                display: block;
                width: 100%;
            }
            h2{
                margin: 0;
            }
        }

        &__searchbox-container{
            width: 100%;
            @media (min-width: $large){
                width: 50%;
            }
        }
    }
    &__table-container{
        padding: $padding-master;
        width: 100%;
        padding-bottom: 0;
        
        @media (min-width: $medium){
            padding: 0 $padding-master-md;
        }

        @media (min-width: $large){
            padding: 0 $padding-master-lg;
        }

        &__table{
            background-color: white;
            border: 1px solid rgba(0,0,0,0.1);
            // box-shadow: $box-shadow;
            // box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 3px 4px rgba(0,0,0,0.24);

            // thead-tr-th
            &__thead{
                &__tr{
                    &__th{
                        padding: 0.4em;

                        // @media (min-width: $medium){
                        //     padding: inherit;

                        // }
                        @media (min-width: $medium){
                            padding: 1em $cell-padding;
                        }
                        
                    }
                }
            }
            // background: red;

        }
    }

    &__pagination-container{
        padding: $padding-master;
        display: flex;
        justify-content: center;
        width: 100%;
        align-self: flex-end;
    }
}

.tbody{
    &__tr{

        &__td{
            // &:nth-child(odd){
            //     // background: red;
            // }
            vertical-align: middle;
            height: 50px;
            @media (min-width: $medium){
                padding: 1em $cell-padding;
            }
            @media (min-width: $large){
                padding: $cell-padding;
            }
            &--status{
                // display: flex;
                &__cell{ // container de p
                    // padding: 0.3em;
                    
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 75px;
                    height: 30px;
                    border-radius: 50px;
                    // padding-left: 1em;
                    // padding-right: 1em;
                    p{
                        // width: auto;
                        width: 65px;
                        text-align: center;
                        margin-left: 0 !important;
                        font-size: 11px;
                        padding: 0;
                        color: $background-color;
                        
                    }

                    &--active{
                        user-select: none;
                        background: #27ae61;
                        
                        // border: 1px solid #27ae61;
                        // color: #27ae61;
                    }

                    &--inactive{
                        background: #e84c3d;
                        cursor: pointer;
                        @media (min-width: $large){
                            transition: background 0.3s;
                            &:hover{
                                background:#27ae61;
                            }
                        }
                        // border: 1px solid #e84c3d;
                        // color: #e84c3d;
                    }
                }
            }
            &--detalles{
                // background: blue;
                // padding: 0;
                vertical-align: middle;
                &__container{
                    display: flex;
                    // background: red;
                    &__icon-container{
                        position: relative;
                        cursor: pointer;
                        width: 100%;
                        padding: 0.5em;
                        margin-bottom: 12px;
                        width: 100%;
                        border-radius: 0.25rem;
                        &:nth-child(1){
                            background: #e84c3d;
                            color: $background-color;
                            @media (min-width: $large){
                                &.loading{
                                    background: #e84c3d;
                                    color: white;
                                    &:hover{
                                        cursor: not-allowed;
                                        color: white;
                                    }
                                }
                            }
                        }
                        &:nth-child(2){
                            background: #2c97df;
                            // color: #2c97df;
                        }
                        &:nth-child(3){
                            background: #27ae61;
                            color:$background-color;
                            margin-right: 0;
                            border-right: 0;
                            margin-bottom: 0;
                            &.disabled{
                                color: $background-color;
                                background: gray;
                                cursor: no-drop;
                            }
                        }
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: $background-color;
                        border-right: 1px solid rgba(0, 0, 0, 0.15);
                        &.disabled{
                            color: gray;
                            cursor: default;
                        }
                        

                        &:nth-child(odd){
                            // background: skyblue;
                        }
                        span{
                            font-size: 1.5em;
                        }
                        
                        @media (min-width: $large){
                            margin-bottom: 0;
                            padding: 0;
                            width: 50px;
                            height: 35px;
                            &:nth-child(1){
                                // justify-content: flex-start;
                                background: none;
                                color: #e84c3d;
                                transition: all 0.3s;
                                &:hover{
                                    // background-color: red;
                                    color: #e41c09;
                                }
                                
                            }
                            &:nth-child(2){
                                background: none;
                                color: #2c97df;
                                margin-right: 0;
                                border-right: 0;
                                transition: all 0.3s;
                                &:hover{
                                    // background-color: red;
                                    color: #1a5d8a;
                                }
                            }
                            &:nth-child(3){
                                background: none;
                                color: #27ae61;
                            }
                        }
                        
                    }
                }
            }
            &--results{ // td
                vertical-align: top;
                // display: flex;
                // background: green;
                // padding: 0;
                @media (min-width: $large){
                    vertical-align: middle;
                }
                p{
                    // display: inline-block;
                    width: 100%;
                    padding: 0.5em;
                    background: $primary-color;
                    text-align: center;
                    color: $background-color;
                    border-radius: 0.25rem;
                    @media (min-width: $large){
                        // width: 100%/3;
                        // padding: 1em;
                        width: 40px;
                        margin: 0;
                        display: inline-block;
                        margin-right: 0.4em;
                        cursor: pointer;
                        padding: 0.6em;

                        transition: all .2s;
                        &:hover{
                            background: rgb(1, 111, 214);
                            color: $background-color;
                            // box-shadow: 0 1px 3px rgba(0,0,0,0.01), 0 1px 6px rgba(0,0,0,0.24);
                        }

                    }
                    &:last-child{
                        margin-right: 0;
                        margin-bottom: 0;
                    }
                }

                &.disabled{
                    p{
                        background: gray;
                        cursor: not-allowed ;
                    }
                }
            }

        }
    }
}

.cursor-pointer{
    cursor: pointer;
}

.form-group-container-nombre{
    /* background: red; */
    width: 100%;
    display: flex;
    justify-content: space-between
}
.lds-ring{
    display: inline-block;
    width: 80px;
    height: 80px;
    transform: scale(0.25);
    &.big{
        transform: scale(0.9);
    }
    &.icon-in{

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
  border-color: red transparent transparent transparent;
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

.specific-link{
    cursor: pointer;
}

.preNext-link{
    &--active{
        cursor: pointer;
    }

}

</style>