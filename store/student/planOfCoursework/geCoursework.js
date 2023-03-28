import Vue from "vue"

export const state = () => ({
    loading: false,
    curriculumDataLoading: false,
    studentData: {},
    courseworkData: {
        courses: [
            {
                course_id: 1,
                course_code: "CMSC 100",
                title: "Web Programming"
            }
        ],
        years: [
            '2019-2020',
            '2020-2021',
            '2021-2022',
            '2022-2023',
            '2024-2025',
        ],
        semesters: [
            '1st Semester',
            '2nd Semester',
            'Midyear'
        ]
    }
})
  
export const actions = {
    async getStudentCurriculumData ({ commit }, payload) {
        commit('GET_DATA_REQUEST')
        try {
            const data = await this.$axios.$get(`/students/${payload.sais_id}`, {params: {curriculum_data: true, program_record_status: 'ACTIVE'}})
            await commit('GET_CURRICULUM_SUCCESS', data)
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
    GET_CURRICULUM_SUCCESS (state, data) {
        state.studentData = data.student
        state.loading = false
        console.log(state.studentData)
    },
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
}

export const getters = {
    getGEElectivesCount(state) {
        if(state.studentData.program_records) {
            var curriculum_structures = state.studentData.program_records[0].curriculum.curriculum_structures
            
            var geElectivesCount = 0
            
            curriculum_structures.map((cs) => {
                geElectivesCount += cs.ge_elective_count
            })
        }

        return geElectivesCount
    },
    getCurriculumCourses(state) {
        if(state.studentData.program_records) {
            var curriculum_courses = state.studentData.program_records[0].curriculum.curriculum_courses
            
            return curriculum_courses
        }
    },
    getCurriculumStructures(state) {
        if(state.studentData.program_records) {
            var curriculum_structures = state.studentData.program_records[0].curriculum.curriculum_structures
            
            return curriculum_structures
        }
    }
}