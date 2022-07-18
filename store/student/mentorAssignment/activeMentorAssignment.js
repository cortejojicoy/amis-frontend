export const state = () => ({
    loading: false,
    data: []
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

    async submitMentors({ commit }, payload) {
        commit('SUBMIT_DATA_REQUEST')
        try {
            // update mentor status into submitted
            let mentor = payload.data.map((item) => {
                return {
                    actions: item.actions, 
                    actions_status: payload.status,
                    mentor_id: item.mentor_id,
                    mentor_name: item.mentor_name, 
                    mentor_role: item.mentor_role, 
                    field_represented: item.field_represented, 
                    effectivity_start: item.effectivity_start,
                    effectivity_end: item.effectivity_end,
                    sais_id: payload.sais_id,
                }
            })
            const data = await this.$axios.$post(`/students/${payload.sais_id}/nominated-mentors/collection`, mentor)
            await commit('SUBMIT_DATA_SUCCESS', data)
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
            commit('SUBMIT_DATA_FAILED', error)
        }
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

    SUBMIT_DATA_REQUEST (state) {
        state.loading = true;
    },

    SUBMIT_DATA_SUCCESS (state) {
        state.loading = false;
    },

    SUBMIT_DATA_FAILED (state, error) {
        state.loading = false;
    },
}

export const getters = {
    getMentors(state) {
        // console.log(state.data.active_mentors);
        return state.data.active_mentors.map((item)=>{
            return{
                sais_id: item.sais_id,
                mentor_name: item.last_name+' '+item.first_name
            }
        })
    }
}
  