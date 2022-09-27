export const state = () => ({
    loading: false,
    data: [],
    faculties: {},
    nominated: [],
    nominees: [],
    mentorRoles: [],
    postId: [],
    updateTxnIndicator: 0,
    numOfItems: 5,
})

export const actions = {
    async getData({commit}) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/faculties/faculty-details`)
            await commit('GET_DATA_SUCCESS', data)
        } catch (error) {
            commit('GET_DATA_FAILED', error)
        }
    },

    async getStudentData ({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`faculties/nominees`, {params: {id: sais_id}})
            await commit('GET_REQUESTED_MENTORS', data)
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

    async getNominatedFaculty ({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
          const data = await this.$axios.$get(`faculties/${sais_id}/nominated-faculties`)
          await commit('GET_NOMINATED_SUCCESS', data)
          commit('UPDATE_TXN_INDICATOR');
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

    async checkMentorRoles ({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/faculties/check-mentor-role`,{params: { id:sais_id } })
            await commit('GET_MENTORROLES_SUCCESS', data)
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
    GET_SEARCH_SUCCESS (state, data) {
        state.faculties = data
        state.loading = false
    },
    GET_REQUESTED_MENTORS(state, data) {
        state.nominees = data
    },
    GET_SEARCH_FAILED (state, error) {
        state.faculties = error
    },
    GET_NOMINATED_SUCCESS (state, data) {
        state.nominated = data
        state.loading = false
    },
    GET_NOMINATED_FAILED (state, error) {
        state.nominated = error
    },
    GET_MENTORROLES_SUCCESS (state, data) {
        state.mentorRoles = data
        state.loading = false
    },
    GET_MENTORROLES_FAILED (state, error) {
        state.mentorRoles = error
    },
    UPDATE_TXN_INDICATOR (state) {
        state.updateTxnIndicator++
    },
    UPDATE_NUM_OF_ITEMS(state, data) {
        state.numOfItems = data
    },
}

export const getters = {
    getFacultyName (state) {
        return state.data.faculty_data.map((item) => {
            return {
                sais_id: item.sais_id,
                mentor_name: item.last_name+' '+item.first_name,
            }
        })
    },

    getNominated (state) {
        if(state.nominated.nominated_faculty) {
            return state.nominated.nominated_faculty.map((item) => {
                return Object.assign({}, item)
            })
        }
    },

    getMentorRole (state) {
        if(state.mentorRoles.mentor_role) {
            return state.mentorRoles.mentor_role.map((item) => {
                return Object.assign({}, item)
            })
        }   
    },
    getNumOfItems(state) {
        return state.numOfItems
    }

}