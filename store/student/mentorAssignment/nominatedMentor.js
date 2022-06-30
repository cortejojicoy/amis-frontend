export const state = () => ({
    loading: false,
    data: []
  })
  
  export const actions = {
    async getData ({ commit }, saisid) {
      commit('GET_DATA_REQUEST')
      try {
        const data = await this.$axios.$get(`/student/${saisid}/nominated-mentors`)
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

    CHANGE_ACTION_STATE(state, id, action) {
      state.data.saved_mentors[id]['actions'] = action
    },


    ADD_ROW (state) {
      state.data.save_mentors.push({
        actions:'', 
        mentor_name:'', 
        mentor_role:'', 
        field_represented:'', 
        effectivity_start:'',
        effectivity_end:''
      })
    }
  }