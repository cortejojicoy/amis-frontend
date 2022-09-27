export const state = () => ({
    loading: false,
    data: []
})
  
  export const actions = {
    async getData ({ commit }, sais_id) {
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
    // UPDATE_DATA_REQUEST (state) {
    //   state.loading = true
    // },
    // UPDATE_DATA_SUCCESS (state, data) {
    //   state.data = data
    //   state.loading = false
    // },
    // UPDATE_DATA_FAILED (state, error) {
    //   state.data = error
    // },
    // CHANGE_ACTION_STATE(state, payload) {
    //   state.data.save_mentors[payload.id]['actions'] = payload.action
    // },
    // ADD_ROW (state) {
    //   state.data.save_mentors.push({
    //     actions:'', 
    //     mentor_name:'', 
    //     mentor_role:'', 
    //     field_represented:'', 
    //     effectivity_start:'',
    //     effectivity_end:'',
    //     id: '_'+Date.now() + Math.random()
    //   })
    // },
    // DELETE_ROW (state,id) {
    // state.data.save_mentors = state.data.save_mentors.filter(function(el){
    //   return el.id!==id;
    // })
    // },
    
  }

  export const getters = {
    getNameId(state) {
      return state.data.faculties.map((item)=>{
        return{
            sais_id: item.sais_id,
            mentor_name: item.last_name+' '+item.first_name
        }

      })
    }
  }