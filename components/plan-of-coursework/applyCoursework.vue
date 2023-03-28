<template>
    <div class="my-8">
        <div class="flex items-center mb-4">
            <div>
                <div class="text-2xl font-bold mb-4">
                    Coursework Application
                </div>
            </div>
            <CircSpinner :isLoading="false"/>
        </div>
        <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
            <table v-if="isLoading" class="table-auto w-full items-center text-center">
                <thead>
                    <tr class="font-bold">
                        <td class="px-2 py-3">Course Code</td>
                        <td class="px-2 py-3">Academic Year taken/to be taken</td>
                        <td class="px-2 py-3">Semester taken/to be taken</td>
                        <td class="px-2 py-3">Units</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in getCourseworkRows" :key="rowIndex">
                        <td class="px-2 py-3">
                            <select class="text-md w-10/12 border border-gray-400 rounded px-2 py-1" :value="row.course_code" @change="chooseOption($event.target.value, rowIndex, 'course_code')">
                                <option value="--" disabled selected>Choose a course</option>
                                <option v-for="(course, courseIndex) in getCourseworkCourses" :key="courseIndex" :value="course.course_id">{{course.course_code}} - {{course.title}}</option>
                            </select>
                        </td>
                        <td class="px-2 py-3">
                            <select class="text-md w-10/12 border border-gray-400 rounded px-2 py-1" :value="row.year" @change="chooseOption($event.target.value, rowIndex, 'year')">
                                <option value="--" disabled selected>Choose a year</option>
                                <option v-for="(year, yearIndex) in getCourseworkAY" :key="yearIndex" :value="year">{{year}}</option>
                            </select>
                        </td>
                        <td class="px-2 py-3">
                            <select class="text-md w-10/12 border border-gray-400 rounded px-2 py-1" :value="row.sem" @change="chooseOption($event.target.value, rowIndex, 'sem')">
                                <option value="--" disabled selected>Choose a semester</option>
                                <option v-for="(semester, semesterIndex) in getCourseworkData.semesters" :key="semesterIndex" :value="semester">{{semester}}</option>
                            </select>
                        </td>
                        <td class="px-2 py-3">
                            {{getCourseworkRows[rowIndex].units}}
                        </td>
                    </tr>    
                </tbody>
            </table>
            <Loader v-else :loaderType="'table'" :columnNum="4"/>
        </div>
        <div class="flex justify-end">
            <button @click="submit('Draft')" class="bg-blue-500 text-white p-2 rounded mr-2">Save</button>
            <button @click="submit('Submitted')" class="bg-green-500 text-white p-2 rounded">Submit</button>
        </div>

        <VTailwindModal v-model="show">
            <template v-slot:title>
                
            </template>
            <template v-slot:content>
                
            </template>
            <template v-slot:buttons>
                
            </template>
        </VTailwindModal>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import CircSpinner from '../CircSpinner.vue';
import Loader from "../Loader.vue";
import VTailwindModal from "../VTailwindModal.vue";

export default {
    data: () => ({
        show: false
    }),
    props: {
        courseWorkCount: {
            type: Number
        },
        courses: {
            type: Array
        },
        courseworkType: {
            type: String
        }
    },
    components: {
        Loader,
        CircSpinner,
        VTailwindModal
    },
    computed: {
        ...mapState({
            isLoading: state => state.student.planOfCoursework.applyCoursework.loading, 
        }),
        ...mapGetters({
            getCourseworkRows: "student/planOfCoursework/applyCoursework/getCourseworkRows",
            getCourseworkData: "student/planOfCoursework/applyCoursework/getCourseworkData",
            getCourseworkCourses: "student/planOfCoursework/applyCoursework/getCourseworkCourses",
            getCourseworkAY: "student/planOfCoursework/applyCoursework/getCourseworkAY",
        }),
    },
    async fetch () {
        //assign courses to the store
        this.setInitialData({
            courses: this.courses,
            courseworkType: this.courseworkType
        })
        
        //initialize empty coursework rows
        for (let i = 0; i < this.courseWorkCount; i++) {
            this.createCourseworkRows({
                key: i,
                value: {
                    "course_code": '--',
                    "year": '--',
                    "sem": '--',
                    "units": '--'
                }
            })
        }
        
        this.getAY()
        this.getActiveCourseworks({
            sais_id: this.$auth.user.sais_id
        })
    },
    methods: {
        ...mapMutations({
            createCourseworkRows: 'student/planOfCoursework/applyCoursework/CREATE_COURSEWORK_ROWS',
            setInitialData: 'student/planOfCoursework/applyCoursework/SET_INITIAL_DATA',
            setCourseworkData: 'student/planOfCoursework/applyCoursework/SET_COURSEWORK_DATA'
        }),
        ...mapActions({
            getUnits: 'student/planOfCoursework/applyCoursework/getUnits',
            getAY: 'student/planOfCoursework/applyCoursework/getAY',
            submitCoursework: 'student/planOfCoursework/applyCoursework/submitCoursework',
            getActiveCourseworks: 'student/planOfCoursework/applyCoursework/getActiveCourseworks',
        }),
        chooseOption(value, rowIndex, type) {
            this.setCourseworkData({
                value: value,
                rowIndex: rowIndex,
                type: type
            })
            if(type == 'course_code') {
                this.getUnits({
                    course_id: value,
                    rowIndex: rowIndex,
                    type: 'units'
                })
            }
        },
        submit(action) {
            this.submitCoursework({action: action})
        }
    },

}
</script>