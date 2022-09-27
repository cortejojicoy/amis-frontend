export const state = () => ({
    loading: false,
    data: [],
    studentInfo: []
})

export const actions = {
    async getData ({commit}) {
        commit('GET_DATA_REQUEST')
        try {
            const students = await this.$axios.$get(`/students/student-details`)
            await commit('GET_DATA_SUCCESS', students)
        } catch(error) {
            commit('GET_DATA_FAILED')
        }
    },

    async getStudent({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/student-info`, {params: {
                id: sais_id
            }})
            await commit('GET_STUDENT_SUCCESS', data)
        } catch (error) {
            commit('GET_STUDENT_FAILED', error)
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
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
}

export const getters = {
    getStudentDetails(state) {
        if(state.data.student_data) {
            return state.data.student_data.map((item) => {
                return {
                    name: item.last_name+ ' '+item.first_name,
                    program: item.academic_program_id,
                    status: item.status,
                    email: item.email
                }
            })
        }
    },

    getStudentById(state) {
        if(state.studentInfo.student_info) {
            return state.studentInfo.student_info.map((item) => {
                return Object.assign({}, item)
            })
        }
    }
}