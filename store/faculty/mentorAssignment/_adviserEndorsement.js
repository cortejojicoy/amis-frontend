export const state = () => ({
    loading: false,
    data: [],
    advisee: [],
    updateTxnIndicator: 0
})


export const actions = {
    async getData ({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`requested-mentors`, {params: {id: sais_id}})
            await commit('GET_DATA_SUCCESS', data)
        } catch (error) {
            if(error.response.status===422) {
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
            } else {
                let errMessage = `Something went wrong while performing your request. Please contact administrator`
                await commit('alert/ERROR', errMessage, { root: true })
            }
            commit('GET_DATA_FAILED', error)
        }
    },

    async getAdvisee ({ commit }, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`faculties/${sais_id}/advisees`)
            await commit('GET_ADVISEE_SUCCESS', data)
        } catch (error) {
            if(error.response.status===422) {
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
            } else {
                let errMessage = `Something went wrong while performing your request. Please contact administrator`
                await commit('alert/ERROR', errMessage, { root: true })
            }
            commit('GET_DATA_FAILED', error)
        }
    },

    async endorse ({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let mentor = payload.data.map((item) => {
                if(payload.sais_id == item.mentor_id) {
                    return {
                        actions: item.actions, 
                        mentor_id: item.mentor_id,
                        mentor_name: item.mentor_name,  
                        mentor_role: item.mentor_role,  
                        student_sais_id: item.student_sais_id,  
                        committed_by: item.committed_by,  
                    } 
                }
            })
            // console.log(mentor)
            const data = await this.$axios.$post(`faculties/adviser-endorse`, mentor)
            await commit('GET_ENDORSE_SUCCESS', data)
            await commit('alert/SUCCESS', 'Successfully Endorsed', { root: true })
            commit('UPDATE_TXN_INDICATOR')
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

    async reject({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let mentor = payload.data.map((item) => {
                if(payload.sais_id == item.mentor_id) {
                    console.log(item)
                    return {
                        actions: item.actions, 
                        mentor_id: item.mentor_id,
                        mentor_name: item.mentor_name,  
                        mentor_role: item.mentor_role,  
                        student_sais_id: item.student_sais_id,  
                        committed_by: item.committed_by,
                        remarks: payload.text
                    }
                }
            })
            // console.log(mentor)
            const data = await this.$axios.$post(`/faculties/adviser-reject`, mentor)
            await commit('GET_REQUESTED_SUCCESS', data)
            await commit('alert/SUCCESS', 'Successfully Rejected', { root: true })
            commit('UPDATE_TXN_INDICATOR')
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
    }
}


export const mutations = {
    GET_DATA_REQUEST (state) {
        state.loading = true
      },
    GET_DATA_SUCCESS (state, data) {
        state.data = data
        state.loading = false
    },
    GET_ADVISEE_SUCCESS (state, data) {
        state.advisee = data
        state.loading = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    UPDATE_TXN_INDICATOR (state) {
        state.updateTxnIndicator++
    },
    DELETE_ROW (state, id) {
        state.data.requested_mentors = state.data.requested_mentors.filter(function(el){
            return el.id!==id;
        })
    },
}

export const getters = {
    getRequested(state) {
        if(state.data.requested_mentors) {
            return state.data.requested_mentors.map((item) => {
                return Object.assign({}, item)
            })
        }
    },

    getAdvisee(state) {
        if(state.advisee.advisee) {
            return state.advisee.advisee.map((item) => {
                return Object.assign({}, item)
            })
        }
    }
}