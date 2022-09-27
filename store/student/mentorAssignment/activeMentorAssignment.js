export const state = () => ({
    loading: false,
    updateTxnIndicator: 0,
    isModalOpen: false,
    data: [],
    toStore: {
        confirmForms: ""
    },
})

export const actions = {
    async getData ({ commit }, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            // get active mentors of users 
            const data = await this.$axios.$get(`/faculties/${sais_id}/active-mentors`)
            await commit('GET_DATA_SUCCESS', data)
            
        } catch (error) {
            commit('GET_DATA_FAILED', error)
        }
    },


    async updateActionStatus({ commit }, payload) {
        commit('UPDATE_DATA_REQUEST')
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

    async submitRequestMentors({dispatch, commit, state}, payload) {
        if(state.toStore.confirmForms == "CONFIRM") {
            commit('UPDATE_DATA_REQUEST')
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
                const data = await this.$axios.$post(`mentor-assignment`, mentors, state.toStore)
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
        }
        
    },
    checkStatus({commit}, data) {
        if (data.status == 'Error') {
            commit('alert/ERROR', data.message, { root: true })
            commit('CLOSE_MODAL')
        } else {
            commit('alert/SUCCESS', data.message, { root: true })
            commit('UPDATE_TXN_INDICATOR')
            commit('CLOSE_MODAL')
        }
        commit('CONFIRM')
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
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    UPDATE_DATA_REQUEST (state) {
        state.loading = true
    },
    UPDATE_DATA_SUCCESS (state, data) {
        state.loading = false
    },
    UPDATE_DATA_FAILED (state, error) {
        state.loading = false
    },
    UPDATE_TXN_INDICATOR (state) {
        state.updateTxnIndicator++
    },
    UPDATE_CONFIRMATION (state, confirmForms) {
        state.toStore.confirmForms = confirmForms
    },

    CLOSE_MODAL (state) {
        state.isModalOpen = true
    },

    CONFIRM (state) {
        state.loading = false
        state.toStore.confirmForms = ''
    }
}

export const getters = {
    getActiveMentors(state) {
        // console.log(state)
        return state.data.active_mentors.map((item) => {
            return {
                sais_id: item.sais_id,
                mentor_name: item.last_name+' '+item.first_name,
                mentor_role: item.mentor_role,
            }
        })
    },

    getConfirmForms(state) {
        return state.toStore.confirmForms
    }
}
  