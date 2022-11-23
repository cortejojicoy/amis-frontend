export const state = () => ({
    loading: false,
    data: [],
    activeMentor: {},
    studInfo: {}
})

export const actions = {
    async getData ({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/student-details`,{params: {sais_id: sais_id}})
            await commit('GET_DATA_SUCCESS', {activeMentor: data.stud_active_mentor, studentInfo: data.stud_info})
        } catch(error) {
            commit('GET_DATA_FAILED')
        }
    },
}

export const mutations = {
    GET_DATA_REQUEST (state) {
        state.loading = true
    },
    GET_DATA_SUCCESS (state, data) {
        state.activeMentor = data.activeMentor
        state.studInfo = data.studentInfo
        state.loading = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
}

export const getters = {
    
}