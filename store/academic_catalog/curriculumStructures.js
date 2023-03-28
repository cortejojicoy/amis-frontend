import Vue from "vue"

export const state = () => ({
    initialLoad: true,
    loading: false,
    numOfItems: 5,
    data: {},
    course_types: [
        {name: 'REQUIRED', field_count:'required_count'},
        {name: 'ELECTIVE', field_count:'elective_count'},
        {name: 'GE ELECTIVE', field_count:'ge_elective_count'},
        {name: 'MAJOR', field_count:'major_count'},
        {name: 'COGNATE', field_count:'cognate_count'},
        {name: 'SPECIALIZED', field_count:'specialized_count'},
        {name: 'TRACK', field_count:'track_count'}
    ]
})
  
export const actions = {
    
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
    GET_DATA_FAILED (state, error) {
        state.data = error
    },
    SET_INITIAL_DATA(state, data) {
        Vue.set(state.data, data.key, data.value)
    },
}

export const getters = {
    getSemYearCourses: (state) => (id) => {
        var ccourses = []
        if(state.data[id]){
            state.data[id].curriculumCourses.map((item) => {
                if(item.year == state.data[id].curriculumDetails.year && item.sem == state.data[id].curriculumDetails.sem && item.course_type == 'REQUIRED') {
                    ccourses.push(item)
                }
            })

            for (let i = 0; i < state.course_types.length; i++) {
                if(state.course_types[i].name != 'REQUIRED') {
                    if(state.data[id].curriculumDetails[state.course_types[i].field_count] != 0) {
                        for (let perCount = 0; perCount < state.data[id].curriculumDetails[state.course_types[i].field_count]; perCount++) {
                            ccourses.push({
                                course_type: state.course_types[i].name,
                                description: 'See courses under ' + state.course_types[i].name + ' of this curriculum'
                            })
                        }
                    }
                }
            }

            return ccourses
        }
    },
    title: (state) => (id) => {
        var sem = ''
        if(state.data[id].curriculumDetails.sem == '1') {
            sem = '1st Semester'
        } else if(state.data[id].curriculumDetails.sem == '2') {
            sem = '2nd Semester'
        } else {
            sem = 'Midyear'
        }

        return 'Year ' + state.data[id].curriculumDetails.year + ' - ' + sem
    }
}