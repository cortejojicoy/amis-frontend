export const state = () => ({
    data: []
})

export const actions = {
    async getData({commit}) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/admins/check-tags`)
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
    getTags(state) {
        if(state.data.admin) {
            return state.data.admin.map((item) => {
                return Object.assign({}, item)
            })
        }
    }
}