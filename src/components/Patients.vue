<template>
    <div class="patients">

        <!-- Patient Header -->
        <div class="patients__header">
            <div class="patients__header__title-container">
                <h2>Pacientes</h2>
            </div>
            <div class="patients__header__searchbox-container">
                <input @keyup="getDataFromSearch" type="text" class="form-control" id="" v-model="searchBox" placeholder="Buscar">
            </div>

        </div>

        <!-- Searchbox -->
        <!-- <div class="patients__searchbox">
            <input @keyup="getDataFromSearch" type="text" class="form-control" id="" v-model="searchBox">
        </div> -->

        <!-- Table Container -->
        <div class="patients__table-container">
            <!-- <table class="table table-borderless"> -->
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col" class="d-none d-lg-table-cell">Codigo</th>
                        <th scope="col" class="d-none d-lg-table-cell">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col" class="d-none d-md-table-cell">Estado</th>
                        <th scope="col">Acciones</th>
                        <th scope="col">Resultados</th>
                    </tr>
                </thead>
                <tbody class="tbody">
                    <tr class="tbody__tr" v-for="(patient,index) in patients" :key="index">
                        <td class="tbody__tr__td" scope="row">{{patient.id}}</th>
                        <td class="tbody__tr__td d-none d-lg-table-cell">{{patient.code}}</td>
                        <td class="tbody__tr__td d-none d-lg-table-cell">{{patient.name}}</td>
                        <td class="tbody__tr__td">{{patient.apaterno}} {{patient.amaterno}}</td>
                        <td class="tbody__tr__td tbody__tr__td--status status d-none d-md-table-cell">
                            <!-- <div class="ignorar">
                                <div class="d-flex" v-if="patient.survey_available">
                                    <span class="material-icons text-success"> check_box </span>
                                    <p class="m-0 ml-1">Si</p>
                                </div>

                                <div class="d-flex" v-else>
                                    <span class="material-icons text-warning">cancel</span>
                                    <p class="m-0 ml-1">No</p>
                                </div>
                            </div> -->
                            <div class="tbody__tr__td--status__cell tbody__tr__td--status__cell--active" v-if="patient.survey_available">
                                <p class="m-0 ml-1">ACTIVO</p>
                            </div>

                            <div class="tbody__tr__td--status__cell tbody__tr__td--status__cell--inactive" v-else>
                                <p class="m-0 ml-1">INACTIVO</p>
                            </div>
                        </td>

                        <td class="tbody__tr__td tbody__tr__td--detalles">
                            <div class="tbody__tr__td--detalles__container d-flex flex-column flex-lg-row">
                                <!-- <div class="ignorar"> -->
                                    <!-- <a class="btn btn-danger btn-sm mb-1 mb-md-0 mr-md-1 text-white" @click="deleteUser(patient.id)">Eliminar</a>
                                    <a class="btn btn-info btn-sm mb-1 mb-md-0 mr-md-1 text-white" @click="openDetailsModal(index)">Detalles</a>
                                    <a v-if="patient.survey_available==0" class="btn btn-success btn-sm mb-1 mb-md-0 text-white" tabindex="-1" @click="reactivateSurvey(patient.id)">Reactivar</a>
                                    <a v-else class="btn btn-success btn-sm mb-1 mb-md-0 text-white disabled" tabindex="-1">Reactivar</a> -->
                                    <!-- <a class="btn btn-danger btn-sm mb-1 mb-md-0 mr-md-1 text-white">Eliminar</a> -->
                                    <!-- <a class="btn btn-info btn-sm mb-1 mb-md-0 mr-md-1 text-white" @click="openDetailsModal(index)">Detalles</a> -->
                                    <!-- <a v-if="patient.survey_available==0" class="btn btn-success btn-sm mb-1 mb-md-0 text-white" tabindex="-1" @click="reactivateSurvey(patient.id)">Reactivar</a>
                                    <a v-else class="btn btn-success btn-sm mb-1 mb-md-0 text-white disabled" tabindex="-1">Reactivar</a> -->

                                <!-- </div> -->
                                <div class="tbody__tr__td--detalles__container__icon-container" @click="deleteUser(patient.id)">
                                    <!-- <span class="material-icons" @click="deleteUser(patient.id)">delete_forever</span> -->
                                    <span class="material-icons">delete</span>

                                </div>
                                <div class="tbody__tr__td--detalles__container__icon-container" @click="openDetailsModal(index)">
                                    <span class="material-icons">info</span>

                                </div>
                                <div class="tbody__tr__td--detalles__container__icon-container" @click="reactivateSurvey(patient.id)" v-if="patient.survey_available==0">
                                    <span class="material-icons" >cached</span>
                                </div>
                                <div v-else class="tbody__tr__td--detalles__container__icon-container disabled" @click="reactivateSurvey(patient.id)">
                                    <span class="material-icons">cached</span>
                                </div>
                            </div>
                        </td>
                        <td class="tbody__tr__td tbody__tr__td--results">
                            <!-- <div class="btn-group" role="group" aria-label="Basic example" v-if="patient.completed_surveys!=0">
                                <button type="button" class="btn btn-secondary" @click="goToResultados(0,index,patient.completed_surveys)">Basico</button>
                                <button type="button" class="btn btn-secondary" @click="goToResultados(1,index,patient.completed_surveys)">Suplementaria</button>
                                <button type="button" class="btn btn-secondary" @click="goToResultados(2,index,patient.completed_surveys)">Contenido</button>
                            </div> -->

                            <div class="tbody__tr__td tbody__tr__td--results__container" v-if="patient.completed_surveys!=0">
                                <div @click="goToResultados(0,index,patient.completed_surveys)" class="tbody__tr__td tbody__tr__td--results__container__button-container">
                                    <span>B</span>
                                </div>
                                <div @click="goToResultados(1,index,patient.completed_surveys)" class="tbody__tr__td tbody__tr__td--results__container__button-container">
                                    <span>S</span>
                                </div>
                                <div @click="goToResultados(2,index,patient.completed_surveys)" class="tbody__tr__td tbody__tr__td--results__container__button-container">
                                    <span>C</span>
                                </div>
                            </div>
                            <div v-else class="tbody__tr__td tbody__tr__td--results__container">
                                <div class="tbody__tr__td tbody__tr__td--results__container__button-container disabled">
                                    <p>B</p>
                                </div>
                                <div class="tbody__tr__td tbody__tr__td--results__container__button-container disabled">
                                    <p>S</p>
                                </div>
                                <div class="tbody__tr__td tbody__tr__td--results__container__button-container disabled">
                                    <p>C</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <!-- Pagination Container -->
        <div class="patients__pagination-container">
            <ul class="pagination">

                <li v-if="!(current_page==1)" class="page-item" @click="getPage('previous')" >
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
                </li>
                <li v-else class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
                </li>


                
                <li v-for="index in last_page" :key="index" class="page-item" :class="{ active: current_page==index }" @click="getPage('specific',index)">
                    <a class="page-link" href="#">{{index}}</a>
                </li>



                <li v-if="!(current_page==last_page)" class="page-item" @click="getPage('next')" ref="next">
                    <a class="page-link" href="#">Siguiente</a>
                </li>
                <li v-else class="page-item disabled" ref="next">
                    <a class="page-link" href="#">Siguiente</a>
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
            current_page: 1,
            last_page: 1,
            totalPatientsInScreen: 1,
            patient: null,
            // formData: {"prueba": null,"genders": [{"id": 1,"gender": "Masculino"},{"id": 2,"gender": "Femenino"}],"marital": [{"id": 1,"status": "Soltero"},{"id": 2,"status": "Casado"},{"id": 3,"status": "Union libre"},{"id": 4,"status": "Divorciado"},{"id": 5,"status": "Separado"},{"id": 6,"status": "Viudo"}],"jobs": [{"id": 1,"name": "Estudiante"},{"id": 2,"name": "Medico"},{"id": 3,"name": "Ingeniero"}]}
            // formData: null,
            showSaveButton: false,
            prueba: null
        }
    },
    beforeCreate(){
        this.$store.commit('setActualView', 'Pacientes')
        
    },
    created(){
        // this.$store.commit('setBasica', null)
        // this.$store.commit('setSuplementaria', null)
        // this.$store.commit('setContenido', null)
        // let page = this.$route.params.page
        // console.log(page)
        this.getPatients()
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
        }
    },
    methods:{
        getPatients(){
            let page = this.$route.params.page
            this.$store.dispatch('getFirstPageOfPatients')
            .then( data => {
                // console.log(data)
                this.patients= data.data
                this.current_page= data.current_page
                this.last_page= data.last_page
                this.totalPatientsInScreen= data.total
                // este.$store.commit('setDashboardData',data)
            })
            .catch( data => {
                // console.log('error funcionando correctamente')
            })

            this.$store.dispatch('getFormData')
            .then( data => {
                // console.log(data)
                // this.formData= data
                this.$store.commit('setFormData',data)
            })
            .catch( data => {
                // console.log('error funcionando correctamente')
            })

        },
        deleteUser(id){
            console.log(id)
            Swal.fire({
                title: 'Esta seguro?',
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
                    Swal.fire(
                        'Eliminado!',
                        'El usuario junto a sus datos han sido eliminados',
                        'success'
                    )
                }
            })
        },
        reactivateSurvey(id){
            this.$store.dispatch('reactivateSurvey', id)
        },
        evaluatePage(type,specificPage){
            // let page
            // if(type=='next'){
            //     page= this.current_page+1;
            // }else if(type=='previous'){
            //     page= this.current_page-1;
            // }else{
            //     page= specificPage
            // }
            // return page

            let page = this.$route.params.page
            let nextPage
            if(type=='next'){
                nextPage= page+1;
            }else if(type=='previous'){
                nextPage= page-1;
            }else{
                nextPage= specificPage
            }
            return nextPage
        },
        getPage(type, specificPage=1){
            let page
            let link
            page= this.evaluatePage(type, specificPage)
            if(this.searchBoxIsEmpty){
                link= `/crud?page=${page}`
                // this.dispatchPatients(link)
            }else{
                // console.log('caja de busqueda')
                link= `/crud/search?page=${page}&search=${this.searchBox}`
                // this.getDataFromSearch(link)
            }
            // console.dir(this.$refs.next.classList.contains('disabled'))
            // console.log(link)
            this.$store.dispatch('getPage', link)
                .then( data => {
                    // console.log(data)
                    this.patients= data.data
                    this.current_page= data.current_page
                    this.last_page= data.last_page
                    this.totalPatientsInScreen= data.total
                })
                .catch( data => {
                    // console.log('error funcionando correctamente')
                })
            
        },
        getDataFromSearch: _.debounce(function(){
            if(this.searchBoxIsEmpty){
                this.$store.dispatch('getFirstPageOfPatients')
                .then( data => {
                    // console.log(data)
                    this.patients= data.data
                    this.current_page= data.current_page
                    this.last_page= data.last_page
                    this.totalPatientsInScreen= data.total
                })
                .catch( data => {
                    // console.log('error funcionando correctamente')
                })
            }else{
                let link= `/crud/search?page=1&search=${this.searchBox}`
                this.$store.dispatch('getPage', link)
                    .then( data => {
                        // console.log(data)
                        this.patients= data.data
                        this.current_page= data.current_page
                        this.last_page= data.last_page
                        this.totalPatientsInScreen= data.total
                    })
                    .catch( data => {
                        // console.log('error funcionando correctamente')
                    })
            }
        }, 100),
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

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/scss/variables';
.patients{
    // padding: 4.5em;
    display: flex;
    flex-wrap: wrap;
    // background: green;
    // align-content: flex-start;

    &__header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: red;
        padding: 2em;
        &__title-container{
            h2{
                margin: 0;
            }
        }
    }

    &__searchbox{
        width: 100%;
    }

    &__table-container{
        // background-color: green;
        width: 100%;
    }

    &__pagination-container{
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
            // padding: 0;
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
                        background: #27ae61;
                        // border: 1px solid #27ae61;
                        // color: #27ae61;
                    }

                    &--inactive{
                        background: #e84c3d;
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
                    // justify-content: space-between;
                    // background: purple;
                    &__icon-container{
                        // padding: 0.2em;
                        // background: purple;
                        cursor: pointer;
                        width: 100%;
                        padding: 0.3em;
                        margin-bottom: 12px;
                        width: 100%;
                        &:nth-child(1){
                            background: #e84c3d;
                            color: $background-color;
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
                                color: gray;
                                cursor: default;
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
                            padding: 0;
                            width: 50px;
                            height: 35px;
                            &:nth-child(1){
                                background: none;
                                color: #e84c3d;
                            }
                            &:nth-child(2){
                                background: none;
                                color: #2c97df;
                            }
                            &:nth-child(3){
                                background: none;
                                color: #27ae61;
                                margin-right: 0;
                                border-right: 0;
                            }
                        }
                        
                    }
                }
            }
            &--results{ // td
                vertical-align: top;
                &__container{
                    height: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    @media (min-width: $large){
                        flex-wrap: nowrap;
                        
                    }
                    &__button-container{
                        background-color: $primary-color;
                        text-align: center;
                        padding: 0.3em;
                        width: 100%;
                        height: 2.1em;
                        margin-bottom: 12px;
                        color: $background-color;
                        &:first-child{
                            // background-color: blue;
                        }

                        &:nth-child(2){
                            // background: green;
                        }
                        &:last-child{
                            // background: purple;
                            margin-bottom: 0;
                        }

                        &.disabled{
                            background-color: gray;
                            cursor: not-allowed;
                        }

                        @media (min-width: $large){
                            margin-right: 1em;
                            cursor: pointer;
                        }
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
</style>