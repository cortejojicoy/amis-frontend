import Vue from "vue"

export const state = () => ({
    initialLoad: true,
    loading: false,
    numOfItems: 5,
    tableHeaders: [],
    data: [],
    filters: {}
})
  
export const actions = {
    async getData ({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/${payload.role}/${payload.link}`, {params: payload.data})
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

    async getFilters({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/${payload.role}/${payload.link}`, {params: payload.data})
            await commit('GET_FILTER_SUCCESS', {key: payload.data.column_name, filter:data.txns})
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
    GET_DATA_SUCCESS (state, data) {
        state.data = data
        state.loading = false
        state.initialLoad = false
    },
    GET_FILTER_SUCCESS (state, data) {
        Vue.set(state.filters, data.key, data.filter)
        state.loading = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    UPDATE_NUM_OF_ITEMS(state, data) {
        state.numOfItems = data
    }
}

export const getters = {
    getTableHeaders(state) {
        if(state.data.keys) {
            return state.data.keys.map((th)=>{
                return th.toUpperCase().replaceAll('_', ' ')
            })
        }
    },
    getNumOfItems(state) {
        return state.numOfItems
    }
}