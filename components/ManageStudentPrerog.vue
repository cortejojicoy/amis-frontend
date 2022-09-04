<template>
    <div class="my-8">
        <div class="flex items-center mb-4">
            <div>
                <div class="text-2xl font-bold mb-4">
                    Summary
                </div>
                <p class="mb-4">
                    You may cancel a prerog application if it hasn't been acted on by your respective OCS or the Faculty-in-Charge of the course. Doing so will allow you to apply for another class with the same course code and the same component(LEC/LAB).
                </p>
            </div>
            <CircSpinner :isLoading="prerogLoading"/>
        </div>
        <div v-if="!prerogLoading" class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
            <table v-show="prerogs" class="table-auto w-full items-center text-center">
                <thead>
                    <tr class="font-bold">
                        <td class="px-2 py-3">Reference ID</td>
                        <td class="px-2 py-3">Course and Section</td>
                        <td class="px-2 py-3">Component</td>
                        <td class="px-2 py-3">Faculty-in-Charge</td>
                        <td class="px-2 py-3">Action/Status</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(prg, prgIndex) in prerogs" :key="prgIndex">
                        <td class="px-2 py-3">
                            {{prg.prg_id}} 
                        </td>
                        <td class="px-2 py-3">
                            {{prg.course_offering.course}} {{prg.course_offering.section}} 
                        </td>
                        <td class="px-2 py-3">
                            {{prg.course_offering.component}} 
                        </td>
                        <td class="px-2 py-3">
                            {{prg.course_offering.name}}
                        </td>
                        <td class="px-2 py-3">
                            <div v-if="prg.status == 'Requested' || prg.status == 'Logged by OCS'">
                                <button @click="openModal('cancel', prg.course_offering.course, prg.course_offering.section, prg.prg_id)" class="bg-red-500 text-white p-2 rounded mb-2 disabled:opacity-60">
                                    Cancel
                                </button>
                            </div>
                            <div v-else>
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
                    Are you sure you want to {{forAction.action}} your prerog application in <b>{{forAction.course}} {{forAction.section}}</b> ?
                </div>
            </template>
            <template v-slot:buttons>
                <div>
                    <button @click="withdraw" class="bg-green-500 text-white p-2 px-4 rounded mr-2">
                        Yes
                    </button>          
                    <button @click="cancel" class="bg-red-500 text-white p-2 px-4 rounded mr-2">
                        No
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
        update: {
            type: Number
        },
    },
    components: {
        Loader,
        CircSpinner,
        VTailwindModal
    },
    computed: {
        ...mapState({
            updateTxnIndicatorTwo: state => state.student.prerogativeEnrollment.prerogApplication.updateTxnIndicatorTwo,
            prerogLoading: state => state.student.prerogativeEnrollment.prerogApplication.prerogLoading,
            prerogs: state => state.student.prerogativeEnrollment.prerogApplication.prerogs,
            forAction: state => state.student.prerogativeEnrollment.prerogApplication.forAction
        }),
    },
    async fetch () {
        this.getPrerogData({
            sais_id: this.$auth.user.sais_id
        })
    },
    methods: {
        ...mapActions({
            getPrerogData: 'student/prerogativeEnrollment/prerogApplication/getPrerogApplications',
            cancelPrerog: 'student/prerogativeEnrollment/prerogApplication/cancelPrerog',
        }),
        ...mapMutations({
            setForAction: 'student/prerogativeEnrollment/prerogApplication/SET_FOR_ACTION',
            unsetForAction: 'student/prerogativeEnrollment/prerogApplication/UNSET_FOR_ACTION',
        }),
        openModal($action, $course, $section, $prg_id) {
            this.setForAction({
                action: $action,
                course: $course,
                section: $section,
                prg_id: $prg_id
            })
            this.show = true
        },
        cancel() {
            this.unsetForAction()
            this.show = false
        },
        withdraw() {
            this.cancelPrerog({
                sais_id: this.$auth.user.sais_id
            })
            this.show = false
        }
    },
    watch: {
        updateTxnIndicatorTwo(newVal, oldVal) {
            this.$emit('onUpdateTxn')
        },
        update(newVal, oldVal) {
            this.getPrerogData({
                sais_id: this.$auth.user.sais_id
            })
        }
    }
}
</script>