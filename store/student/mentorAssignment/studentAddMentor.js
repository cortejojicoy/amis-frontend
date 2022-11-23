import Vue from "vue";
export const state = () => ({
    loading: {},
    show: {},
    data: [],
    students: [],
    updateTxnIndicator: 0,
    updateData: [],
    confirmText: '',
    facultyName: [],
    mRole: [],
    forConfirmation: {}
})

export const actions = {
    async getData ({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/${payload.roles}/${payload.sais_id}/${payload.link}`)
            // console.log(data)
            await commit('GET_DATA_SUCCESS', data)
            await commit('GET_FACULTY_NAME', {results:data.faculty_name})
            await commit('GET_MENTOR_ROLE', {mRole:data.m_role})
        } catch(error) {
            if(error.response.status===422){  
                let errList = ``;
                let fields = Object.keys(error.response.data.errors)
                fields.forEach((field) => {
                  let errorArr = error.response.data.errors[field]
                  errorArr.forEach((errMess) => {
                    errList += `<li>${errMess}</li>`
                })
              })
                let errMessage = `Validation Error: ${errList}`
                await commit('alert/ERROR', errMessage, { root: true })
              }else{
                let errMessage = `Something went wrong while performing your request. Please contact administrator`
                await commit('alert/ERROR', errMessage, { root: true })
              }
            commit('GET_DATA_FAILED', error)
        }
    },

    async updateToSaved ({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$post(`/students/${payload.sais_id}/nominated-mentors/collection`, payload.data)
            await commit('UPDATE_SAVED_SUCCESS', data)
            commit('alert/SUCCESS', 'Successfully saved', { root: true })
        } catch(error) {
            if(error.response.status===422){  
                let errList = ``;
                let fields = Object.keys(error.response.data.errors)
                fields.forEach((field) => {
                  let errorArr = error.response.data.errors[field]
                  errorArr.forEach((errMess) => {
                    errList += `<li>${errMess}</li>`
                })
              })
                let errMessage = `Validation Error: ${errList}`
                await commit('alert/ERROR', errMessage, { root: true })
              }else{
                let errMessage = `Something went wrong while performing your request. Please contact administrator`
                await commit('alert/ERROR', errMessage, { root: true })
              }
            commit('GET_DATA_FAILED', error)
        }
    },

    async updateToSubmitted({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            // update mentor status into submitted
            let mentor = payload.data.map((item) => {
                return {
                    actions: item.actions, 
                    actions_status: payload.status,
                    mentor_id: item.mentor_id,
                    mentor_name: item.mentor_name, 
                    mentor_role: item.mentor_role, 
                    sais_id: payload.sais_id, 
                }
            })
            // console.log(mentor)
            const data = await this.$axios.$post(`/students/${payload.sais_id}/nominated-mentors/collection`, mentor)
            await commit('UPDATE_DATA_SUCCESS', data)
        } catch(error) {
            if(error.response.status===422){  
                let errList = ``;
                let fields = Object.keys(error.response.data.errors)
                fields.forEach((field) => {
                let errorArr = error.response.data.errors[field]
                errorArr.forEach((errMess) => {
                    errList += `<li>${errMess}</li>`
                })
            })
                let errMessage = `Validation Error: ${errList}`
                await commit('alert/ERROR', errMessage, { root: true })
            }else{
                let errMessage = `Something went wrong while performing your request. Please contact administrator`
                await commit('alert/ERROR', errMessage, { root: true })
            }
            commit('UPDATE_DATA_FAILED', error)
        }
    },

    async confirm({commit, dispatch, state}, payload) {
        if(state.confirmText == "CONFIRM") {
            commit('GET_DATA_REQUEST')
            try {
                let mentors = payload.data.map((item) => {
                    return {
                        actions: item.actions,
                        sais_id: item.sais_id,
                        mentor_id: item.mentor_id,
                        mentor_role: item.mentor_role,
                        mentor_name: item.mentor_name
                    }
                })
                // let mentors = Object.assign(payload.data, payload.sais_id)
                const data = await this.$axios.$post(`/students-details`, mentors)
                // const data = await this.$axios.$post(`/students/student-confirm`, mentors)
                // console.log(data)
                await dispatch('checkStatus', data)
            } catch(error) {
                if(error.response.status===422){  
                    let errList = ``;
                    let fields = Object.keys(error.response.data.errors)
                    fields.forEach((field) => {
                    let errorArr = error.response.data.errors[field]
                    errorArr.forEach((errMess) => {
                        errList += `<li>${errMess}</li>`
                    })
                })
                    let errMessage = `Validation Error: ${errList}`
                    await commit('alert/ERROR', errMessage, { root: true })
                }else{
                    let errMessage = `Something went wrong while performing your request. Please contact administrator`
                    await commit('alert/ERROR', errMessage, { root: true })
                }
                commit('UPDATE_DATA_FAILED', error)
            }
        } else {
            commit('alert/ERROR', "Please type CONFIRM", { root: true })
            // await commit('CLOSE_MODAL')
        }
    },
    checkStatus ({commit}, data) {
        if (data.status == 'Error') {
            commit('alert/ERROR', data.message, { root: true })
            // commit('CLOSE_MODAL')
        } else {
            commit('alert/SUCCESS', data.message, { root: true })
            commit('CLOSE_MODAL')
            commit('UPDATE_DATA_SUCCESS', data)
            commit('UPDATE_TXN_INDICATOR')
        }
        commit('CLOSE_MODAL')
    },
}   

export const mutations = {
    GET_DATA_REQUEST (state) {
        state.loading = true
    },
    GET_DATA_SUCCESS (state, data) {
        state.data = data
        state.loading = false
    },
    GET_UPDATE_SUCCESS (state, data) {
        state.updateData = data
        state.loading = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },

    DELETE_ROW (state, id) {
        state.data.save_mentors = state.data.save_mentors.filter(function(el){
            return el.id!==id;
        })
    },

    GET_FACULTY_NAME(state, data) {
        state.facultyName = data.results
        // console.log(data.results)
    },

    GET_MENTOR_ROLE (state, data) {
        state.mRole = data.mRole
    },

    UPDATE_SAVED_SUCCESS(state, data) {
        state.loading = false
    },
    UPDATE_DATA_SUCCESS(state, data) {
        state.data = data
        state.loading = false
    },
    UPDATE_DATA_FAILED(state, error) {
        state.data = error
    },  
    UPDATE_TXN_INDICATOR (state) {
        state.updateTxnIndicator++
    },
    UPDATE_CONFIRMATION (state, confirmText) {
        state.confirmText = confirmText
    },

    GET_STUDENT_SUCCESS (state, data) {
        state.students = data
        state.loading = false
    },
    
    GET_STUDENT_FAILED (state, error) {
        state.students = error
    },

    CONFIRM_REQUEST_MENTOR(state, data) {
        // console.log(data)
    },

    CLOSE_MODAL (state) {
        Vue.set(state.show)
    },

    ADD_ROW(state, sais_id) {
        if(state.data.save_mentors) {
            state.data.save_mentors.push({
                actions:'', 
                actions_status: 'saved',
                mentor_name:'', 
                mentor_role:'', 
                field_represented:'', 
                effectivity_start:'',
                effectivity_end:'',
                sais_id: sais_id,
                id: '_'+Date.now() + Math.random()
            })
        }
    },

    CHANGE_FIELD_STATE (state, payload) {
        let mentor = state.data.save_mentors.find(x => x.id === payload.id)
        mentor[payload.field] = payload.newValue
    }
}

export const getters = {
    getWithoutId(state) {
        if(state.data.save_mentors){
          return state.data.save_mentors.map((item)=>{
            var temp = Object.assign({}, item)
            delete  temp.id
            return temp
          })
        }
    },

    getConfirmText(state) {
        return state.confirmText
    }
}