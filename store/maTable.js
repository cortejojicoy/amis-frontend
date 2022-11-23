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
    adminTags: {},
    searchData: [],
    searchKeywords: {},
})

export const actions = {
    async getData ({state, commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            // let maParams = Object.assign(payload.data, state.filterValues)
            // const data = await this.$axios.$get(`/${payload.role}/${payload.link}`, {params: {maParams}})
            const data = await this.$axios.$get(`/${payload.role}/${payload.link}`, {params: {
                data: payload.data
            }})
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
    },

    async getFilters ({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
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
            const data = await this.$axios.$get(`/${payload.role}/${payload.link}`, {params: payload.data})
            await commit('GET_SEARCH_SUCCESS', data)
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
            const data = await this.$axios.$get(`/admins/check-tags`)
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
    },

    UPDATE_SEARCH_VALUES(state, data) {
        state.data = data
    },

    GET_SEARCH_SUCCESS(state, data) {
        state.searchData = data
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
        state.adminType = data.adminType
    },

    SEARCH_KEYWORDS(state, data) {
        // console.log(data)
    }
}

export const getters = {
    getTableDetails(state) {
        console.log(state.data.ma)

        let totalPages = ''
        let currentPage = ''
        let studId = ''
        let studName = ''
        let studProgram = ''
        let studStatus = ''
        let studEmail = ''
        let mentorName = ''
        let mentorRole = ''
        let mentorStatus = ''

        if(state.data.ma != '') {
            state.data.ma.map((item) => {
                console.log(item)
                if(item.faculty[0].mentor != '') {
                    studId = item.user[0].sais_id
                    studName = item.user[0].last_name+' '+item.user[0].first_name
                    studProgram = item.student[0].program_records[0].academic_program_id
                    studStatus = item.student[0].program_records[0].status
                    studEmail = item.user[0].email
                    mentorName = item.mentor_name
                    mentorRole = item.mentor_role
                    mentorStatus = item.faculty[0].mentor[0].status
                    totalPages = item.total
                    currentPage = item.current_page
                }
            });
        }

        return {
            totalPages: totalPages,
            currentPage: currentPage,
            studId: studId,
            studName: studName,
            studProgram: studProgram,
            studStatus: studStatus,
            studEmail: studEmail,
            mentorName: mentorName,
            mentorRole: mentorRole,
            mentorStatus: mentorStatus 
        }

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