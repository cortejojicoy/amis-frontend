<template>
    <div class="my-8">
        <div class="flex items-center">
            <div class="w-full flex justify-between items-center mb-2">
                <div class="flex items-center">
                    <div class="my-4 text-2xl font-bold">
                        Applications
                    </div>
                    <CircSpinner :isLoading="isLoading && !isInitialLoading"/>
                </div>
                <div>
                    <label for="num-of-items" class="block text-xs text-gray-500">Number of items</label>
                    <select v-model="numOfItems" name="num-of-items" id="num-of-items" class="p-2 w-full">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
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
                            <div v-if="prg.status == 'Requested'">
                                <button @click="openModal('approve', prg.user.full_name, prg.student.campus_id, prg.course_offering.course, prg.user.email, prg.prerog_txns[0].note, prg.prerog_txns[0].prg_id)" class="bg-green-500 text-white p-2 rounded mb-2" :class="{'opacity-60 cursor-not-allowed': !$config.PREROG_ENABLED}" :disabled="!$config.PREROG_ENABLED">
                                    Approve
                                </button>
                                <button @click="openModal('disapprove', prg.user.full_name, prg.student.campus_id, prg.course_offering.course, prg.user.email, prg.prerog_txns[0].note, prg.prerog_txns[0].prg_id)" class="bg-red-500 text-white p-2 rounded" :class="{'opacity-60 cursor-not-allowed': !$config.PREROG_ENABLED}" :disabled="!$config.PREROG_ENABLED">
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
            <div v-show="getPrerogApplications.length < 1" class="w-full text-center">
                <p>No Prerog Applications available under your college.</p>
            </div>
            <vs-pagination :total-pages="totalPages" :current-page="currentPage" @change="changePage"></vs-pagination>
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
            currentPage: state => state.admin.prerogativeEnrollment.prerogAction.data.prgs.current_page,
            totalPages: state => state.admin.prerogativeEnrollment.prerogAction.data.prgs.last_page,
            isInitialLoading: state => state.admin.prerogativeEnrollment.prerogAction.initialLoading,
            updateTxnIndicator: state => state.admin.prerogativeEnrollment.prerogAction.updateTxnIndicator
        }),
        ...mapGetters({
            getJustification: "admin/prerogativeEnrollment/prerogAction/getJustification",
            getPrerogApplications: "admin/prerogativeEnrollment/prerogAction/getPrerogApplications",
            getNumOfItems: "admin/prerogativeEnrollment/prerogAction/getNumOfItems"
        }),
        justification: {
            get() {
                return this.getJustification
            },
            set(value) {
                this.updateJustification(value)
            },
        },
        numOfItems: {
            get() {
                return this.getNumOfItems
            },
            set(value) {
                this.updateNumOfItems(value)
                this.getPrerogs(1)
            }
        }
    },
    async fetch () {
        this.getPrerogs(1);
    },
    methods: {
        ...mapActions({
            updateApplication: 'admin/prerogativeEnrollment/prerogAction/updateApplication',
            getData: 'admin/prerogativeEnrollment/prerogAction/getPrerogs'
        }),
        ...mapMutations({
            openModal: 'admin/prerogativeEnrollment/prerogAction/OPEN_MODAL',
            setForAction: 'admin/prerogativeEnrollment/prerogAction/SET_FOR_ACTION',
            unsetForAction: 'admin/prerogativeEnrollment/prerogAction/UNSET_FOR_ACTION',
            updateJustification: 'admin/prerogativeEnrollment/prerogAction/UPDATE_JUSTIFICATION',
            updateNumOfItems: 'admin/prerogativeEnrollment/prerogAction/UPDATE_NUM_OF_ITEMS',
        }),
        changePage(page) { // change the page of the txn history
            this.getPrerogs(page)
        },
        confirm() {
            if(this.$config.PREROG_ENABLED) {
                this.updateApplication({
                    data: {
                        page: 1,
                        items: this.numOfItems,
                        sais_id: this.$auth.user.sais_id,
                    } 
                });
            }
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
        },
        getPrerogs(page) { // reusable function for getting the data to be displayed in txn history
            this.getData({
                data: {
                    page: page,
                    items: this.numOfItems,
                    sais_id: this.$auth.user.sais_id,
                }
            })
        }
    },
    watch: {
        updateTxnIndicator(newVal, oldVal) {
            this.$emit('onUpdateTxn')
        }
    }
}
</script>