<template>
    <div class="my-8">
        <div class="flex justify-start items-center">
            <ToggleButton :pk="classDetails.id" :value="classPrgOpen" @onToggle="updateClassPrerog"/>
            <CircSpinner :isLoading="isCourseUpdating"/>
        </div>
        <div @click="showRequests = !showRequests" class="flex items-center justify-between bg-white px-4 cursor-pointer">
            <div class="flex items-center">
                <div class="my-4 text-lg font-bold">
                    {{classDetails.name}} 
                    <span v-if="pendingCount != 0" class="bg-red-500 text-white text-xs font-normal py-1 px-2 rounded-full mx-2">
                        {{ pendingCount }}
                    </span>
                    <div class="text-sm text-gray-400 italic">(Click here to show/hide student requests)</div>
                </div>
                
                <CircSpinner :isLoading="isDataUpdating"/>
            </div>
            <div>
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    class="w-3 h-3 ml-auto transform"
                    :class="showRequests ? 'rotate-0' : '-rotate-90'"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">
                    <path
                        fill="currentColor"
                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                </svg>
            </div>
        </div>
        <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
            <table v-if="!isLoading" v-show="application && showRequests" class="table-auto w-full items-center text-center border-t-2 transform ease-in-out transition-all duration-300" :class="showRequests ? 'translate-y-0' : 'translate-y-full'">
                <thead>
                    <tr class="font-bold">
                        <td class="px-2 py-3"></td>
                        <td class="px-2 py-3 text-left">Request Details</td>
                        <td class="px-2 py-3">Action/Status</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(app, applicationIndex) in application" :key="applicationIndex">
                        <td class="px-2 py-3 text-left">
                            {{applicationIndex + 1}}
                        </td>
                        <td class="px-2 py-3 text-left">
                            <b>{{app.user.full_name}}</b>, <b>{{app.student.campus_id}}</b>, {{app.user.request_details}}
                        </td>
                        <td class="px-2 py-3">
                            <div v-if="app.status == 'Approved by OCS' || app.status == 'Pre-Approved'">
                                <button @click="openModal('approve', app.user.full_name, app.student.campus_id, app.user.email, app.prerog_txns[0].note, app.prerog_txns[0].prg_id)" class="bg-green-500 text-white p-2 rounded mb-2 disabled:opacity-60">
                                    Approve
                                </button>
                                <button @click="openModal('disapprove', app.user.full_name, app.student.campus_id, app.user.email, app.prerog_txns[0].note, app.prerog_txns[0].prg_id)" class="bg-red-500 text-white p-2 rounded disabled:opacity-60">
                                    Disapprove
                                </button>
                            </div>
                            <div class="italic" v-else>
                                {{app.status}}
                            </div>
                        </td>
                    </tr>    
                </tbody>
            </table>
            <Loader v-else :loaderType="'table'" :columnNum="2"/>
        </div>

        <VTailwindModal v-model="showModal">
            <template v-slot:title>Confirm Action</template>
            <template v-slot:content>
                <div>
                    Are you sure you want to {{for_action.action}} the following student's Prerog application in your <b>{{classDetails.name}}</b> class?

                    <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
                        <table class="table-auto w-full items-center text-center">
                            <thead>
                                <tr class="font-bold">
                                    <td class="px-2 py-3">Name</td>
                                    <td class="px-2 py-3">Student Number</td>
                                    <td class="px-2 py-3">UPMail</td>
                                    <td class="px-2 py-3">Remarks/Appeal</td>
                                </tr>
                            </thead>
                            <tr>
                                <td class="px-2 py-3">{{for_action.full_name}}</td>
                                <td class="px-2 py-3">{{for_action.student_number}}</td>
                                <td class="px-2 py-3">{{for_action.email}}</td>
                                <td class="px-2 py-3">{{for_action.student_remarks}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div v-if="for_action.action == 'disapprove'" class="w-full">
                    <label for="remarks" class="block text-sm text-gray-600">Include remarks (required):</label>
                    <input v-model="justification" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="-- Please indicate the reason for disapproval --">
                </div>
            </template>
            <template v-slot:buttons>
                <div>
                    <button v-if="for_action.action == 'approve'" @click="confirm" class="bg-green-500 text-white p-2 rounded mr-2">
                        Approve
                    </button>
                    <button v-else @click="confirm" class="bg-red-500 text-white p-2 rounded mr-2">
                        Disapprove
                    </button>          
                    <button @click="cancel" class="bg-blue-500 text-white p-2 rounded mr-2">
                        Cancel
                    </button>
                </div>
            </template>
        </VTailwindModal>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import CircSpinner from './CircSpinner.vue';
import Loader from "./Loader.vue";
import ToggleButton from "./ToggleButton.vue";
import VTailwindModal from "./VTailwindModal.vue";

export default {
    data() {
        return {
            showModal: false,
            showRequests: false,
            classPrgOpen: this.classDetails.prg_open
        };
    },
    props: {
        classDetails: {
            type: Object
        },
        index: {
            type: Number
        }
    },
    components: {
        Loader,
        CircSpinner,
        VTailwindModal,
        ToggleButton
    },
    computed: {
        ...mapState({
            for_action: state => state.faculty.prerogativeEnrollment.prerogAction.for_action,
            updateTxnIndicator: state => state.faculty.prerogativeEnrollment.prerogAction.updateTxnIndicator
        }),
        ...mapGetters({
            getApplicationById: "faculty/prerogativeEnrollment/prerogAction/getApplicationById",
            getLoadingById: "faculty/prerogativeEnrollment/prerogAction/getLoadingById",
            getUpdateDataLoadingById: "faculty/prerogativeEnrollment/prerogAction/getUpdateDataLoadingById",
            getUpdateCourseLoadingById: "faculty/prerogativeEnrollment/prerogAction/getUpdateCourseLoadingById",
            getJustification: "faculty/prerogativeEnrollment/prerogAction/getJustification",
            getPendingActionCount: "faculty/prerogativeEnrollment/prerogAction/getPendingActionCount"
        }),
        application() {
            return this.getApplicationById(this.index)
        },
        isLoading() {
            return this.getLoadingById(this.index)
        },
        isDataUpdating() {
            return this.getUpdateDataLoadingById(this.index)
        },
        isCourseUpdating() {
            return this.getUpdateCourseLoadingById(this.index)
        },
        pendingCount() {
            return this.getPendingActionCount(this.index)
        },
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
        this.setInitialApplications({
            prerog_txns: this.classDetails.prerogs,
            index: this.index 
        })
    },
    methods: {
        ...mapActions({
            updateApplication: 'faculty/prerogativeEnrollment/prerogAction/updateApplication',
            setInitialApplications: 'faculty/prerogativeEnrollment/prerogAction/setInitialApplications',
            toggleClassPrerog: 'faculty/prerogativeEnrollment/prerogAction/toggleClassPrerog'
            
        }),
        ...mapMutations({
            setForAction: 'faculty/prerogativeEnrollment/prerogAction/SET_FOR_ACTION',
            unsetForAction: 'faculty/prerogativeEnrollment/prerogAction/UNSET_FOR_ACTION',
            updateJustification: 'faculty/prerogativeEnrollment/prerogAction/UPDATE_JUSTIFICATION'
        }),
        confirm() {
            this.updateApplication({
                class_nbr: this.classDetails.id,
                sais_id: this.$auth.user.sais_id, 
                index: this.index
            });
            this.showModal = false
        },
        cancel() {
            this.unsetForAction()
            this.showModal = false
        },
        openModal($action, $full_name, $student_number, $email, $student_remarks, $prg_id) {
            this.setForAction({
                action: $action,
                full_name: $full_name,
                student_number: $student_number,
                email: $email,
                student_remarks: $student_remarks,
                prg_id: $prg_id
            })
            this.showModal = true;
        },
        updateClassPrerog(value, class_id){
            this.toggleClassPrerog({
                class_nbr: class_id,
                prerog: value,
                index: this.index
            });
        }
    },
    watch: {
        updateTxnIndicator(newVal, oldVal) {
            this.$emit('onUpdateTxn')
        }
    }
}
</script>