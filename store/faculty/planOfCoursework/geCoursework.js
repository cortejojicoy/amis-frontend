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
    async getData ({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload.data, state.filterValues)
            const data = await this.$axios.$get(`/faculties/mentors`, {params: tableParams})
            await commit('GET_MENTEES_DATA_SUCCESS', data.mentors)
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
    GET_MENTEES_DATA_SUCCESS (state, data) {
        state.data = data
        state.loading = false
        state.initialLoad = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    UPDATE_FILTER_VALUES(state, data) {
        state.filterValues = data
    },
}

export const getters = {
    getTableData(state) {
        if(state.data.data){
            console.log(state.data.data)
            var menteesData = []
            state.data.data.forEach((item) => {
                if(item.student.pcw.status == 'Submitted') {
                    var temp = {
                        student_name: item.student_user.last_name + ' ' + item.student_user.first_name,
                        degree: item.student.program_records[0].academic_program_id,
                        student_number: item.student.campus_id,
                        coursework_data: item.student.pcw.pcw_courses
                    };

                    menteesData.push(temp)
                }
            })

            var paginationData = {
                last_page: state.data.last_page,
                current_page: state.data.current_page,
            }

            menteesData = Object.assign(menteesData, paginationData)

            return menteesData
        }
    }
}