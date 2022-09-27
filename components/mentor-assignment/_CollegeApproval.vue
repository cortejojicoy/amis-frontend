<template>
    <div class="my-6">
    <div class="flex align-middle items-center mb-6">
        <div class="text-2xl font-bold mr-3">
            Mentor Assignment Endorse
        </div>
        <div>
            (acceptance or rejection of nomination to serve as mentor)
        </div>
    </div>
    <div class="flex">
        <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4 w-full" >
            <table class="table-auto w-full items-center text-center" >
                <thead>
                    <tr class="font-bold">
                        <th class="px-2 py-3">Actions</th>
                        <th class="px-2 py-3">Mentor Name</th>
                        <th class="px-2 py-3">Roles</th>
                        <th class="px-2 py-3">Field Represented</th>
                        <th class="px-2 py-3">Actions</th>
                    </tr>
                </thead>
                
                <tbody v-show="getEndorsedMentor">
                    <tr v-for="(record, recordIndex) in getEndorsedMentor" :key="recordIndex">
                        <td class="px-4 py-3">{{ record.actions }}</td>
                        <td class="px-4 py-3">{{ record.mentor_name }}</td>
                        <td class="px-4 py-3">{{ record.mentor_role }}</td>
                        <td class="px-4 py-3"></td>
                        <td class="px-4 py-3">
                            <button class="bg-blue-500 text-white p-2 rounded" @click="approve(record.mentor_id); deleteRow(record.id)">Approve</button>
                            <button class="bg-red-500 text-white p-2 rounded" @click="show = true; reject(record.mentor_id)">Disapprove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <VTailwindModal v-model="show">
        <template v-slot:title>Remarks/Appeal</template>
            <template v-slot:content>
                <div class="px-2 py-3">
                    <textarea placeholder="limit to 280 characters" class="w-full border border-gray-400 rounded p-1 md:w-38" type="text" rows="5" maxlength="280"></textarea>
                </div>
            </template>
            <template v-slot:buttons>
                <div class="text-right">
                    <button class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60" >Confirm</button>
                </div>
            </template>
        </VTailwindModal>
    </div>
</div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import VTailwindModal from "../VTailwindModal.vue";
export default {
    data: () => ({
        show: false
    }),
    components: { VTailwindModal },
    props: {
        studentId: Number,
        mentorId: Number
    },
    computed: {
        ...mapState({
            updateTxnIndicator: state => state.admin.mentorAssignment.collegeApproval.updateTxnIndicator
        }),
        ...mapGetters({
            getEndorsedMentor: "admin/mentorAssignment/collegeApproval/getMentors"
        })
    },
    async fetch() {
        this.getMentors(this.studentId);
    },
    methods: {
        ...mapActions({
            getMentors: "admin/mentorAssignment/collegeApproval/getData",
            approveMentor: "admin/mentorAssignment/collegeApproval/approveMentor",
            sendRemarks: "admin/mentorAssignment/collegeApproval/reject"
        }),
        ...mapMutations({
            row: "admin/mentorAssignment/collegeApproval/DELETE_ROW",
            close: "maTable/CLOSE_DRAWER"
        }),
        approve(id) {
            this.approveMentor({
                data: this.getEndorsedMentor,
                sais_id: id
            })
        },
        deleteRow(index) {
            this.row(index)
            this.close(index)
        },
        reject(id) {
            this.mentorId = id
        },
        confirmRemarks(event) {
            this.sendRemarks({
                data: this.getMentors,
                sais_id: event.target.value,
                text: this.remarks,
            })
            this.show = false
        },
    },
    watch: {
        updateTxnIndicator(newVal, oldVal) {
            this.$emit('onUpdateTxn')
        }
    },
}
</script>