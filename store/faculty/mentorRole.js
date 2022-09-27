export const state = () => ({
    loading: false,
    data: []
})

export const actions = {
    async getData ({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            console.log(sais_id)
            const data = await this.$axios.$get(`/faculties/check-mentor-role`,{params: { id:sais_id } })
            await commit('GET_DATA_SUCCESS', data)
        } catch(error) {
            commit('GET_DATA_FAILED', error)
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
    getMentorRole (state) {
        if(state.data.mentor_role) {
            return state.data.mentor_role.map((item) => {
                return Object.assign({}, item)
            })
        }   
    }
}