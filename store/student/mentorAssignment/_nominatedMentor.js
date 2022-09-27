export const state = () => ({
    loading: false,
    data: []
  })
  
  export const actions = {
    async getData ({ commit }, saisid) {
      commit('GET_DATA_REQUEST')
      try {
        const data = await this.$axios.$get(`/students/${saisid}/nominated-mentors`)
        await commit('GET_DATA_SUCCESS', data)
        
      } catch (error) {
        commit('GET_DATA_FAILED', error)
      }
    },
    async updateData ({ commit }, payload) {
      commit('UPDATE_DATA_REQUEST')
      try {
        const data = await this.$axios.$post(`/students/${payload.saisid}/nominated-mentors/collection`, payload.data)
        await commit('alert/SUCCESS', 'Successfully created', { root: true })
        await commit('UPDATE_DATA_SUCCESS', data)
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
        
        commit('UPDATE_DATA_FAILED', error)
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
    UPDATE_DATA_REQUEST (state) {
      state.loading = true
    },
    UPDATE_DATA_SUCCESS (state, data) {
      state.loading = false
    },
    UPDATE_DATA_FAILED (state, error) {
      state.loading = false
    },
    CHANGE_FIELD_STATE(state, payload) {
      let mentor = state.data.save_mentors.find(x => x.id === payload.id)
      mentor[payload.field] = payload.newValue
    },
    ADD_ROW (state,saisid) {
      state.data.save_mentors.push({
        actions:'', 
        actions_status: 'saved',
        mentor_name:'', 
        mentor_role:'', 
        field_represented:'', 
        effectivity_start:'',
        effectivity_end:'',
        saisid: saisid,
        id: '_'+Date.now() + Math.random()
      })
    },
    DELETE_ROW (state,id) {
    state.data.save_mentors = state.data.save_mentors.filter(function(el){
      return el.id!==id;
    })
    },
  }

  export const getters = {
    withoutTempID(state) {
      if(state.data.save_mentors){
        return state.data.save_mentors.map((item)=>{
          var temp = Object.assign({}, item);
          delete  temp.id
          return temp
        })
      }

    }
  }