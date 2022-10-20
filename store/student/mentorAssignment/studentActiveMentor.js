export const state = () => ({
    loading: false,
    data: []
})


export const actions = {
    async getData ({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            // get active mentors of users 
            const data = await this.$axios.$get(`/students/${sais_id}/active-mentors`)
            // console.log(data.active_mentors[0].faculty)
            await commit('GET_DATA_SUCCESS', data)
            
        } catch (error) {
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
    },
}


export const getters = {
    getActiveMentor(state) {
        if(state.data.active_mentors) {
            return state.data.active_mentors.map((item) => {
                return {
                    sais_id: item.sais_id,
                    mentor_id: item.sais_id,
                    mentor_name: item.faculty.user.last_name+' '+item.faculty.user.first_name,
                    mentor_role: item.mentor_role,
                }
            })
        }
    },
}