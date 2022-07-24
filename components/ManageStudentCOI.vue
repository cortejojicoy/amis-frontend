<template>
    <div class="my-8">
        <div class="flex items-center mb-4">
            <div class="text-2xl font-bold">
                Application
            </div>
            <CircSpinner :isLoading="coursesLoading"/>
        </div>
        <div class="text-red-500 mb-2">
            Only courses/classes with COI restriction are available in this module. Courses with no restriction, unit/department consent, courses with course pre-requisite only, and other restrictions excluding COI will not appear here. You may enroll courses with no restriction in SAIS directly.
        </div>
        <div class="bg-white shadow-xl sm:rounded-lg mb-4 flex flex-wrap lg:flex-nowrap flex-col md:flex-row md:justify-around">
            <div class="">
                <div class="px-2 py-3 font-bold text-left md:text-center">
                    Course
                </div>
                <div class="px-2 py-3 md:h-24 md:flex md:items-center w-full md:w-48">
                    <v-select class="w-full" :label="'course'" :options="courses" @input="chooseCourse"></v-select>
                </div>
            </div>
            <div>
                <div class="px-2 py-3 font-bold md:text-center">
                    Section - Day - Time
                </div>
                <div class="px-2 py-3 md:h-24 md:flex md:items-center">
                    <select class="text-md border border-gray-400 rounded p-1" @change="chooseSection($event.target.value)">
                        <option value="--" selected>Choose a section</option>
                        <option v-for="(section, sectionIndex) in sections" :key="sectionIndex" :value="section.class_nbr">{{section.section}} - {{section.days == '' ? 'TBA' : section.days}} -  {{section.times == '-' ? 'TBA' : section.times}}</option>
                    </select>
                </div>
            </div>
            <div>
                <div class="px-2 py-3 font-bold md:text-center">
                    Description
                </div>
                <div class="px-2 py-3 md:h-24 md:flex md:items-center text-center">
                    {{classDetails.descr}}
                </div>
            </div>
            <div>
                <div class="px-2 py-3 font-bold md:text-center">
                    Faculty-in-Charge
                </div>
                <div class="px-2 py-3 md:h-24 md:flex md:items-center text-center">
                    {{classDetails.faculty}}
                </div>
            </div>
            <div>
                <div class="px-2 py-3 font-bold md:text-center">
                    Remarks/Appeal
                </div>
                <div class="px-2 py-3">
                    <textarea v-model="justification" placeholder="limit to 280 characters" class="w-full border border-gray-400 rounded p-1 md:w-38" type="text" rows="2" maxlength="280"></textarea>
                </div>
            </div>
            <div>
                <div class="px-2 py-3 font-bold md:text-center">
                    Action
                </div>
                <div class="px-2 py-3 md:h-24 md:flex md:items-center">
                    <button @click="applyCOI" class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import 'vue-select/dist/vue-select.css';
import CircSpinner from './CircSpinner.vue';

export default {
    components: {
        CircSpinner
    },
    computed: {
        ...mapState({
            updateTxnIndicator: state => state.student.consentOfInstructor.coiApplication.updateTxnIndicator,
            courses: state => state.student.consentOfInstructor.coiApplication.courses,
            sections: state => state.student.consentOfInstructor.coiApplication.sections,
            coursesLoading: state => state.student.consentOfInstructor.coiApplication.loading,
        }),
        ...mapGetters({
            classDetails: "student/consentOfInstructor/coiApplication/getClassDetails",
            getJustification: "student/consentOfInstructor/coiApplication/getJustification"
        }),
        justification: {
            get() {
                return this.getJustification
            },
            set(value) {
                this.updateJustification(value)
            },
        }
    },
    async fetch () {
        this.getCoursesData()
    },
    methods: {
        ...mapActions({
            getCoursesData: 'student/consentOfInstructor/coiApplication/getCourses',
            getSectionsData: 'student/consentOfInstructor/coiApplication/getSections',
            apply: 'student/consentOfInstructor/coiApplication/apply',
            setDetails: 'student/consentOfInstructor/coiApplication/setDetails'
        }),
        ...mapMutations({
            updateJustification: 'student/consentOfInstructor/coiApplication/UPDATE_JUSTIFICATION'
        }),
        chooseCourse(value) {
            this.getSectionsData({
                course: value.course
            })
        },
        chooseSection(value) {
            this.setDetails({
                class_id: value
            })
        },
        applyCOI() {
            this.apply()
        },
    },
    watch: {
        updateTxnIndicator(newVal, oldVal) {
            this.$emit('onUpdateTxn')
        }
    }
}
</script>