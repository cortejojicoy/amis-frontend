export const state = () => ({
    loading: false,
    data: []
})
  
export const actions = {
    async getClasses ({ dispatch, commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/course-offerings`, {params: 
                {
                    id: payload.faculty_sais_id, 
                    fields:[
                        'class_nbr', 
                        'section', 
                        'course', 
                        'days', 
                        'times'
                    ], 
                    order_type:'asc', 
                    order_field: 'class_nbr',
                    with_cois: 'true',
                    coi_status: 'Requested',
                    coi_txn_status: 'Requested',
                    consent: 'I'
                }})
            await commit('GET_DATA_SUCCESS', data)
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
    classDetails(state) {
        if(state.data.courses){
          return state.data.courses.map((item)=>{
            var name = item.course + ' ' + item.section + ' ' + item.days + ' ' + item.times
            var temp = {
                name: name, 
                id: item.class_nbr,
                cois: item.cois
            };
            return temp
          })
        }
    }
}