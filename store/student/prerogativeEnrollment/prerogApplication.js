export const state = () => ({
    loading: false,
    prerogLoading: false,
    updateTxnIndicator: 0,
    updateTxnIndicatorTwo: 0,
    updateSummaryIndicator: 0,
    courses: [],
    sections: [],
    toStore: {
        class_id: '',
        justification: '',
    },
    forAction: {
        course: '',
        section: '',
        action: '',
        prg_id: ''
    },
    prerogs: []
})
  
export const actions = {
    async getCourses ({ dispatch, commit }) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/course-offerings`, {params: {fields:['course'], distinct: 'true'}})
            await commit('GET_COURSES_SUCCESS', data)
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
    async getSections ({ dispatch, commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            if(payload.course != null) {
                const data = await this.$axios.$get(`/course-offerings`, {params: {fields:[
                    'class_nbr',
                    'section', 
                    'days', 
                    'times', 
                    'id', 
                    'name', 
                    'descr',
                    'prerog'
                ], course: payload.course.course}})
                await commit('GET_SECTIONS_SUCCESS', data)
            } else {
                let data = [];
                await commit('SET_CLASS_ID', '')
                await commit('GET_SECTIONS_SUCCESS', data)
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
    async apply ({ dispatch, commit, state }) {
        if(state.toStore.class_id == '') {
            commit('alert/ERROR', "Please choose a class and section first.", { root: true })
        } else if(state.toStore.justification == '') {
            commit('alert/ERROR', "Please include a remarks/appeal to the faculty.", { root: true })
        } else {
            commit('GET_DATA_REQUEST')
            try {
                const data = await this.$axios.$post(`students/prerogative-enrollments`, state.toStore)
                commit('alert/SUCCESS', data.message, { root: true })
                commit('UPDATE_TXN_INDICATOR')
                commit('UPDATE_SUMMARY_INDICATOR')
                commit('APPLY_PREROG')
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
                    commit('APPLY_PREROG')
                } else {
                    let errMessage = `Something went wrong while performing your request. Please contact administrator`
                    await commit('alert/ERROR', errMessage, { root: true })
                }
                commit('GET_DATA_FAILED', error)
            }
        }
    },
    async setDetails ({dispatch, commit}, payload) {
        commit('GET_DATA_REQUEST')
        commit('SET_CLASS_ID', payload.class_id)
    },
    async getPrerogApplications ({ dispatch, commit }, payload) {
        commit('GET_PREROGS_REQUEST')
        try {
            const data = await this.$axios.$get(`/students/prerogative-enrollments`, {params: {
                sais_id: payload.sais_id,
                with_course_offerings: true
            }})
            await commit('GET_PREROGS_SUCCESS', data)
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
    async cancelPrerog ({ dispatch, commit, state }, payload) {
        commit('GET_PREROGS_REQUEST')
        try {
            const data = await this.$axios.$put(`students/prerogative-enrollments/${state.forAction.prg_id}`, {
                status: state.forAction.action
            })
            commit('alert/SUCCESS', data.message, { root: true })
            commit('UPDATE_TXN_INDICATOR')
            commit('UNSET_FOR_ACTION')
            dispatch('getPrerogApplications', payload)
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
                commit('APPLY_PREROG')
            } else {
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
    GET_COURSES_SUCCESS (state, data) {
        state.courses = data.courses
        state.loading = false
    },
    GET_SECTIONS_SUCCESS (state, data) {
        state.sections = data.courses
        state.loading = false
    },
    GET_PREROGS_REQUEST (state) {
        state.prerogLoading = true
    },
    GET_PREROGS_SUCCESS (state, data) {
        state.prerogs = data.prgs
        state.prerogLoading = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    SET_CLASS_ID (state, class_id) {
        state.toStore.class_id = class_id
        state.loading = false
    },
    UPDATE_JUSTIFICATION (state, justification) {
        state.toStore.justification = justification
    },
    APPLY_PREROG (state) {
        state.loading = false
        state.toStore.class_id = ''
        state.toStore.justification = ''
        state.section = []
    },
    UPDATE_TXN_INDICATOR (state) {
        state.updateTxnIndicator++
    },
    UPDATE_SUMMARY_INDICATOR (state) {
        state.updateSummaryIndicator++
    },
    SET_FOR_ACTION (state, data) {
        state.forAction.action = data.action
        state.forAction.course = data.course
        state.forAction.section = data.section
        state.forAction.prg_id = data.prg_id
    },
    UNSET_FOR_ACTION (state) {
        state.forAction.action = ''
        state.forAction.course = ''
        state.forAction.section = ''
        state.forAction.prg_id = ''
    },
}

export const getters = {
    getClassDetails(state) {
        let faculty = ''
        let descr = ''
        let class_status = ''
        let disable_button = false

        if(state.toStore.class_id != '' && state.toStore.class_id != '--') {
            state.sections.forEach(section => {
                if(section.class_nbr == state.toStore.class_id) {
                    faculty = section.name.toUpperCase()
                    descr = section.descr
                    class_status = section.prerog ? "OPEN" : "CLOSED BY FIC"
                    disable_button = section.prerog
                }
            });
        }
        return {faculty: faculty, descr: descr, class_status: class_status, disable_button: disable_button}
    },
    getJustification(state) {
        return state.toStore.justification
    }
}