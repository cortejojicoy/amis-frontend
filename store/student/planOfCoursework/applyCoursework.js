import Vue from "vue"

export const state = () => ({
    loading: false,
    courseworkLoading: false,
    academicYearLoading: false,
    semesterLoading: false,
    courseworkLock: false,
    courseworkType: '',
    courseworkRows: {},
    courseworkData: {
        courses: [],
        years: [],
        semesters: [
            'First Semester',
            'Second Semester',
            'Midyear',
            'First Trimester',
            'Second Trimester',
            'Third Trimester'
        ]
    }
})
  
export const actions = {
    async getAY ({ commit }) {
        commit('GET_AY_REQUEST')
        try {
            const data = await this.$axios.$get(`/student-terms`, {params: {fields:['ay'], distinct: 'true', column_name: 'ay', order_type: 'desc', order_field: 'ay'}})
            await commit('GET_AY_SUCCESS', data.student_terms)
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
    getUnits({state, commit}, payload) {
        state.courseworkData.courses.forEach(curriculum_course => {
            if(curriculum_course.course.course_id == payload.course_id) {
                payload.value = curriculum_course.course.units
            }
        });

        commit('SET_COURSEWORK_DATA', payload)
    },
    async submitCoursework ({ commit, state }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$post(`students/plan-of-courseworks`, {courseworks: state.courseworkRows, action: payload.action, type: state.courseworkType})
            commit('alert/SUCCESS', data.message, { root: true })
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
                commit('APPLY_COI')
            } else {
                let errMessage = `Something went wrong while performing your request. Please contact administrator`
                await commit('alert/ERROR', errMessage, { root: true })
            }
            commit('GET_DATA_FAILED', error)
        }
    },
    async getActiveCourseworks ({ dispatch, commit, state }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/students/plan-of-courseworks`, {params: {
                sais_id: payload.sais_id,
                type: state.courseworkType,
                status: ['Submitted', 'Draft', 'Endorsed', 'Approved']
            }})
            await dispatch('processCoursework', data.pcws)
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
    processCoursework({commit, state}, courseworks) {
        if(courseworks[0].status != 'Draft') {
            commit('UPDATE_COURSEWORK_LOCK', true)
        }

        for (let index = 0; index < courseworks[0].pcw_courses.length; index++) {
            var pcw_course = courseworks[0].pcw_courses[index];
            
            var sem_index = (pcw_course.term_id % 10) - 1
            var sem = state.courseworkData.semesters[sem_index]

            console.log(courseworks[0])
            
            commit('SET_INITIAL_COURSEWORK_ROWS', {
                rowIndex: index,
                course_id: pcw_course.course_id,
                year: pcw_course.term.ay,
                sem: sem,
                units: pcw_course.units
            })
        }

        console.log(state.courseworkRows);
    }
}
  
export const mutations = {
    SET_INITIAL_DATA(state, data) {
        state.courseworkData.courses = data.courses
        state.courseworkType = data.courseworkType
    },
    SET_INITIAL_COURSEWORK_ROWS(state, data) {
        state.courseworkRows[data.rowIndex].course_code = data.course_id
        state.courseworkRows[data.rowIndex].year = data.year
        state.courseworkRows[data.rowIndex].sem = data.sem
        state.courseworkRows[data.rowIndex].units = data.units
    },
    CREATE_COURSEWORK_ROWS(state, data) {
        Vue.set(state.courseworkRows, data.key, data.value)
    },
    SET_COURSEWORK_DATA(state, data) {
        state.courseworkRows[data.rowIndex][data.type] = data.value
    },
    GET_AY_REQUEST(state) {
        state.academicYearLoading = true
    },
    GET_AY_SUCCESS(state, data) {
        state.academicYearLoading = false
        state.courseworkData.years = data
    },
    GET_SEMESTERS_REQUEST(state) {
        state.semesterLoading = true
    },
    GET_SEMESTERS_SUCCESS(state, data) {
        state.semesterLoading = false
        state.courseworkData.semesters = data
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    GET_DATA_REQUEST (state) {
        state.loading = true
    },
    UPDATE_COURSEWORK_LOCK(state, value) {
        state.courseworkLock = value
    }
}

export const getters = {
    getCourseworkRows(state) {
        console.log(state.courseworkRows)
        return state.courseworkRows
    },
    getCourseworkCourses(state) {
        if(state.courseworkData.courses[0]) {
            var courses = state.courseworkData.courses.reduce((result, curriculum_course) => {
                if(curriculum_course.course_type == state.courseworkType) {
                    result.push(curriculum_course.course)
                }
                return result
            }, [])

            return courses
        }
    },
    getCourseworkAY(state) {
        if(state.courseworkData.years) {
            var academic_years = state.courseworkData.years.map((term) => {
                return term.ay
            })

            return academic_years
        }
    },
    getCourseworkData(state) {
        return state.courseworkData
    },
}