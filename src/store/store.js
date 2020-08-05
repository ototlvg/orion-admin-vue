import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://orion.com/api/admin'

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        actualView: null,
        inResults: false,
        patient: {"id":1,"code":"87060501","name":"Jason","apaterno":"Torres","amaterno":"Luis","gender":1,"marital_status":1,"birthday":"1977-09-25","job":1,"email":null,"type":1,"survey_available":1,"completed_surveys":0},
        basica: [],
        suplementaria: [],
        contenido: [],
        formData: {"prueba":null,"genders":[{"id":1,"gender":"Masculino"},{"id":2,"gender":"Femenino"}],"marital":[{"id":1,"status":"Soltero"},{"id":2,"status":"Casado"},{"id":3,"status":"Union libre"},{"id":4,"status":"Divorciado"},{"id":5,"status":"Separado"},{"id":6,"status":"Viudo"}],"jobs":[{"id":1,"name":"Estudiante"},{"id":2,"name":"Medico"},{"id":3,"name":"Ingeniero"}]},
        actualResults: {id:1, name: 'Basica'},
        openUserInfo: false,
        loading: false
        
        // formData: null
    },
    getters: {
        getSections(state) {
            return state.sections
        },
        getPatient(state){
            return state.patient
        },
        getInResults(state){
            return state.inResults
        },
        getFormData(state){
            return state.formData
        },
        getActualResults(state){
            return state.actualResults
        },
        getOpenUserInfo(state){
            return state.openUserInfo
        },
        getBasica(state){
            return state.basica
        },
        getSuplementaria(state){
            return state.suplementaria
        },
        getContenido(state){
            return state.contenido
        },
        getActualView(state){
            return state.actualView
        },
        getLoading(state){
            return state.loading
        }
    },
    mutations: {
        // setPatiendID(state, id){
        //     state.patiendID= id;
        // },
        // logout(state){
        //     state.token=null
        //     state.patientCode= null
        //     state.patiendID= null
        //     state.sections= null
        //     state.paginate= null
        //     state.questions= null
        //     state.loading= false
        //     state.disabled= false,
        //     state.personal=[],
        //     state.showSectionCompleted= { status: false, section: null }
        // },
        // setPersonal(state, data){
        //     state.personal= data
        // }
        setActualView(state, view){
            state.actualView= view
        },
        setActualPatient(state, obj){
            state.patient= obj
        },
        setBasica(state, basica){
            // state.basica= basica
            state.basica.push(basica)
        },
        setSuplementaria(state, suplementaria){
            // state.suplementaria= suplementaria
            state.suplementaria.push(suplementaria)
        },
        setContenido(state, contenido){
            // state.contenido= contenido
            state.contenido.push(contenido)
        },
        setInResults(state,inResults){
            state.inResults= inResults
        },
        setFormData(state,data){
            state.formData= data
        },
        setActualResults(state,result){
            state.actualResults= result
        },
        setOpenUserInfo(state){
            state.openUserInfo= !state.openUserInfo
        },
        unsetEscalas(state){
            state.basica= []
            state.suplementaria= []
            state.contenido= []
        },
        setLoading(state, status){
            state.loading = status
        }
    },
    actions: {
        getFirstPageOfPatients(context) {
            // let page= index+1
            return new Promise((resolve, reject) => {
                // console.log(page)
                axios.get('/crud')
                    .then(function (response) {
                        // console.log(response);
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                        // reject(error)
                    })
                    .then(function () {
                        // always executed
                    });
            })
        },
        getPage(context, link){
            // console.log('Ejecutando')
            return new Promise((resolve, reject) => {
                // console.log(page)
                axios.get(link)
                    .then(function (response) {
                        // console.log(response);
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                        // reject(error)
                    })
                    .then(function () {
                        // always executed
                    });
            })
        },
        getPage(context, link){
            // console.log('Ejecutando')
            return new Promise((resolve, reject) => {
                // console.log(page)
                axios.get(`/crud${link}`)
                    .then(function (response) {
                        // console.log(response);
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                        // reject(error)
                    })
                    .then(function () {
                        // always executed
                    });
            })
        },
        getFormData(context) {
            // let page= index+1
            return new Promise((resolve, reject) => {
                // console.log(page)
                axios.get('/crud/getformdata')
                    .then(function (response) {
                        // console.log(response);
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                        // reject(error)
                    })
                    .then(function () {
                        // always executed
                    });
            })
        },
        getEscalaBasica(context, survey) {
            let id= context.getters.getPatient.id
            // console.log(context.getters.getPatient.id)
            return new Promise((resolve, reject) => {
                // console.log(page)
                axios.get(`/mmpi/basica/${id}/${survey}`)
                    .then(function (response) {
                        // console.log(response);
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                        // reject(error)
                    })
                    .then(function () {
                        // always executed
                    }); 
            })
        },
        getEscalaDoble(context, survey) {
            let id= context.getters.getPatient.id
            // console.log(survey.name)
            // console.log(survey.survey)
            return new Promise((resolve, reject) => {
                // console.log(page)
                axios.get(`/mmpi/${survey.name}/${id}/${survey.survey}`)
                    .then(function (response) {
                        // console.log(response);
                        resolve(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                        // reject(error)
                    })
                    .then(function () {
                        // always executed
                    }); 
            })
        },
        reactivateSurvey(context, data){
            console.log(data)
            return new Promise((resolve, reject) => {
                axios.post('/crud/reactivate', {
                    id: data.id,
                    type: data.type
                  })
                  .then(function (response) {
                    // console.log(response.data);
                    resolve(response.data)
                  })
                  .catch(function (error) {
                    // console.log(error);
                    // reject(error)
                    reject(error.response)
                  });
            })
        },

        teclado(context, name){
            return new Promise((resolve, reject) => {
                // console.log(page)
                axios.post('/crud/teclado', {
                    name: name
                  })
                  .then(function (response) {
                    // console.log(response.data);
                    resolve(response.data)
                  })
                  .catch(function (error) {
                    reject(error.response)
                  });
            })
        },

        deletePatient(context, patientid){
            // console.log('Delete user action ' + patientid)
            return new Promise((resolve, reject) => {
                // console.log(page)
                axios.delete(`crud/${patientid}`)
                  .then(function (response) {
                    // console.log(response.data);
                    resolve(response.data)
                  })
                  .catch(function (error) {
                    reject(error.response)
                  });
            })
        }



    }
})