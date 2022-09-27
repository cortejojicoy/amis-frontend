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
                            <button class="bg-green-500 text-white p-2 rounded" @click="endorse(record.mentor_id); deleteRow(record.id);">Endorse</button>
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
                    <button class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60" :value="mentorId" @click="confirmRemarks($event);">Confirm</button>
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
        drawer: false,
        remarks: '',
        studentId: 0
    }),
    props: {
        studentId: Number,
        mentorId: Number
    },
    computed: {
        ...mapState({
            updateTxnIndicator: state => state.admin.mentorAssignment.unitEndorsement.updateTxnIndicator
        }),
        ...mapGetters({
            getMentors: "admin/mentorAssignment/unitEndorsement/getRequested",
            showDrawer: "maTable/getDrawerStatus"
        })
    },
    async fetch() {
        this.getRequestedMentors(this.studentId);
    },
    methods: {
        ...mapActions({
            getRequestedMentors: "admin/mentorAssignment/unitEndorsement/getData",
            endorseMentor: "admin/mentorAssignment/unitEndorsement/endorsedMentor",
            sendRemarks: "admin/mentorAssignment/unitEndorsement/reject",
        }),
        ...mapMutations({
            row: "admin/mentorAssignment/unitEndorsement/DELETE_ROW",
            close: "maTable/CLOSE_DRAWER"
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
            this.show = false
        },
        
        deleteRow(index) {
            this.row(index)
            this.close(index)
        }
    },
    watch: {
        showDrawer(open) {
            this.drawer = open
            // console.log(open)
        },
        updateTxnIndicator(newVal, oldVal) {
            this.$emit('onUpdateTxn')
        }
    }
}
</script>