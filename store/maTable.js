import Vue from "vue"
export const state = () => ({
    loading: false,
    initialLoad: false,
    numOfItems: 5,
    show: false,
    data: [],
    studentData: {},
    updateDrawer: 0,
    filters: {},
    filterValues: {},
    approvalStatus: {},
    adminTags: {},
    searchData: {},
    searchKeywords: {},
})

export const actions = {
    async getData ({state, commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let maParams = Object.assign(payload.data, state.filterValues, state.searchKeywords)
            const data = await this.$axios.$get(`/${payload.role}/${payload.link}`, {params: maParams})
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

    async getFilters ({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            // console.log(payload.data)
            const data = await this.$axios.$get(`/${payload.role}/${payload.link}`, {params: payload.data})
            await commit('GET_FILTER_SUCCESS', {key: payload.data.column_name, filter:data.ma})
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

    async getSearch({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/${payload.role}/${payload.link}`, {params: {keywords: payload.keywords}})
            await commit('GET_SEARCH_SUCCESS', {searchResults: data})
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

    async checkTags({commit}) {
        commit('GET_DATA_REQUEST')
        try {
            // console.log(payload.data)
            const data = await this.$axios.$get(`/check-tags`)
            await commit('GET_TAGS_SUCCESS', {tagResults: data.tags})
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
        state.initialLoad = false
    },
    UPDATE_STUDENT_INFO (state, data) {
        state.studentData = data
    },
    UPDATE_NUM_OF_ITEMS(state, data) {
        state.numOfItems = data
    },
    UPDATE_FILTER_VALUES(state, data) {
        state.filterValues = data
        // console.log(state.filterValues)
    },

    UPDATE_SEARCH_VALUES(state, data) {
        // state.searchKeywords = data
        console.log(data)
        // state.search = data.updateResults
        // console.log(data.updateResults)
    },

    GET_SEARCH_SUCCESS(state, data) {
        // state.data = data
        // Vue.set(state.searchData, data.key, data.searchResults)
        state.searchData = data.searchResults
        state.loading = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    GET_FILTER_SUCCESS (state, data) {
        Vue.set(state.filters, data.key, data.filter)
        state.loading = false
    },
    OPEN_DRAWER (state, drawer) {
        state.show = drawer
    },
    CLOSE_DRAWER(state, id) {
        state.updateDrawer = id
    },
    GET_TAGS_SUCCESS(state, data) {
        state.adminTags = data.tagResults
    },

    SEARCH_KEYWORDS(state, data) {
        // console.log(data)
    }
}

export const getters = {
    getTableHeaders(state) {
        return state.data.keys.map((th)=>{
            return th.toUpperCase().replaceAll('_', ' ')
        })
        // console.log(state.data.keys)
        // if(state.data.keys) {
        //     return state.data.keys.map((th)=>{
        //         return th.toUpperCase().replaceAll('_', ' ')
        //     })
        // }
    },

    getNumOfItems(state) {
        return state.numOfItems
    },

    getDrawerStatus (state) {
        return state.show
    },

    getDrawer(state) {
        return state.updateDrawer
    },

    getStudent(state) {
        return state.studentData
    }
}