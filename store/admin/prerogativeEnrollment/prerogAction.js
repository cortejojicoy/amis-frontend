import Vue from "vue"

export const state = () => ({
    initialLoading: true,
    loading: false,
    data: {},
    for_action: {
        action: '',
        full_name: '',
        student_number: '',
        email: '',
        student_remarks: '',
        justification: '',
        prg_id: ''
    },
    updateTxnIndicator: 0,
})
  
export const actions = {
    async getPrerogs ({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`admins/prerogative-enrollments`, {params: 
                {
                    sais_id: payload.admin_sais_id, 
                    prg_status: ['Accepted', 'Approved'],
                    with_students: 'true',
                    prg_txn_status: 'Requested'
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

    async updateApplication({state, dispatch, commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$put(`/admins/prerogative-enrollments/${state.for_action.prg_id}`, {
                sais_id: payload.sais_id,
                status: state.for_action.action,
                justification: state.for_action.justification
            })
            await commit('alert/SUCCESS', data.message, { root: true })
            await commit('UPDATE_DATA_SUCCESS', {key: payload.index})
            await commit('UPDATE_TXN_INDICATOR')
            await commit('UNSET_FOR_ACTION')
            await dispatch('getPrerogs', payload)            
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
}
  
export const mutations = {
    GET_DATA_REQUEST (state, data) {
        state.loading = true
    },
    GET_DATA_SUCCESS (state, data) {
        state.data = data.prgs
        state.loading = false
        state.initialLoading = false
    },
    GET_DATA_FAILED (state, data) {
        state.data = data.error
    },
    UPDATE_DATA_SUCCESS (state, data) {
        state.initialLoading = true
    },
    SET_FOR_ACTION (state, data) {
        state.for_action.action = data.action
        state.for_action.full_name = data.full_name
        state.for_action.student_number = data.student_number
        state.for_action.course = data.course
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
        state.for_action.course = ''
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
    getPrerogApplications(state) {
        if(state.data) {
            state.data.forEach(prerog => {
                prerog.user.full_name = prerog.user.first_name + ' '  + prerog.user.middle_name + ' ' + prerog.user.last_name
            });
        }
        return state.data
    },

    getJustification(state) {
        return state.for_action.justification
    }
}