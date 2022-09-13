export const state = () => ({
    loading: false,
})
  
export const actions = {
    async generateData ({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const response = await this.$axios.$get(`/super_admins/${payload.module}/download`, {params: {type: payload.type, filename: payload.filename}})
            commit('alert/SUCCESS', response.filename, { root: true })
            await commit('GET_DATA_SUCCESS')
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
}
  
export const mutations = {
    GET_DATA_REQUEST (state) {
        state.loading = true
    },
    GET_DATA_SUCCESS (state) {
        state.loading = false
    },
}

export const getters = {
   
}