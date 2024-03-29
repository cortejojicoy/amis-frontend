<template>
    <div class="my-8">
        <div class="flex items-center mb-4">
            <div class="text-2xl font-bold">
                Application
            </div>
            <CircSpinner :isLoading="coursesLoading"/>
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
                    Status
                </div>
                <div class="px-2 py-3 md:h-24 md:flex md:items-center text-center font-bold" :class="{'text-red-500': classDetails.class_status != 'OPEN', 'text-green-600': classDetails.class_status == 'OPEN'}">
                    {{classDetails.class_status}}
                </div>
            </div>
            <div>
                <div class="px-2 py-3 font-bold md:text-center">
                    Remarks/Appeal
                </div>
                <div class="px-2 py-3">
                    <textarea v-model="justification" placeholder="limit to 500 characters" class="w-full border border-gray-400 rounded p-1 md:w-38" type="text" rows="2" maxlength="500"></textarea>
                </div>
            </div>
            <div>
                <div class="px-2 py-3 font-bold md:text-center">
                    Action
                </div>
                <div class="px-2 py-3 md:h-24 md:flex md:items-center">
                    <button v-if="classDetails.class_status != 'CLOSED BY FIC'" @click="openModal()" class="bg-green-500 text-white p-2 rounded w-full" :class="{'opacity-60 cursor-not-allowed': !$config.PREROG_ENABLED}" :disabled="!$config.PREROG_ENABLED">
                        Apply
                    </button>
                    <div v-else class="italic">
                        Unavailable
                    </div>
                </div>
            </div>
        </div>

        <VTailwindModal v-model="show">
            <template v-slot:title>Conditions for Prerog Application</template>
            <template v-slot:content>
                <div>
                    I hereby pledge to abide by all rules on self-advising issued to me by my College Secretary and the Registrar. I am aware that my violation thereof will subject me to disciplinary action. Furthermore, all courses above are within my curriculum or approved Plan of Coursework or has been recommended by my adviser.
                </div>
            </template>
            <template v-slot:buttons>
                <div>
                    <button @click="applyPrerog" class="bg-green-500 text-white p-2 rounded mr-2">
                        Accept Conditions and Apply
                    </button>      
                    <button @click="cancel" class="bg-red-500 text-white p-2 rounded mr-2">
                        Cancel
                    </button>
                </div>
            </template>
        </VTailwindModal>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import 'vue-select/dist/vue-select.css';
import CircSpinner from './CircSpinner.vue';
import VTailwindModal from "./VTailwindModal.vue";


export default {
    data: () => ({
        show: false
    }),
    components: {
        CircSpinner,
        VTailwindModal
    },
    computed: {
        ...mapState({
            updateTxnIndicator: state => state.student.prerogativeEnrollment.prerogApplication.updateTxnIndicator,
            updateSummaryIndicator: state => state.student.prerogativeEnrollment.prerogApplication.updateSummaryIndicator,
            courses: state => state.student.prerogativeEnrollment.prerogApplication.courses,
            sections: state => state.student.prerogativeEnrollment.prerogApplication.sections,
            coursesLoading: state => state.student.prerogativeEnrollment.prerogApplication.loading,
        }),
        ...mapGetters({
            classDetails: "student/prerogativeEnrollment/prerogApplication/getClassDetails",
            getJustification: "student/prerogativeEnrollment/prerogApplication/getJustification"
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
            getCoursesData: 'student/prerogativeEnrollment/prerogApplication/getCourses',
            getSectionsData: 'student/prerogativeEnrollment/prerogApplication/getSections',
            apply: 'student/prerogativeEnrollment/prerogApplication/apply',
            setDetails: 'student/prerogativeEnrollment/prerogApplication/setDetails'
        }),
        ...mapMutations({
            updateJustification: 'student/prerogativeEnrollment/prerogApplication/UPDATE_JUSTIFICATION'
        }),
        chooseCourse(value) {
            this.getSectionsData({
                course: value
            })
        },
        chooseSection(value) {
            this.setDetails({
                class_id: value
            })
        },
        applyPrerog() {
            if(this.$config.PREROG_ENABLED) {
                this.apply()
            }
            this.show = false
        },
        openModal() {
            this.show = true
        },
        cancel() {
            this.show = false
        }
    },
    watch: {
        updateTxnIndicator(newVal, oldVal) {
            this.$emit('onUpdateTxn')
        },
        updateSummaryIndicator(newVal, oldVal) {
            this.$emit('onUpdateSummary')
        }
    }
}
</script>