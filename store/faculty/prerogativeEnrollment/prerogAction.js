import Vue from "vue"

export const state = () => ({
    update_data_loading: {},
    loading: {},
    data: {},
    for_action: {
        action: '',
        full_name: '',
        student_number: '',
        email: '',
        student_remarks: '',
        justification: '',
        prg_id: '',
        course: ''
    },
    updateTxnIndicator: 0,
})
  
export const actions = {
    async getApplications ({ dispatch, commit }, payload) {
        commit('GET_DATA_REQUEST', {key: payload.index})
        try {
            const data = await this.$axios.$get(`/faculties/prerogative-enrollments`, {params: {
                class_nbr: payload.class_nbr,
                status: ['Pre-Approved', 'Approved by FIC', 'Approved by OCS'],
                with_students: 'true',
                prg_term: 1221,
                prg_txn_status: 'Requested'
            }})
            await commit('GET_DATA_SUCCESS', {results: data.prgs, key: payload.index})
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
            commit('GET_DATA_FAILED', {error: error, key: payload.index})
        }
    },

    async updateApplication({state, dispatch, commit}, payload) {
        commit('UPDATE_DATA_REQUEST', {key: payload.index})
        try {
            const data = await this.$axios.$put(`/faculties/prerogative-enrollments/${state.for_action.prg_id}`, {
                class_nbr: payload.class_nbr,
                sais_id: payload.sais_id,
                status: state.for_action.action,
                justification: state.for_action.justification
            })
            await commit('alert/SUCCESS', data.message, { root: true })
            await commit('UPDATE_DATA_SUCCESS', {key: payload.index})
            await commit('UPDATE_TXN_INDICATOR')
            await commit('UNSET_FOR_ACTION')
            await dispatch('getApplications', payload)            
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
            commit('GET_DATA_FAILED', {error: error, key: payload.index})
        }
    },

    setInitialApplications({commit}, payload) {
        commit('GET_DATA_REQUEST', {key: payload.index})
        commit('SET_INITIAL_DATA', {key: payload.index, prerog_txns: payload.prerog_txns})
    },
}
  
export const mutations = {
    GET_DATA_REQUEST (state, data) {
        Vue.set(state.loading, data.key, true)
    },
    GET_DATA_SUCCESS (state, data) {
        Vue.set(state.loading, data.key, false)
        Vue.set(state.data, data.key, data.results)
    },
    GET_DATA_FAILED (state, data) {
        Vue.set(state.data, data.key, data.error)
    },
    SET_INITIAL_DATA (state, data) {
        Vue.set(state.loading, data.key, false)
        Vue.set(state.data, data.key, data.prerog_txns)
    },
    UPDATE_DATA_REQUEST (state, data) {
        Vue.set(state.update_data_loading, data.key, true)
    },
    UPDATE_DATA_SUCCESS (state, data) {
        Vue.set(state.update_data_loading, data.key, false)
    },
    SET_FOR_ACTION (state, data) {
        state.for_action.action = data.action
        state.for_action.full_name = data.full_name
        state.for_action.student_number = data.student_number
        state.for_action.email = data.email
        state.for_action.student_remarks = data.student_remarks
        state.for_action.prg_id = data.prg_id
    },
    UPDATE_JUSTIFICATION (state, justification) {
        state.for_action.justification = justification
    },
    UNSET_FOR_ACTION (state) {
        state.for_action.action = ''
        state.for_action.full_name = ''
        state.for_action.student_number = ''
        state.for_action.email = ''
        state.for_action.student_remarks = ''
        state.for_action.prg_id = ''
        state.for_action.justification = ''
    },
    UPDATE_TXN_INDICATOR (state) {
        state.updateTxnIndicator++
    }
}

export const getters = {
    getApplicationById: (state) => (id) => {
        if(state.data[id]) {
            state.data[id].forEach(prerog => {
                prerog.user.full_name = prerog.user.first_name + ' '  + prerog.user.middle_name + ' ' + prerog.user.last_name

                prerog.user.request_details = prerog.user.email + ', ' + prerog.student.program_records[0].academic_program_id + ': "' + prerog.prerog_txns[0].note + '"'
            });
        }
        return state.data[id]
    },
    getLoadingById: (state) => (id) => {
        return state.loading[id]
    },
    getUpdateDataLoadingById: (state) => (id) => {
        return state.update_data_loading[id]
    },
    getJustification(state) {
        return state.for_action.justification
    },
    getPendingActionCount: (state) => (id) => {
        if(state.data[id]) {
            let count = 0

            state.data[id].forEach(prerog => {
                if(prerog.status == 'Approved by OCS' || prerog.status == 'Pre-Approved') {
                    count += 1
                }
            });

            return count
        }
    }
}