
export const state = () => ({
    data: {},
    updateData: {}
})

export const actions = {
    async getData ({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            // const data = await this.$axios.$get(`/students/${sais_id}/saved-mentors`)
            const data = await this.$axios.$get(`/students/${payload.link}`, {
                params: {sais_id: payload.sais_id}
            })
            await commit('GET_DATA_SUCCESS', data)
            await commit('GET_UPDATE_DATA', {results:data.save_mentors})
        } catch (error) {
            commit('GET_DATA_FAILED', error)
        }
    },

    async updateNominees ({state, commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            // console.log(payload)
            // const data = await this.$axios.$post(`/students/${payload.sais_id}/nominated-mentors/collection`, payload.data)
            const data = await this.$axios.$post(`/students/${payload.link}/${payload.sais_id}`, payload.data)
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
}

export const mutations = {
    GET_UPDATE_DATA(state, data) {
        state.updateData = data.results
    }
}

export const getters = {

}