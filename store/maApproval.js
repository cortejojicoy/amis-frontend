import Vue from "vue"
export const state = () => ({
    data: [],
    maValues: {},
    maAdminType: {},
    loading: false,
    initialLoad: false,
    updateTxnIndicator: 0,
    activeMentor: {},
    forRemove: {
        mas_id: '',
        actions: '',
        mentor_id: '',
        mentor_name: '',
        mentor_role: '',
        status: '',
        student_sais_id: ''
    }

})

export const actions = {
    async getData({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/${payload.roles}/${payload.link}`, {params: {
                studentId: payload.studentId,
                mentor_id: payload.sais_id,
                adminType: payload.adminType,
                facultyType: payload.facultyType
            }})
            await commit('GET_DATA_SUCCESS', data)
        } catch (error) {
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

    async updateApproval({commit}, payload) {
        commit('UPDATE_DATA_REQUEST')
        try {
            // console.log(payload)
            const data = await this.$axios.$put(`/${payload.roles}/${payload.link}/${payload.index}`, {
                maType: payload.maType,
                sais_id: payload.sais_id,
                remarks: payload.text
            })
            await commit('UPDATE_DATA_SUCCESS', data)
            await commit('alert/SUCCESS', 'Successfully Endorsed', { root: true })
            await commit('UPDATE_TXN_INDICATOR')
        } catch (error) {
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

    async getAdminType({commit}) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/admins/check-tags`)
            await commit('GET_ADMIN_TYPE', {maAdminType: data.adminType})
        } catch (error) {
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

    async getStudenDetails({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/student-details`, {params: {sais_id: sais_id}})
            await commit('GET_STUDENT_DETAILS', {activeMentor: data.stud_active_mentor})
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
    }
}

export const mutations = {
    GET_DATA_REQUEST (state) {
        state.loading = true
    },
    GET_DATA_SUCCESS (state, data) {
        state.data = data
        state.loading = false
        state.initialLoad = false
        // console.log(data)
    },
    GET_MENTORS_DATA(state, data) {
        // Vue.set(state.maValues, data.maData)
        // console.log(data)
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },

    GET_ADMIN_TYPE(state, data) {
        state.maAdminType = data.maAdminType
    },

    GET_STUDENT_DETAILS(state, data) {
        state.activeMentor = data.activeMentor
    },

    UPDATE_DATA_REQUEST(state) {
        state.loading = true
    },
    UPDATE_DATA_SUCCESS(state, data) {
        state.loading = false
    },
    UPDATE_TXN_INDICATOR (state) {
        state.updateTxnIndicator++
    },
    DELETE_ROW (state, id) {
        state.data.mas = state.data.mas.filter(function(el){
            return el.id!==id;
        })
    },
    GET_REMOVE_MENTOR(state, payload) {
        let mentor = state.data.mas.find(x => x.mas_id === payload.mas_id)

        state.forRemove.mas_id = mentor.mas_id
        state.forRemove.actions = mentor.actions
        state.forRemove.mentor_id = mentor.mentor_id
        state.forRemove.mentor_name = mentor.mentor_name
        state.forRemove.mentor_role = mentor.mentor_role
        state.forRemove.status = mentor.status
        state.forRemove.student_sais_id = mentor.student_sais_id
    }
}

export const getters = {
    getTableHeaders(state) {
        if(state.data) {
            return state.data.keys.map((th)=>{
                return th.toUpperCase().replaceAll('_', ' ')
            })
        }
    },
}