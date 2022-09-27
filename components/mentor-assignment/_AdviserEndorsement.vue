<template>
    <div class="my-6">
    <div class="flex align-middle items-center mb-6">
        <div class="text-2xl font-bold mr-3"> Mentor Assignment Request </div>
        <div> (acceptance or rejection of nomination to serve as mentor) </div>
    </div>
    <div class="flex">
        <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4 w-full">
            <table class="table-auto w-full items-center text-center">
                <thead>
                    <tr class="font-bold">
                        <th class="px-2 py-3">Actions</th>
                        <th class="px-2 py-3">Mentor Name</th>
                        <th class="px-2 py-3">Roles</th>
                        <th class="px-2 py-3">Field Represented</th>
                        <th class="px-2 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody v-show="getMentors">
                    <tr v-for="(record, recordIndex) in getMentors" :key="recordIndex">
                        <td class="px-4 py-3">{{ record.actions }}</td>
                        <td class="px-4 py-3">{{ record.mentor_name }}</td>
                        <td class="px-4 py-3">{{ record.mentor_role }}</td>
                        <td class="px-4 py-3"></td>
                        
                        <td class="px-4 py-3">
                            <button class="bg-green-500 text-white p-2 rounded" @click="endorse(record.mentor_id); deleteRow(record.id)">Endorse</button>
                            <button class="bg-red-500 text-white p-2 rounded" @click="show = true; reject(record.mentor_id);">Reject</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <VTailwindModal v-model="show">
            <template v-slot:title>Remarks/Appeal</template>
            <template v-slot:content>
                <div class="px-2 py-3">
                    <textarea v-model="remarks" placeholder="limit to 280 characters" class="w-full border border-gray-400 rounded p-1 md:w-38" type="text" rows="5" maxlength="280"></textarea>
                </div>
            </template>
            <template v-slot:buttons>
                <div class="text-right">
                    <!-- {{ mentorId }} -->
                    <button class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60" :value="mentorId" @click="confirmRemarks($event)">Confirm</button>
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
    components: { VTailwindModal },
    data: () => ({
        show: false,
        remarks: ''
    }),
    props: {
        studentId: Number,
        mentorId: Number
    },
    computed: {
        ...mapState({
            updateTxnIndicator: state => state.faculty.mentorAssignment.adviserEndorsement.updateTxnIndicator,
        }),
        ...mapGetters({
            getMentors: "faculty/mentorAssignment/adviserEndorsement/getRequested"
        })
    },
    async fetch() {
        this.getRequestedMentors(this.studentId);
    },
    methods: {
        ...mapActions({
            getRequestedMentors: "faculty/mentorAssignment/adviserEndorsement/getData",
            endorseMentor: "faculty/mentorAssignment/adviserEndorsement/endorse",
            sendRemarks: "faculty/mentorAssignment/adviserEndorsement/reject",
        }),
        ...mapMutations({
            row: "faculty/mentorAssignment/adviserEndorsement/DELETE_ROW",
        }),
        endorse(id) {
            this.endorseMentor({
                data: this.getMentors,
                sais_id: id
            })
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
        },
        deleteRow(index) {
            this.row(index)
        }
    },
    watch: {
        updateTxnIndicator(newVal, oldVal) {
            this.$emit('onUpdateTxn')
        }
    }
}
</script>