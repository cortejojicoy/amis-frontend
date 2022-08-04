<template>
    <div class="my-8">
        <div class="flex items-center">
            <div class="my-4 text-2xl font-bold">
                Applications
            </div>
            <CircSpinner :isLoading="isLoading && !isInitialLoading"/>
        </div>
        <div v-if="!isInitialLoading" class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
            <table v-show="getPrerogApplications" class="table-auto w-full items-center text-center">
                <thead>
                    <tr class="font-bold">
                        <td class="px-2 py-3">Name</td>
                        <td class="px-2 py-3">Student Number</td>
                        <td class="px-2 py-3">Degree</td>
                        <td class="px-2 py-3">Course</td>
                        <td class="px-2 py-3">UPmail</td>
                        <td class="px-2 py-3">Remarks/Appeal</td>
                        <td class="px-2 py-3">Action/Status</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(prg, prgIndex) in getPrerogApplications" :key="prgIndex">
                        <td class="px-2 py-3">
                            {{prg.user.full_name}}
                        </td>
                        <td class="px-2 py-3">
                            {{prg.student.campus_id}}
                        </td>
                        <td class="px-2 py-3">
                            {{prg.student.program_records[0].academic_program_id}}
                        </td>
                        <td class="px-2 py-3">
                            {{prg.course_offering.course}}
                        </td>
                        <td class="px-2 py-3">  
                            {{prg.user.email}}
                        </td>
                        <td class="px-2 py-3">
                            {{prg.prerog_txns[0].note}}
                        </td>
                        <td class="px-2 py-3">
                            <div v-if="prg.status == 'Accepted'">
                                <button @click="openModal('approve', prg.user.full_name, prg.student.campus_id, prg.course_offering.course, prg.user.email, prg.prerog_txns[0].note, prg.prerog_txns[0].prg_id)" class="bg-green-500 text-white p-2 rounded mb-2 disabled:opacity-60">
                                    Approve
                                </button>
                                <button @click="openModal('disapprove', prg.user.full_name, prg.student.campus_id, prg.course_offering.course, prg.user.email, prg.prerog_txns[0].note, prg.prerog_txns[0].prg_id)" class="bg-red-500 text-white p-2 rounded disabled:opacity-60">
                                    Disapprove
                                </button>
                            </div>
                            <div class="italic" v-else>
                                {{prg.status}}
                            </div>
                        </td>
                    </tr>    
                </tbody>
            </table>
        </div>
        <Loader v-else :loaderType="'table'" :columnNum="4"/>

        <VTailwindModal v-model="show">
            <template v-slot:title>Confirm Action</template>
            <template v-slot:content>
                <div>
                    Are you sure you want to {{for_action.action}} the following student's Prerog application in <b>{{for_action.course}}</b>?
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
import VTailwindModal from "./VTailwindModal.vue";

export default {
    data: () => ({
        show: false
    }),
    components: {
        Loader,
        CircSpinner,
        VTailwindModal
    },
    computed: {
        ...mapState({
            for_action: state => state.admin.prerogativeEnrollment.prerogAction.for_action,
            isLoading: state => state.admin.prerogativeEnrollment.prerogAction.loading,
            isInitialLoading: state => state.admin.prerogativeEnrollment.prerogAction.initialLoading,
            updateTxnIndicator: state => state.admin.prerogativeEnrollment.prerogAction.updateTxnIndicator
        }),
        ...mapGetters({
            getJustification: "admin/prerogativeEnrollment/prerogAction/getJustification",
            getPrerogApplications: "admin/prerogativeEnrollment/prerogAction/getPrerogApplications"
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
        this.getPrerogs({
            admin_sais_id: this.$auth.user.sais_id
        })
    },
    methods: {
        ...mapActions({
            updateApplication: 'admin/prerogativeEnrollment/prerogAction/updateApplication',
            getPrerogs: 'admin/prerogativeEnrollment/prerogAction/getPrerogs'
        }),
        ...mapMutations({
            openModal: 'admin/prerogativeEnrollment/prerogAction/OPEN_MODAL',
            setForAction: 'admin/prerogativeEnrollment/prerogAction/SET_FOR_ACTION',
            unsetForAction: 'admin/prerogativeEnrollment/prerogAction/UNSET_FOR_ACTION',
            updateJustification: 'admin/prerogativeEnrollment/prerogAction/UPDATE_JUSTIFICATION'
        }),
        confirm() {
            this.updateApplication({
                admin_sais_id: this.$auth.user.sais_id, 
            });
            this.show = false
        },
        cancel() {
            this.unsetForAction()
            this.show = false
        },
        openModal($action, $full_name, $student_number, $course, $email, $student_remarks, $prg_id) {
            this.setForAction({
                action: $action,
                full_name: $full_name,
                student_number: $student_number,
                course: $course,
                email: $email,
                student_remarks: $student_remarks,
                prg_id: $prg_id
            })
            this.show = true;
        }
    },
    watch: {
        updateTxnIndicator(newVal, oldVal) {
            this.$emit('onUpdateTxn')
        }
    }
}
</script>