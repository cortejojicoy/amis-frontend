export const state = () => ({
    loading: false,
    data: []
  })
  
  export const actions = {
    async getData ({ commit }, sais_id) {
      commit('GET_DATA_REQUEST')
      try {
        const data = await this.$axios.$get(`/students/programs/${sais_id}`)
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