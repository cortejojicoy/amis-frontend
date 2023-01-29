import Vue from "vue"

export const state = () => ({
    initialLoad: true,
    loading: false,
    numOfItems: 5,
    data: {},
    activeData: {},
    nomineeData: {},
    headers: [],
    filters: {},
    filterValues: {},
    closeModal: {},
    updateTxnIndicator: 0,
    facultyTrigger: 0,
    tableData: {},
    remarks: '',
    facultyInfo: {},
    studInfo: {
        name: '',
        program: '',
        status: '',
        email: ''
    },
})

export const actions = {
    async getData ({ dispatch, commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload.data)
            // console.log(tableParams)
            if(payload.fetchType === 'request_mentor') {
                dispatch('getRequestMentorData', tableParams)
            } else if(payload.fetchType === 'table_data') {
                dispatch('getTableData', tableParams)
            } else {
                // no condition yet
                // console.log(tableParams)
                // const data = await this.$axios.$get(`/mentors`, {params: tableParams})
                // await commit('GET_TABLE_DATA', data.ma)
            }
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
    
    async getUserInfo({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try{
            let userParams = Object.assign(payload.data)
            if(userParams.student_information == true) {
                const data = await this.$axios.$get(`/users`, {params: userParams})
                await commit('GET_STUDENT_INFO', data.users)
            }
            // console.log(userParams)
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

    async getTableData({commit, state}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload, state.filterValues)
            const data = await this.$axios.$get(`/mentor-assignments`, {params: tableParams})
            // console.log(data)
            await commit('GET_TABLE_DATA', data.ma)
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

    async getRequestMentorData({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            // console.log(payload)
            let tableParams = Object.assign(payload)
            const data = await this.$axios.$get(`/ma`, {params: tableParams})
            await commit('GET_DATA_SUCCESS', data.ma)
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

    async getActive({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload.data)
            // console.log(tableParams)
            const data = await this.$axios.$get(`/mentors`, {params: tableParams})
            // console.log(data)
            await commit('GET_ACTIVE_SUCCESS', data.ma)
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
            // console.log(payload.data)
            const data = await this.$axios.$get(`/mentor-assignments`, {params: payload.data})
            // console.log(data)
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


    async approval({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            // console.log(payload)
            const data = await this.$axios.$put(`/ma/${payload.transactionId}`, {
                type: payload.type, roles: 'faculties', remarks: payload.remarks
            })
            await commit('APPROVAL_SUCCESS', data)
            await commit('alert/SUCCESS', data.message, { root: true })
            await commit('UPDATE_TXN_INDICATOR')
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
                commit('CLOSE_MODAL')
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

    GET_DATA_SUCCESS(state, data) {
        // console.log(data)
        state.data = data
        state.loading = false
        state.initialLoad = false
    },
    GET_FILTER_SUCCESS (state, data) {
        Vue.set(state.filters, data.key, data.filter)
        state.loading = false
    },

    GET_TABLE_DATA(state, data) {
        console.log(data.data)
        var paginationData = {
            last_page: data.last_page,
            current_page: data.current_page
        }

        state.tableData = Object.assign(data.data, paginationData)
        state.loading = false
        state.initialLoad = false
    },

    GET_STUDENT_INFO(state, data) {
        // console.log(data)
        state.studInfo.name = data[0].last_name+' '+data[0].first_name
        state.studInfo.program = data[0].student_uuid.program_records[0].academic_program_id
        state.studInfo.status = data[0].student_uuid.program_records[0].status
        state.studInfo.email = data[0].email
        state.loading = false
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

    GET_ACTIVE_SUCCESS(state, data) {
        state.activeData = data
    },

    UPDATE_TXN_INDICATOR (state) {
        state.updateTxnIndicator++
    },

    APPROVAL_SUCCESS(state) {
        state.loading = false
    },

    CLOSE_MODAL(state) {
        Vue.set(state.closeModal)
    },

    DELETE_ROW (state, id) {
        state.data.data = state.data.data.filter(function(el) {
            return el.id!==id;
        })
    },

    FACULTY_INFO(state, data) {
        console.log(data)
    },

    UPDATE_REMARKS (state, text) {
        state.remarks = text
    },

    // UNSET_STATE(state) {
    //     state.loading = false
    // },
}

export const getters = {
    getFacultyInfo(state) {
        return state.facultyInfo
    },

    getNumOfItems(state) {
        return state.numOfItems
    },

    getRemarks(state) {
        return state.remarks
    },

    getActiveMentor: (state) => (uuid) => {
        // console.log(state.activeData)
        if(state.activeData.data) {
            var activeMentor = state.activeData.data.map((item) => {
                // console.log(item)
                if(item.uuid === uuid) {
                    if(item.status === 'ACTIVE') {
                        var temp = {
                            mentor_status: item.status,
                            mentor_name: item.faculty.uuid.last_name+' '+item.faculty.uuid.first_name,
                            mentor_role: item.mentor_role.titles,
                            mentor_role_id: item.mentor_role.id,
                            faculty_id: item.faculty_id
                        }
                        
                        // console.log(temp)
                        return temp
                    }
                }
                
            })

            var filterData = activeMentor.filter(function(el) { return el != null })

            const key = 'mentor_name'
            var distinctData = [...new Map(filterData.map(item => [item[key], item])).values()];
            return distinctData
        } 
    },

    getRequestedMentor(state) {
        // console.log(state.data)
        if(state.data.data) {
            var requestData = state.data.data.map((item) => {
                // console.log(item)
                var temp = {
                    id: item.id,
                    student_uuid: item.uuid,
                    actions: item.actions,
                    mentor_name: item.faculty.uuid.last_name+' '+item.faculty.uuid.first_name,
                    roles: item.mentor_role.titles,
                    role_id: item.mentor_role.id
                }
                return temp
            })

            return requestData
        }
    }
}