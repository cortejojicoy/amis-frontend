export const state = () => ({
    loading: false,
    activeMentor: []
})


export const actions = {
    async getData ({commit}, sais_id) {
        commit('GET_DATA_REQUEST')
        try {
            // get active mentors of users 
            const data = await this.$axios.$get(`/student-details`, {params: {sais_id: sais_id}})
            console.log(data)
            await commit('GET_DATA_SUCCESS', {results: data.stud_active_mentor})
            // await commit('GET_DATA_SUCCESS', data)
            
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
        state.activeMentor = data.results
        state.loading = false
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
}


export const getters = {
    getStudActiveMentor(state) {
        let mentorName = ''
        let mentorRoles = ''
        if(state.activeMentor) {
            state.activeMentor.map((item) => {
                if(item != '') {
                    mentorName = item.faculty[0].uuid.last_name+' '+item.faculty[0].uuid.first_name
                    mentorRoles = item.mentor_role.titles
                }
            })
        }

        return {mentorName: mentorName, mentorRoles: mentorRoles}
    }
}