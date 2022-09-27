export const state = () => ({
    loading: false,
    data: [],
    tags: [],
    mentorRoles: [],
    endorsed: [],
    approved: [],
    updateTxnIndicator: 0
})


export const actions = {
    async getData ({ commit }, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`admins/endorsed-mentors`, {params: {id: sais_id}})
            await commit('GET_DATA_SUCCESS', data)
        } catch (error) {
            commit('GET_DATA_FAILED', error)
        }
    },
    
    async approveMentor ({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try{
            let mentor = payload.data.map((item) => {
                if(payload.sais_id == item.mentor_id) {
                    return {
                        actions: item.actions, 
                        mentor_id: item.mentor_id,
                        mentor_name: item.mentor_name,  
                        mentor_role: item.mentor_role,  
                        student_sais_id: item.student_sais_id,  
                        committed_by: item.committed_by,  
                    } 
                }
            })
            // console.log(mentor)
            const data =  await this.$axios.$post(`admins/approve-mentor-assignment`, mentor)
            await commit('APPROVE_SUCCESS', data)
            await commit('alert/SUCCESS', 'Successfully Approved', { root: true })
            commit('UPDATE_TXN_INDICATOR')
        } catch(error) {
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
            commit('GET_DATA_FAILED', error)
        }
    },

    async getEndorsed ({commit}, payload) {
        commit('GET_DATA_REQUEST')
        try{
            const data = await this.$axios.$get(`/admins/endorsed-mentor-college`,{params: {
                college_tag: payload.tags[0].college
            }})
            await commit('GET_ENDORSED_SUCCESS', data)
        } catch(error) {
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
            commit('GET_DATA_FAILED', error)
        }
    },

    async reject ({commit}, payload) {
      commit('GET_DATA_REQUEST')
      try {
          let mentor = payload.data.map((item) => {
              // console.log(item)
              if(payload.sais_id == item.mentor_id) {
                  console.log(item)
                  return {
                      actions: item.actions, 
                      mentor_id: item.mentor_id,
                      mentor_name: item.mentor_name,  
                      mentor_role: item.mentor_role,  
                      student_sais_id: item.student_sais_id,  
                      committed_by: item.committed_by,
                      remarks: payload.text
                  }
              }
          })
          // console.log(mentor)
          const data = await this.$axios.$post(`/admins/unit-reject`, mentor)
          await commit('GET_REJECT_SUCCESS', data)
          await commit('alert/SUCCESS', 'Mentor has been rejected', { root: true })
          commit('UPDATE_TXN_INDICATOR')
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
          commit('GET_DATA_FAILED', error)
      }
  },

    async checkTags ({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/admins/${sais_id}/mentor-assignment-admins`)
            await commit('GET_TAGS_SUCCESS', data)
        } catch(error) {
            commit('GET_TAGS_FAILED', error)
        }
    },

    async checkMentorRoles ({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/faculties/mentor-roles`,{params: { id:sais_id } })
            await commit('GET_MENTORROLES_SUCCESS', data)
        } catch(error) {
            commit('GET_MENTORROLES_FAILED', error)
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
      GET_TAGS_SUCCESS (state, data) {
        state.tags = data
        state.loading = false
      },
      GET_TAGS_FAILED (state, error) {
        state.tags = error
      },
      GET_ENDORSED_SUCCESS (state, data) {
        state.endorsed = data
        state.loading = false
      },
      GET_ENDORSED_FAILED(state, error) {
        state.endorsed = error
      },
      GET_MENTORROLES_SUCCESS (state, data) {
        state.mentorRoles = data
        state.loading = false
      },
      GET_MENTORROLES_FAILED (state, error) {
        state.mentorRoles = error
      },
      APPROVE_SUCCESS (state, data) {
        state.approved = data
        state.loading = false
      },
      UPDATE_TXN_INDICATOR (state) {
            state.updateTxnIndicator++
        },
      DELETE_ROW (state, id) {
        state.data.endorsed_mentors = state.data.endorsed_mentors.filter(function(el){
            return el.id!==id;
        })
    },
      
}


export const getters = {
    getStudentByTags(state) {
        // console.log(state.tags.admin)
        // state.tags.admin.map((items) => {
        //     // console.log(this.$auth.user.sais_id)
        //     // console.log(items.mentor_id)
        //     if(items.mentor_id === '123123123'){
        //         return state.endorsed.endorsed_mentors.map((item) => {
        //             // return Object.assign({}, item)
        //             console.log(item)
        //         })
        //     }
            
        // })
    },

    getTags (state) {
        if(state.tags.admin) {
            return state.tags.admin.map((item) => {
                return Object.assign({}, item)
            })
        }
    },

    getStudentDetails(state) {
      if(state.endorsed.endorsed_mentor_college) {  
          return state.endorsed.endorsed_mentor_college.map((item) => {
              return Object.assign({}, item)
          })
      }
    },

    getMentors(state) {
      if(state.data.endorsed_mentors) {
        return state.data.endorsed_mentors.map((item) => {
          return Object.assign({}, item)
        })
      }
    }
}