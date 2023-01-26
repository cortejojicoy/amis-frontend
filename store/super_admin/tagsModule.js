import Vue from "vue"

export const state = () => ({
    initialLoad: true,
    loading: false,
    numOfItems: 5,
    data: {},
    headers: [],
    filters: {},
    filterValues: [],
    toStore: {
        tag_id: '',
        tag_name: '',
        reference_model: '',
        reference_field: '',
        reference_value: '',
        reference_type: '',
        reference_operation: ''
    }
})
  
export const actions = {
    async getData ({ state, commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload.data, state.filterValues)
            const data = await this.$axios.$get(`super_admins/tags`, {params: tableParams})
            await commit('GET_DATA_SUCCESS', data.tags)
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
            const data = await this.$axios.$get(`super_admins/tags`, {params: payload.data})
            await commit('GET_FILTER_SUCCESS', {key: payload.data.column_name, filter:data.tags})
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
    async editTag ({ commit, dispatch, state }, payload) {
        if(await dispatch('checkToStore')) {
            commit('GET_DATA_REQUEST')
            try {
                const data = await this.$axios.$put(`super_admins/tags/${state.toStore.tag_id}`, {
                    tag_data: state.toStore
                })
                commit('alert/SUCCESS', data.message, { root: true })
                dispatch('getData', payload)
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
                } else if(error.response.status===400) {
                    await commit('alert/ERROR', error.response.data.message, { root: true })
                } else {
                    let errMessage = `Something went wrong while performing your request. Please contact administrator`
                    await commit('alert/ERROR', errMessage, { root: true })
                }
                commit('GET_DATA_FAILED', error)
            }
        }
    },
    async createTag ({ commit, dispatch, state }, payload) {
        if(await dispatch('checkToStore')) {
            commit('GET_DATA_REQUEST')
            try {
                const data = await this.$axios.$post(`super_admins/tags`, state.toStore)
                commit('alert/SUCCESS', data.message, { root: true })
                dispatch('getData', payload)
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
                } else if(error.response.status===400) {
                    await commit('alert/ERROR', error.response.data.message, { root: true })
                } else {
                    let errMessage = `Something went wrong while performing your request. Please contact administrator`
                    await commit('alert/ERROR', errMessage, { root: true })
                }
                commit('GET_DATA_FAILED', error)
            }
        }
    },
    async checkToStore({state, commit}) {
        if(state.toStore.tag_name == '') {
            commit('alert/ERROR', "Please type in a permission name.", { root: true })
            return false
        } else if(state.toStore.reference_model == '') {
            commit('alert/ERROR', "Reference model is required.", { root: true })
            return false
        } else if(state.toStore.reference_field == '') {
            commit('alert/ERROR', "Reference field is required.", { root: true })
            return false
        } else if(state.toStore.reference_value == '') {
            commit('alert/ERROR', "Reference value is required.", { root: true })
            return false
        } else if(state.toStore.reference_type == '') {
            commit('alert/ERROR', "Reference type is required.", { root: true })
            return false
        } else if (state.toStore.reference_operation == '') {
            commit('alert/ERROR', "Reference operation is required.", { root: true })
            return false
        } else {
            return true
        }
    }
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
    SET_INITIAL_VALUES(state, data) {
        state.toStore = data
    },
    UPDATE_TAG_NAME(state, tag_name) {
        state.toStore.tag_name = tag_name
    },
    UPDATE_REFERENCE_MODEL(state, reference_model) {
        state.toStore.reference_model = reference_model
    },
    UPDATE_REFERENCE_FIELD(state, reference_field) {
        state.toStore.reference_field = reference_field
    },
    UPDATE_REFERENCE_VALUE(state, reference_value) {
        state.toStore.reference_value = reference_value
    },
    UPDATE_REFERENCE_TYPE(state, reference_type) {
        state.toStore.reference_type = reference_type
    },
    UPDATE_REFERENCE_OPERATION(state, reference_operation) {
        state.toStore.reference_operation = reference_operation
    },
}

export const getters = {
    getNumOfItems(state) {
        return state.numOfItems
    },
    getTableData(state) {
        if(state.data.data){
            var tagsData = state.data.data.map((item) => {
                var temp = {
                    tag_id: item.tag_id,
                    tag_name: item.tag_name,
                    reference_model: item.reference_model,
                    reference_field: item.reference_field,
                    reference_value: item.reference_value,
                    reference_type: item.reference_type,
                    reference_operation: item.reference_operation,
                };
                return temp
            })

            var paginationData = {
                last_page: state.data.last_page,
                current_page: state.data.current_page,
            }

            tagsData = Object.assign(tagsData, paginationData)

            return tagsData
        }
    },
    getToStore(state) {
        return state.toStore
    }
}