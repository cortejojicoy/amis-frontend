import Vue from "vue"

export const state = () => ({
    initialLoad: true,
    loading: false,
    numOfItems: 5,
    data: {},
    studSaveMentor: [],
    headers: [],
    filters: {},
    filterValues: [],
    confirmText: '',
    closeModal: {},
    updateTxnIndicator: 0,
    for_submit: {
        actions: '',
        mentor_name: '',
        mentor_role: ''
    }
})

export const actions = {
    // GET REQUESTS
    async getData ({ state, commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload.data, state.filterValues)
            const data = await this.$axios.$get(`/students/student-ma`, {params: tableParams})
            await commit('GET_DATA_SUCCESS', data.ma)
            await commit('GET_SAVE_MENTOR', data.ma)
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
            const data = await this.$axios.$get(`/mentors`, {params: payload.data})
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

    // POST REQUEST
    async saveRequestedMentors({ commit }, payload ) {
        commit('GET_DATA_REQUEST')
        try{
            let tableParams = Object.assign(payload)
            const data = await this.$axios.$post(`/students/save-ma`, tableParams)
            await commit('GET_SAVE_SUCCESS', data)
            commit('alert/SUCCESS', data.message, { root: true })
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

    async submitRequestedMentors({state, dispatch, commit}, payload) {
        if(state.confirmText != 'CONFIRM') {
            commit('alert/ERROR', "Please type CONFIRM", { root: true })
            commit('CLOSE_MODAL')
            commit('UNSET_STATE')
        }  else {
            commit('GET_DATA_REQUEST')
            try {
                let mentorParams = Object.assign(payload.data)
                // console.log(mentorParams)
                let tranx = mentorParams.find(x => { return x })
                // console.log(tranx)
                if(tranx.status == 'returned') {
                    dispatch('approval', tranx)
                } else {
                    // check request if reached maximum limit for mentors
                    let countMajor = mentorParams.filter(x => x.mentor_role == 2).length
                    let countMember = mentorParams.filter(x => x.mentor_role == 3).length
                    if(countMajor == 2) {
                        commit('alert/ERROR', 'You have reached maximun requirement for requesting a Major Adviser', { root: true })
                        commit('UNSET_STATE')
                    } else if(countMember == 3) {
                        commit('alert/ERROR', 'You have reached maximun requirement for requesting a Member', { root: true })
                        commit('UNSET_STATE')
                    } else {
                        const data = await this.$axios.$post(`/students/student-ma`, mentorParams)
                        await dispatch('checkStatus', data)
                    }
                }
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
                    commit('UNSET_STATE')
                } else if(error.response.status===400) {
                    await commit('alert/ERROR', error.response.data.message, { root: true })
                    commit('UNSET_STATE')
                } else {
                    let errMessage = `Something went wrong while performing your request. Please contact administrator`
                    await commit('alert/ERROR', errMessage, { root: true })
                }
                commit('GET_DATA_FAILED', error)
            }
        }
    },

    async approval({commit}, tranx) {
        commit('GET_DATA_REQUEST')
        try {
            // console.log(tranx)
            const data = await this.$axios.$put(`/mentor-assignments/${tranx.mas_id}`, {
                type: "pending", roles: "students"
            })
            await commit('APPROVAL_SUCCESS', data)
            await commit('alert/SUCCESS', data.message, { root: true })
            await commit('UPDATE_TXN_INDICATOR')
        } catch (error) {
            console.log(error)
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
    },

    checkStatus({commit}, data) {
        // console.log(data)
        if (data.status != 'Ok') {
            commit('alert/ERROR', data.message, { root: true })
            commit('UPDATE_DATA_SUCCESS', data)
            commit('CLOSE_MODAL')
            commit('UNSET_STATE')
        } else {
            commit('alert/SUCCESS', data.message, { root: true })
            commit('UPDATE_DATA_SUCCESS', data)
            commit('UPDATE_TXN_INDICATOR')
            commit('UNSET_STATE')
            commit('CLOSE_MODAL')
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
        // console.log(data)
        Vue.set(state.filters, data.key, data.filter)
        state.loading = false
    },

    GET_SAVE_MENTOR(state, data) {
        var save_mentor = data.map((item) => {
            if(item.actions_status == 'saved') {
                return {
                    status: item.status,
                    actions: item.actions,
                    actions_status : item.actions_status,
                    faculty_id : item.faculty_id,
                    mentor_name : item.mentor_name,
                    mentor_role : item.mentor_role,
                    field_represented : item.field_represented, 
                    effectivity_start : item.effectivity_start,
                    effectivity_end : item.effectivity_end,
                    uuid : item.uuid,
                    mas_id: item.mas_id,
                    id : item.id
                }
            }
        })

        save_mentor = Object.assign(save_mentor)
        var results = save_mentor.filter(function (el) {
            return el != null
        })
        // console.log(results)
        state.studSaveMentor = results
    },

    GET_SAVE_SUCCESS(state, data) {
        state.loading = false
    },

    GET_DATA_FAILED (state, error) {
        state.data = error
    },

    UPDATE_TXN_INDICATOR (state) {
        state.updateTxnIndicator++
    },

    CLOSE_MODAL(state) {
        Vue.set(state.closeModal)
        // state.closeModal = false
    },

    NOTIFICATION(state, payload) {
        console.log(payload)
        // let count = state.studSaveMentor.find(x => x.actions == 'Remove').length
        // console.log(count)
    },

    APPROVAL_SUCCESS(state) {
        state.loading = false
    },

    ACTIVE_MENTOR(state, payload) {
        // console.log(payload)
    },

    ADD_ROW(state, uuid) {
        // console.log(state)
        if(state.studSaveMentor) {
            return state.studSaveMentor.push({
                actions:'', 
                actions_status: 'saved',
                mentor_name:'', 
                mentor_role: 0, 
                field_represented:'', 
                effectivity_start:'',
                effectivity_end:'',
                faculty_id: '',
                mas_id: '',
                uuid: uuid,
                id: '_'+Date.now() + Math.random()
            })
        }
    },

    DELETE_ROW (state, id) {
        state.studSaveMentor = state.studSaveMentor.filter(function(el){
            return el.id!==id;
        })
    },

    GET_SUBMIT_DATA(state, payload) {
        console.log(payload)
    },

    CHANGE_FIELD_STATE (state, payload) {
        // console.log(payload.newValue3)
        let mentor = state.studSaveMentor.find(x => x.id === payload.id)
        // console.log(mentor)
        if(payload.field === "mentor_role") {
            mentor[payload.field] = parseInt(payload.newValue)
        } else {
            mentor[payload.field] = payload.newValue
            mentor[payload.field2] = payload.newValue2
            mentor[payload.field3] = payload.newValue3
        }
    },

    UNSET_STATE(state) {
        state.confirmText = ''
        state.closeModal = {}
        state.studSaveMentor = [],
        state.data = {},
        state.loading = false
    },

    UPDATE_DATA_SUCCESS(state, data) {
        state.loading = false
    },

    UPDATE_CONFIRMATION (state, text) {
        state.confirmText = text
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

    getConfirmText(state) {
        return state.confirmText
    },

    getWithoutId(state) {
        if(state.studSaveMentor){
          return state.studSaveMentor.map((item)=>{
            var temp = Object.assign({}, item)
            delete  temp.id
            return temp
          })
        }
    },
    
}