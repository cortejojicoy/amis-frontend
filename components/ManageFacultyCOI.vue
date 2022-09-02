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
                        <td class="px-2 py-3">Action</td>
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
                            {{app.coitxns[0].note}}
                        </td>
                        <td class="px-2 py-3">
                            <button @click="openModal('approve', app.user.full_name, app.student.campus_id, app.user.email, app.coitxns[0].note, app.coitxns[0].coi_id)" class="bg-green-500 text-white p-2 rounded mb-2 disabled:opacity-60">
                                Approve
                            </button>
                            <button @click="openModal('disapprove', app.user.full_name, app.student.campus_id, app.user.email, app.coitxns[0].note, app.coitxns[0].coi_id)" class="bg-red-500 text-white p-2 rounded disabled:opacity-60">
                                Disapprove
                            </button>
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
                    Are you sure you want to {{for_action.action}} the following student's COI application?

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
            for_action: state => state.faculty.consentOfInstructor.coiAction.for_action,
            updateTxnIndicator: state => state.faculty.consentOfInstructor.coiAction.updateTxnIndicator
        }),
        ...mapGetters({
            getApplicationById: "faculty/consentOfInstructor/coiAction/getApplicationById",
            getLoadingById: "faculty/consentOfInstructor/coiAction/getLoadingById",
            getUpdateDataLoadingById: "faculty/consentOfInstructor/coiAction/getUpdateDataLoadingById",
            getJustification: "faculty/consentOfInstructor/coiAction/getJustification"
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
            cois: this.classDetails.cois,
            index: this.index 
        })
    },
    methods: {
        ...mapActions({
            updateApplication: 'faculty/consentOfInstructor/coiAction/updateApplication',
            setInitialApplications: 'faculty/consentOfInstructor/coiAction/setInitialApplications'
        }),
        ...mapMutations({
            openModal: 'faculty/consentOfInstructor/coiAction/OPEN_MODAL',
            setForAction: 'faculty/consentOfInstructor/coiAction/SET_FOR_ACTION',
            unsetForAction: 'faculty/consentOfInstructor/coiAction/UNSET_FOR_ACTION',
            updateJustification: 'faculty/consentOfInstructor/coiAction/UPDATE_JUSTIFICATION'
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
        openModal($action, $full_name, $student_number, $email, $student_remarks, $coi_id) {
            this.setForAction({
                action: $action,
                full_name: $full_name,
                student_number: $student_number,
                email: $email,
                student_remarks: $student_remarks,
                coi_id: $coi_id
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