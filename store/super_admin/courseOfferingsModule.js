import Vue from "vue"

export const state = () => ({
    initialLoad: true,
    loading: false,
    numOfItems: 5,
    data: {},
    faculties: [],
    headers: [],
    filters: {},
    filterValues: [],
    toStore: {
        course_offerings_id: '',
        institution: '',
        career: '',
        term: '',
        course_id: '',
        acad_group: '',
        acad_org: '',
        subject: '',
        catalog: '',
        course: '',
        descr: '',
        activity: '',
        component: '',
        assoc: '',
        section: '',
        start_times: '',
        end_times: '',
        times: '',
        days: '',
        facil_id: '',
        tot_enrl: '',
        cap_enrl: '',
        class_nbr: '',
        mtg_start: '',
        mtg_end: '',
        mon: '',
        tues: '',
        wed: '',
        thurs: '',
        fri: '',
        sat: '',
        sun: '',
        id: '',
        name: '',
        email: '',
        consent: '',
        offer_nbr: '',
        topic_id: '',
        class_type: ''
    }
})
  
export const actions = {
    async getData ({ state, commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            let tableParams = Object.assign(payload.data, state.filterValues)
            const data = await this.$axios.$get(`super_admins/course-offerings`, {params: tableParams})
            await commit('GET_DATA_SUCCESS', data.course_offerings)
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
            const data = await this.$axios.$get(`super_admins/course-offerings`, {params: payload.data})
            await commit('GET_FILTER_SUCCESS', {key: payload.data.column_name, filter:data.course_offerings})
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
    async getFacultiesData ({ state, commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`faculties`, {params: payload.data})
            await commit('GET_FACULTIES_SUCCESS', data.faculties)
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
    async editCourseOffering ({ commit, dispatch, state }, payload) {
        if(await dispatch('checkToStore')) {
            commit('GET_DATA_REQUEST')
            try {
                const data = await this.$axios.$put(`super_admins/course-offerings/${state.toStore.course_offerings_id}`, state.toStore)
                commit('alert/SUCCESS', data.message, { root: true })
                dispatch('getData', payload)
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
                } else if(error.response.status===400) {
                    await commit('alert/ERROR', error.response.data.message, { root: true })
                } else {
                    let errMessage = `Something went wrong while performing your request. Please contact administrator`
                    await commit('alert/ERROR', errMessage, { root: true })
                }
                commit('GET_DATA_FAILED', error)
            }
        }
    },
    async createCourseOffering ({ commit, dispatch, state }, payload) {
        if(await dispatch('checkToStore')) {
            commit('GET_DATA_REQUEST')
            try {
                const data = await this.$axios.$post(`super_admins/course-offerings`, state.toStore)
                commit('alert/SUCCESS', data.message, { root: true })
                dispatch('getData', payload)
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
                } else if(error.response.status===400) {
                    await commit('alert/ERROR', error.response.data.message, { root: true })
                } else {
                    let errMessage = `Something went wrong while performing your request. Please contact administrator`
                    await commit('alert/ERROR', errMessage, { root: true })
                }
                commit('GET_DATA_FAILED', error)
            }
        }
    },
    async deleteCourseOffering ({ commit, dispatch, state }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$delete(`super_admins/course-offerings/${state.toStore.course_offerings_id}`)
            commit('alert/SUCCESS', data.message, { root: true })
            dispatch('getData', payload)
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
            } else if(error.response.status===400) {
                await commit('alert/ERROR', error.response.data.message, { root: true })
            } else {
                let errMessage = `Something went wrong while performing your request. Please contact administrator`
                await commit('alert/ERROR', errMessage, { root: true })
            }
            commit('GET_DATA_FAILED', error)
        }
    },
    async checkToStore({state, commit}) {
        if(state.toStore.tag_name == '') {
            commit('alert/ERROR', "Please type in a permission name.", { root: true })
            return false
        } else if(state.toStore.reference_model == '') {
            commit('alert/ERROR', "Reference model is required.", { root: true })
            return false
        } else if(state.toStore.reference_field == '') {
            commit('alert/ERROR', "Reference field is required.", { root: true })
            return false
        } else if(state.toStore.reference_value == '') {
            commit('alert/ERROR', "Reference value is required.", { root: true })
            return false
        } else if(state.toStore.reference_type == '') {
            commit('alert/ERROR', "Reference type is required.", { root: true })
            return false
        } else if (state.toStore.reference_operation == '') {
            commit('alert/ERROR', "Reference operation is required.", { root: true })
            return false
        } else {
            return true
        }
    }
}
  
export const mutations = {
    GET_DATA_REQUEST (state) {
        state.loading = true
    },
    GET_DATA_SUCCESS(state, data) {
        state.data = data
        state.loading = false
        state.initialLoad = false
    },
    GET_FACULTIES_SUCCESS(state, data) {
        state.faculties = data
    },
    GET_FILTER_SUCCESS (state, data) {
        Vue.set(state.filters, data.key, data.filter)
    },
    GET_DATA_FAILED (state, error) {
        state.loading = false
    },
    UPDATE_NUM_OF_ITEMS(state, data) {
        state.numOfItems = data
    },
    UPDATE_FILTER_VALUES(state, data) {
        state.filterValues = data
    },
    SET_INITIAL_VALUES(state, data) {
        state.toStore = data
    },
    UPDATE_INSTITUTION(state, institution) {
        state.toStore.institution = institution
    },
    UPDATE_CAREER(state, career) {
        state.toStore.career = career
    },
    UPDATE_TERM(state, term) {
        state.toStore.term = term
    },
    UPDATE_COURSE_ID(state, course_id) {
        state.toStore.course_id = course_id
    },
    UPDATE_ACAD_ORG(state, acad_org) {
        state.toStore.acad_org = acad_org
    },
    UPDATE_ACAD_GROUP(state, acad_group) {
        state.toStore.acad_group = acad_group
    },
    UPDATE_SUBJECT(state, subject) {
        state.toStore.subject = subject
    },
    UPDATE_CATALOG(state, catalog) {
        state.toStore.catalog = catalog
    },
    UPDATE_DESCR(state, descr) {
        state.toStore.descr = descr
    },
    UPDATE_COMPONENT(state, component) {
        state.toStore.component = component
    },
    UPDATE_SECTION(state, section) {
        state.toStore.section = section
    },
    UPDATE_CLASS_NBR(state, class_nbr) {
        state.toStore.class_nbr = class_nbr
    },
    // UPDATE_START_TIMES(state, start_times) {
    //     state.toStore.start_times = start_times
    // },
    // UPDATE_END_TIMES(state, end_times) {
    //     state.toStore.end_times = end_times
    // },
    UPDATE_TIMES(state, times) {
        state.toStore.times = times
    },
    UPDATE_DAYS(state, days) {
        state.toStore.days = days
    },
    UPDATE_ASSOC(state, assoc) {
        state.toStore.assoc = assoc
    },
    UPDATE_CLASS_TYPE(state, class_type) {
        state.toStore.class_type = class_type
    },
    UPDATE_ID(state, id) {
        if(id) {
            state.toStore.id = id.sais_id
            state.toStore.name = id.faculty_name
            state.toStore.email = id.email
        } else {
            state.toStore.id = ''
            state.toStore.name = ''
            state.toStore.email = ''
        }
    },
    UPDATE_CONSENT(state, consent) {
        state.toStore.consent = consent
    },
    UPDATE_OFFER_NBR(state, offer_nbr) {
        state.toStore.offer_nbr = offer_nbr
    },
    UPDATE_TOPIC_ID(state, topic_id) {
        state.toStore.topic_id = topic_id
    },
}

export const getters = {
    getNumOfItems(state) {
        return state.numOfItems
    },
    getTableData(state) {
        if(state.data.data){
            var courseOfferingsData = state.data.data.map((item) => {
                var temp = {
                    course_offerings_id: item.course_offerings_id,
                    institution: item.institution,
                    career: item.career,
                    acad_group: item.acad_group,
                    acad_org: item.acad_org,
                    subject: item.subject,
                    catalog: item.catalog,
                    component: item.component,
                    course_id: item.course_id,
                    course: item.course,
                    descr: item.descr,
                    section: item.section,
                    times: item.times,
                    days: item.days,
                    assoc: item.assoc,
                    class_nbr: item.class_nbr,
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    consent: item.consent,
                    offer_nbr: item.offer_nbr,
                    topic_id: item.topic_id,
                    class_type: item.class_type
                };
                return temp
            })

            var paginationData = {
                last_page: state.data.last_page,
                current_page: state.data.current_page,
            }

            courseOfferingsData = Object.assign(courseOfferingsData, paginationData)

            return courseOfferingsData
        }
    },
    getToStore(state) {
        return state.toStore
    },
    getComponents(state) {
        if(state.filters['component']) {
            var components =  state.filters['component'].map((item) => {
                return item.component
            })
        }

        return components
    },
    getFaculties(state) {
        if(Object.keys(state.faculties).length != 0) {
            var faculties = [] 
            state.faculties.forEach(item => {
                if(item.user) {
                    var temp = {
                        sais_id: item.sais_id,
                        faculty_name: item.user.last_name + ', ' + item.user.first_name + ', ' + item.user.middle_name,
                        email: item.user.email
                    }

                    faculties.push(temp)
                }
            })

            return faculties
        }
    }
}