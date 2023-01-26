import Vue from "vue"

export const state = () => ({
    initialLoad: true,
    loading: false,
    numOfItems: 5,
    data: {},
    activeData: {},
    studSaveMentor: [],
    headers: [],
    filters: {},
    filterValues: [],
    confirmText: '',
    closeModal: {},
    updateTxnIndicator: 0,
    remarks:''
})

export const actions = {
    async getData ({ state, commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload.data, state.filterValues)
            // console.log(tableParams)
            const data = await this.$axios.$get(`/mentor-assignments`, {params: tableParams})
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

    async getActive({state,commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload.data, state.filterValues)
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

    async approval({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try {
            // console.log(payload)
            const data = await this.$axios.$put(`/mentor-assignments/${payload.transactionId}`, {
                type: payload.type, roles: 'admins', remarks: payload.remarks
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
        state.data = data
        state.loading = false
        state.initialLoad = false
    },
    
    GET_ACTIVE_SUCCESS(state, data) {
        // console.log(data)
        state.activeData = data
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
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
        // console.log(state.data)
        state.data.data = state.data.data.filter(function(el) {
            return el.id!==id;
        })
    },
}

export const getters = {
    getRemarks(state){
        return state.remarks
    },

    getActiveMentor: (state) => (uuid) => {
        if(state.activeData.data) {
            var activeMentor = state.activeData.data.map((item) => {
                // console.log(item)
                if(item.uuid === uuid) {
                    if(item.status === 'ACTIVE') {
                        return {
                            mentor_status: item.status,
                            mentor_name: item.faculty.uuid.last_name+' '+item.faculty.uuid.first_name,
                            mentor_role: item.mentor_role.titles,
                            mentor_role_id: item.mentor_role.id,
                            faculty_id: item.faculty_id
                        }
                    }
                }
            })

            var filterData = activeMentor.filter(function(el) { return el != null })

            const key = 'mentor_name'
            var distinctData = [...new Map(filterData.map(item => [item[key], item])).values()];
            return distinctData
        } 
    },

    getRequestedMentor:(state) => (uuid) => {
        if(state.data.data) {
            var requestData = state.data.data.map((item) => {
                console.log(item)
                if(item.uuid == uuid) {
                    var temp = {
                        id: item.id,
                        student_uuid: item.uuid,
                        actions: item.actions,
                        status: item.status,
                        mentor_name: item.mentor_name,
                        roles: item.mentor_role.titles,
                        role_id: item.mentor_role.id
                    }
                    
                    if(temp.status === 'Endorsed') {
                        return temp
                    }
                } 
            })

            var filterData = requestData.filter(function(el) {
                return el != null
            })

            return Object.assign(filterData)
        }
    }
}