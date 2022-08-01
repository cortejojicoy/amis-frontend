<template>
    <div class="my-8">
        <div class="flex items-center">
            <div class="my-4 text-lg font-bold">
                {{classDetails.name}}
            </div>
            <CircSpinner :isLoading="isUpdating"/>
        </div>
        <div v-if="!isLoading" class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
            <table v-show="application" class="table-auto w-full items-center text-center">
                <thead>
                    <tr class="font-bold">
                        <td class="px-2 py-3">Name</td>
                        <td class="px-2 py-3">Student Number</td>
                        <td class="px-2 py-3">UPmail</td>
                        <td class="px-2 py-3">Remarks/Appeal</td>
                        <td class="px-2 py-3">Action/Status</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(app, applicationIndex) in application" :key="applicationIndex">
                        <td class="px-2 py-3">
                            {{app.user.full_name}}
                        </td>
                        <td class="px-2 py-3">
                            {{app.student.campus_id}}
                        </td>
                        <td class="px-2 py-3">  
                            {{app.user.email}}
                        </td>
                        <td class="px-2 py-3">
                            {{app.prerog_txns[0].note}}
                        </td>
                        <td class="px-2 py-3">
                            <div v-if="app.status == 'Requested'">
                                <button @click="openModal('accept', app.user.full_name, app.student.campus_id, app.user.email, app.prerog_txns[0].note, app.prerog_txns[0].prg_id)" class="bg-green-500 text-white p-2 rounded mb-2 disabled:opacity-60">
                                    Accept
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
        </div>
        <Loader v-else :loaderType="'table'" :columnNum="4"/>

        <VTailwindModal v-model="show">
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
                    <button v-if="for_action.action == 'accept'" @click="confirm" class="bg-green-500 text-white p-2 rounded mr-2">
                        Accept
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
        VTailwindModal
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
            getJustification: "faculty/prerogativeEnrollment/prerogAction/getJustification"
        }),
        application() {
            return this.getApplicationById(this.index)
        },
        isLoading() {
            return this.getLoadingById(this.index)
        },
        isUpdating() {
            return this.getUpdateDataLoadingById(this.index)
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
            setInitialApplications: 'faculty/prerogativeEnrollment/prerogAction/setInitialApplications'
        }),
        ...mapMutations({
            openModal: 'faculty/prerogativeEnrollment/prerogAction/OPEN_MODAL',
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
            this.show = false
        },
        cancel() {
            this.unsetForAction()
            this.show = false
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