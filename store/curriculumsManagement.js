import Vue from "vue"

export const state = () => ({
    initialLoad: true,
    loading: false,
    numOfItems: 5,
    data: {},
    headers: [],
    filters: {},
    filterValues: []
})
  
export const actions = {
    async getData ({ state, commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload.data, state.filterValues)
            const data = await this.$axios.$get(`/curriculums`, {params: tableParams})
            await commit('GET_DATA_SUCCESS', data.curriculums)
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
            const data = await this.$axios.$get(`/curriculums`, {params: payload.data})
            await commit('GET_FILTER_SUCCESS', {key: payload.data.column_name, filter:data.curriculums})
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
    GET_DATA_SUCCESS(state, data) {
        state.data = data
        state.loading = false
        state.initialLoad = false
    },
    GET_FILTER_SUCCESS (state, data) {
        Vue.set(state.filters, data.key, data.filter)
        // state.loading = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    UPDATE_NUM_OF_ITEMS(state, data) {
        state.numOfItems = data
    },
    UPDATE_FILTER_VALUES(state, data) {
        state.filterValues = data
    },
}

export const getters = {
    getNumOfItems(state) {
        return state.numOfItems
    },
    getTableData(state) {
        if(state.data.data){
            var curriculumsData = state.data.data.map((item) => {
                var temp = {
                    code: item.code,
                    program: item.program.title,
                    details: item
                };

                var total_units = 0

                item.curriculum_structures.forEach(cs => {
                    total_units += cs.total_units
                });

                temp.total_units = total_units

                return temp
            })

            var paginationData = {
                last_page: state.data.last_page,
                current_page: state.data.current_page,
            }

            curriculumsData = Object.assign(curriculumsData, paginationData)

            return curriculumsData
        }
    }
}