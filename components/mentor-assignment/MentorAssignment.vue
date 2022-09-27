<template>
    <div class="my-6">
    <div class="flex align-middle items-center mb-6">
        <div class="text-2xl font-bold mr-3"> Mentor Assignment 
            {{adminType == 'unit' ? 'Request' : '' || adminType == 'college' ? 'Endorse' : '' && facultyType == 'adviser' ? 'Request' : 'Request'}} 
        </div>
        <div> (acceptance or rejection of nomination to serve as mentor) </div>
    </div>
    <div v-if="!maLoading">
        <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4 w-full">
            <table class="table-auto w-full items-center text-center">
                <thead>
                    <tr class="font-bold">
                        <td v-for="(maHeader, maHeaderIndex) in maHeaders" :key="maHeaderIndex" class="p-4">{{maHeader}}</td>
                    </tr>
                </thead>
                <tbody v-show="mentorAssignment">
                    <tr v-for="(ma, maIndex) in mentorAssignment" :key="maIndex">
                        <td class="px-4 py-3">{{ ma.actions }}</td>
                        <td class="px-4 py-3">{{ ma.mentor_name }}</td>
                        <td class="px-4 py-3">{{ ma.mentor_role }}</td>
                        <td class="px-4 py-3"></td>
                        <div v-if="adminType == 'unit' || facultyType == 'adviser'">
                            <td class="px-4 py-3">
                                <button class="bg-green-500 text-white p-2 rounded" @click="submit(ma.id, 'endorse');">Endorse</button>
                                <button class="bg-red-500 text-white p-2 rounded" @click="show = true; openModal(ma.id, 'reject');">Reject</button>
                            </td>
                        </div>
                        <div v-if="adminType == 'college'">
                            <td class="px-4 py-3">
                                <button v-if="ma.actions == 'Add'" class="bg-green-500 text-white p-2 rounded" @click="submit(ma.id, 'approved')">Approved</button> 
                                <button v-else-if="ma.actions == 'Remove'" class="bg-green-500 text-white p-2 rounded" @click="show = true; openModal(ma.id, 'remove');">Approved</button>
                                <button class="bg-red-500 text-white p-2 rounded" @click="show = true; openModal(ma.id, 'reject');">Disapproved</button>
                            </td>
                        </div>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <Loader v-if="maLoading" :loaderType="'table'" :columnNum="6"/>
    
    <VTailwindModal v-model="show">
        <template v-slot:title>{{ remove == 'remove' ? 'Confirm Action' : 'Remarks/Appeal'}}</template>
        <template v-slot:content>
            <div v-if="remove == 'remove'">
                Are you sure you want to commit the following change/s? 

                <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
                    <table class="table-auto w-full items-center text-center">
                        <thead>
                            <tr class="font-bold">
                                <td class="px-2 py-3">Action</td>
                                <td class="px-2 py-3">Mentor</td>
                                <td class="px-2 py-3">Role</td>
                            </tr>
                        </thead>
                        <tr>
                            <td class="px-2 py-3">{{ forRemove.actions }}</td>
                            <td class="px-2 py-3">{{ forRemove.mentor_name }}</td>
                            <td class="px-2 py-3">{{ forRemove.mentor_role }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div v-else class="px-2 py-3">
                <textarea v-model="remarks" placeholder="limit to 280 characters" class="w-full border border-gray-400 rounded p-1 md:w-38" type="text" rows="5" maxlength="280"></textarea>
            </div>
        </template>
        <template v-slot:buttons>
            <div class="text-right" v-if="remove == 'remove'">
                <button class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60"  @click="submit(forRemove.id, 'approved')">Confirm and Submit</button>
            </div>
            <div class="text-right" v-else>
                <button class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60" :value="confirmId" type="number" @click="submit($event, 'approved');">Confirm</button>
            </div>
        </template>

        
    </VTailwindModal>
</div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import VTailwindModal from "../VTailwindModal.vue";
import Loader from "../Loader.vue";
export default {
    components: { VTailwindModal, Loader },
    data: () => ({
        show: false,
        drawer: false,
        remarks: '',
        confirmId: 0,
        remove: ''
    }),
    props: {
        adminType: String,
        facultyType: String,
        mLink: String,
        roles: String,
        studentId: Number,
        studentIndex: Number
        // confirmId: Number
        // mentorRoles: String,
    },

    async fetch() {
        this.getMa(this.studentId)
    },  

    computed: {
        ...mapState({
            forRemove: state => state.maApproval.forRemove,
            updateTxnIndicator: state => state.maApproval.updateTxnIndicator,
            mentorAssignment: state => state.maApproval.data.mas,
            maLoading: state => state.maApproval.loading,
            initialLoad: state => state.maApproval.initialLoad
        }),
        ...mapGetters({
            maHeaders: "maApproval/getTableHeaders",
            getMaData: "maApproval/getMaData",
            showDrawer: "maTable/getDrawerStatus"
        })
    },

    methods: {
        ...mapActions({
            getData: 'maApproval/getData',
            updateApproval: 'maApproval/updateApproval'
        }),
        ...mapMutations({
            updateRow: 'maApproval/DELETE_ROW',
            updateDrawer: "maTable/CLOSE_DRAWER",
            getRemoveMentor: "maApproval/GET_REMOVE_MENTOR"
        }),

        getMa(studentId) {
            this.getData({
                link: this.mLink,
                roles: this.roles,
                studentId: studentId,
                sais_id: this.$auth.user.sais_id,
                adminType: this.adminType,
                facultyType: this.facultyType
            })
        },

        openModal(index, remove) {
            this.confirmId = index,
            this.remove = remove,
            this.getRemoveMentor({
                id: index
            })
            // console.log(this.)
        },
        
        submit(index, type) {
            if(type == 'reject') {
                this.updateApproval({
                    maType: type,
                    index: parseInt(index.target.value),
                    link: this.mLink,
                    roles: this.roles,
                    sais_id: this.$auth.user.sais_id,
                    text: this.remarks,
                })

            } else if(type == 'endorse' || type == 'approved') {
                this.updateApproval({
                    maType: type,
                    index: index,
                    link: this.mLink,
                    roles: this.roles,
                    sais_id: this.$auth.user.sais_id
                })
                // console.log('this was clicked')
            }
            
            this.show = false
            this.updateDrawer(index)
            this.confirmId = 0
            
        },
        deleteRow(index) {
            this.updateRow(index)
            this.updateDrawer(index)
        }
    },
    watch: {
        showStatus(value) {
            // console.log(value)
        },
        updateTxnIndicator(newVal, oldVal) {
            this.$emit('onUpdateTxn')
        }
    }
}
</script>