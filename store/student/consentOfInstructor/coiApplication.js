export const state = () => ({
    loading: false,
    courses: [],
    sections: [],
    toStore: {
        class_id: '',
        justification: '',
    }
})
  
export const actions = {
    async getCourses ({ dispatch, commit }) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/course-offerings`)
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
            const data = await this.$axios.$post(`/course-offerings/get-sections`, payload.course)
            await commit('GET_SECTIONS_SUCCESS', data)
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
    async setDetails ({dispatch, commit}, payload) {
        commit('GET_DATA_REQUEST')
        commit('SET_CLASS_ID', payload.class_id)
    }
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
        state.sections = data.sections
        state.loading = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    SET_CLASS_ID (state, class_id) {
        state.toStore.class_id = class_id
        state.loading = false
    }
}

export const getters = {
    getClassDetails(state) {
        let faculty = '';
        let descr = '';

        if(state.toStore.class_id != '') {
            state.sections.forEach(section => {
                if(section.class_nbr == state.toStore.class_id) {
                    faculty = section.name.toUpperCase()
                    descr = section.descr
                }
            });
        }
        return {faculty: faculty, descr: descr}
    }
}