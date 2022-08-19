export const state = () => ({
    loading: false,
    data: {}
})
  
export const actions = {
    async getUser ({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/users/${payload.sais_id}`, {params: {program_record_status:'ACTIVE'}})
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
}
  
export const mutations = {
    GET_DATA_REQUEST (state) {
        state.loading = true
    },
    GET_DATA_SUCCESS (state, data) {
        state.data = data
        state.loading = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    }
}

export const getters = {
    getUserData(state, getters) {
        if(state.data) {
            state.data.user.full_name = state.data.user.first_name + ' '  + state.data.user.middle_name + ' ' + state.data.user.last_name

            state.data.user.gwa = getters.calculateStudentGWA(state.data.user.student.student_grades)
            state.data.user.totalUnits = getters.calculateTotalUnits(state.data.user.student.student_grades)
        }
        return state.data
    },
    calculateStudentGWA: () => (courses_taken) => {
        let totalGWA = 0
        let numOfSubjects = 0

        courses_taken.forEach(course => {
            if(course.grade != 'INC' && course.grade != 'S' && course.grade != 'U') {
                totalGWA += Number(course.grade)
                numOfSubjects += 1
            }
        });
     
        totalGWA = totalGWA / numOfSubjects

        return totalGWA
    },
    calculateTotalUnits: () => (courses_taken) => {
        let totalUnits = 0;

        courses_taken.forEach(course => {
            totalUnits += course.unit_taken
        });

        return totalUnits;
    }
}