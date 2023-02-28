import Vue from "vue"

export const state = () => ({
    initialLoad: true,
    loading: false,
    numOfItems: 5,
    data: [],
    facultyList: [],
    headers: [],
    filters: {},
    adviseeData: [],
    filterValues: [],
    mentorRoles: {},
    mentorAssignment: {},
    closeModal: {},
    requestData: {},
    facultyInfo: {},
    facultyInfoTrigger: 0,
    studInfo: {
        name: '',
        program: '',
        status: '',
        email: ''
    },
})

export const actions = {
    async getData ({ state, commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload.data, state.filterValues)
            // console.log(payload.data)
            // const data = await this.$axios.$get(`/mentor-assignments`, {params: tableParams})
            const data = await this.$axios.$get(`/${payload.link}`, {params: tableParams})
            await commit('GET_DATA_SUCCESS', data.ma)
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

    async getFilters({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`mentor-assignments`, {params: payload.data})
            // console.log(data)
            await commit('GET_FILTER_SUCCESS', {key: payload.data.column_name, filter:data.ma})
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

    async getUserInfo({commit}, payload) {
        commit('GET_STUDENT_REQUEST')
        try{
            let userParams = Object.assign(payload.data)
            if(userParams.student_information == true) {
                const data = await this.$axios.$get(`/users`, {params: userParams})
                await commit('GET_STUDENT_INFO', data.users)
            } else {
                const data = await this.$axios.$get(`/users`, {params: userParams})
                await commit('GET_FACULTY_INFO', data.users)
            }
            // console.log(userParams)
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

    async getFaculty({commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/faculties`, {params: {faculty_list: true}})
            // console.log(data)
            await commit('GET_APPOINTMENT_SUCCESS', data.ma)
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

    async getMentorRole({commit}) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/mentor-roles`)
            await commit('GET_MENTOR_ROLES', data.ma)
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
    GET_STUDENT_REQUEST(state) {
        state.loading = false
    },

    GET_DATA_SUCCESS(state, data) {
        // console.log(data)
        state.data = data
        state.loading = false
        state.initialLoad = false
        // state.requestData = data
    },
    GET_FILTER_SUCCESS (state, data) {
        Vue.set(state.filters, data.key, data.filter)
        // state.loading = false
    },
    
    GET_APPOINTMENT_SUCCESS(state, data) {
        if(data) {
            var facultyListData =  data.map((item) => {
                // console.log(item)
                if(item.uuid != null) {
                    // let homeunit = item.appointment != null ? '('+item.appointment.homeunit+')' : ''
                    let homeunit = item.appointment != null ? item.appointment.homeunit : ''
                    let faculty_status = item.appointment != null ? item.appointment.status : ''
                    var temp = Object.assign({
                        home_unit: homeunit,
                        faculty_id: item.faculty_id,
                        faculty_status: faculty_status,
                        faculty_name: item.uuid.last_name+' '+item.uuid.first_name+' '+ homeunit
                    }) 

                    if(temp.faculty_status === 'ACTIVE') {
                        return temp
                    }
                }
            })

            state.facultyList = facultyListData
        }
    },

    FOR_SUBMIT_DATA(state, payload) {
        console.log(payload)
    },

    NOTIFICATION(state, payload) {
        if(payload.homeunit != state.studInfo.program) {
            // Vue.set(state.closeModal)
            let errMessage = `You have selected a faculty that has no appointment on you'r program`
            this.commit('alert/ERROR', errMessage, { root: true })
        }
        // this.facultyList = []
    },

    GET_FACULTY_INFO(state, data) {
        state.facultyInfo = data
    },

    GET_STUDENT_INFO(state, data) {
        // console.log(data)
        state.studInfo.name = data[0].last_name+' '+data[0].first_name
        state.studInfo.program = data[0].student_uuid.program_records[0].academic_program_id
        state.studInfo.status = data[0].student_uuid.program_records[0].status
        state.studInfo.email = data[0].email
        state.loading = false
    },

    GET_MENTOR_ROLES(state, data) {
        let role = data.filter(x => x.id != 1)
        state.mentorRoles = role
    }, 

    UNSET_MENTOR_ROLE(state, payload) {
        if(payload != 'Add') {
            state.mentorRoles = ''
        }
    },

    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    UPDATE_NUM_OF_ITEMS(state, data) {
        state.numOfItems = data
    },
    UPDATE_FILTER_VALUES(state, data) {
        // console.log(data)
        state.filterValues = data
    }
}

export const getters = {
    getNumOfItems(state) {
        return state.numOfItems
    },

    getFacultyInfo(state) {
        return state.facultyInfo
    },

    getNotificationModal:(state) => (notifId) => {
        console.log(notifId)
        // if(payload.homeunit != state.studInfo.program) {
        //     Vue.set(state.closeModal)
        // }
    },

    getMentorRoleId:(state) => (facultyId) => {
        let roles = state.data.data.find(x => x.faculty_id === facultyId)
        
        if(roles!=null) {
            if(roles.mentor_role!=null) {
                var mentor = state.mentorRoles.find(x => x.id === roles.mentor_role.id)
                return mentor.id
            }
        }
    },

    getActiveMentor: (state) => (uuid) => {
        // console.log(state.data.data)
        if(state.data.data) {
            var activeMentor = state.data.data.map((item) => {
                // console.log(item)
                if(item.faculty.uuid != null) {
                    if(item.uuid === uuid) { 
                        var temp = {
                            mentor_status: item.status,
                            student_uuid: item.uuid,
                            mentor_name: item.faculty.uuid.last_name+' '+item.faculty.uuid.first_name,
                            mentor_role: item.mentor_role.titles,
                            role_id: item.mentor_role.id,
                            faculty_id: item.faculty_id
                        }
    
                        if(temp.mentor_status === 'ACTIVE') {
                            return temp
                        }
                    }
                }
            })

            var filterData = activeMentor.filter(function(el) {
                return el != null
            })

            return Object.assign(filterData)
        } 
    },

    getTableData: (state) => (pageName) => {
        // console.log(state.data)
        if(state.data.data) {
            var tableData = state.data.data.map((item) => {
                // console.log(item)
                if(pageName === 'my-advisee') {
                    if(item.end_date == null) {
                        if(item.status !== 'Pending' && item.status !== 'Returned' && item.status !== 'Disapproved' && item.status !== 'Approved') {
                            if(item.student_uuid != null) {
                                if(item.student_uuid.student_user != null) {
                                    return {
                                        uuid: item.uuid,
                                        name : item.student_uuid.student_user.last_name+' '+item.student_uuid.student_user.first_name,
                                        program: item.student_uuid.program_records[0].academic_program_id,
                                        student_status: item.student_uuid.program_records[0].status,
                                        role: item.status == 'Approved' ? item.mentor_role.titles : 'UNASSIGNED', 
                                        status: item.status == 'Approved' ? item.status : 'UNASSIGNED', 
                                        mentor: item.status == 'Approved' ? item.mentor_name : 'UNASSIGNED'
                                    }
                                }
                            }   
                        }
                    }
                }

                // if(pageName === 'my-advisee') {
                //     if(item.end_date == null) {
                //         if(item.status !== 'Pending' && item.status !== 'Returned' && item.status !== 'Disapproved' && item.status !== 'Approved') {
                //             if(item.student_uuid != null) {
                //                 if(item.student_uuid.student_user != null) {
                //                     return {
                //                         uuid: item.uuid,
                //                         name : item.student_uuid.student_user.last_name+' '+item.student_uuid.student_user.first_name,
                //                         program: item.student_uuid.program_records[0].academic_program_id,
                //                         student_status: item.student_uuid.program_records[0].status,
                //                         role: item.status == 'Approved' ? item.mentor_role.titles : 'UNASSIGNED', 
                //                         status: item.status == 'Approved' ? item.status : 'UNASSIGNED', 
                //                         mentor: item.status == 'Approved' ? item.mentor_name : 'UNASSIGNED'
                //                     }
                //                 }
                //             }   
                //         }
                //     }
                // }

                // else if(pageName === 'mentor-assignments') {
                //     console.log(item)
                // }
            })

            var filterData = tableData.filter(function(el) {
                return el != null 
            })

            // console.log(filterData)
            // state.mentorAssignment = filterData
            
            if(pageName === 'mentor-assignment-college') {
                const key = 'name'
                var distinctData = [...new Map(filterData.map(item => [item[key], item])).values()];
                var paginationData = {
                    last_page: state.data.last_page,
                    current_page: state.data.current_page
                }
                return Object.assign(distinctData, paginationData)
            } else {
                var paginationData = {
                    last_page: state.data.last_page,
                    current_page: state.data.current_page
                }
                return Object.assign(filterData, paginationData)
            }
        }
    },
}