export const state = () => ({
    loading: false,
    data: []
})

export const actions = {
    async getData ({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            // let q = payload.keywords
            // console.log(Object.assign(payload.keywords))
            const data = await this.$axios.$get(`/${payload.role}/${payload.link}`, {params: payload.data})
            // console.log(data)
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
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
}

export const getters = {

}