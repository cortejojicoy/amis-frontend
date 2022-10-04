export const state = () => ({
    loading: false,
    data: []
})

export const actions = {
    async getData({commit}) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/faculties`)
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
    getFacultyName(state) {
        if(state.data.faculty_data) {
            return state.data.faculty_data.map((item) => {
                return {
                    sais_id: item.sais_id,
                    mentor_name: item.last_name+' '+item.first_name,
                }
            })
        }
    }
}