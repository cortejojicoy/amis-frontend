<template>
  <div class="p-4">
    <div class="mb-5">
        CONFIRM ACTION
    </div>
    <span class="block text-sm font-medium text-slate-700 mb-5">
        Are you sure you want to commit the following change/s? 
    </span>
    <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
        <table class="table-auto w-full items-center text-center">
            <thead>
                <tr class="font-bold">
                <td class="px-2 py-3">Action</td>
                <td class="px-2 py-3">Mentor</td>
                <td class="px-2 py-3">Role</td>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(record, recordIndex) in getSaveMentors" :key="recordIndex">
                    <td class="px-2 py-3">{{ record.actions }}</td>
                    <td class="px-2 py-3">{{ record.mentor_name }}</td>
                    <td class="px-2 py-3">{{ record.mentor_role }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="text-right mb-8">
        <div class="grid grid-flow-row-dense grid-cols-3">
            <div class="col-span-2 px-8 py-2">
                Type <b>CONFIRM</b> to confirm your action:
            </div>
            <div>
                <input v-model="submitForms" type="text" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" required>
            </div>
        </div>
        <div class="grid grid-flow-row-dense grid-cols-3">
            <div class="col-span-2 px-8 py-2">
                Type Google Autheticator Code to confirm your action:
            </div>
            <div>
                <input type="text" disabled class=" disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
            </div>
        </div>
    </div>
    <div class="text-right">
        <button class="p-2 bg-gray-200" @click="clickSubmitConfirm">Confirm and Submit</button>
        
        <button class="p-2 bg-gray-200" @click="$emit('close-modal')">Close</button>
    </div>
</div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
    data() {
        return {
            actionsStatus: "submitted",
            submitForms: ""
        }
    },
    computed: {
        ...mapState({
            getSaveMentors: state => state.student.mentorAssignment.nominatedMentor.data.save_mentors,
        }),
        ...mapGetters({
            getMentors: "student/mentorAssignment/nominatedMentor/withoutTempID",
        }),
    },
    methods: {
        ...mapActions({
            updateMentor: "student/mentorAssignment/activeMentorAssignment/submitMentors",
        }),
        ...mapMutations({
            error: "alert/ERROR",
            success: "alert/SUCCESS",
        }),

        clickSubmitConfirm() {
            if(this.submitForms == 'CONFIRM') {
                this.updateMentor({
                    data: this.getMentors,
                    sais_id: this.$auth.user.sais_id,
                    status: this.actionsStatus
                }),
                this.success('Successfully submitted', {root: true})
                this.$emit('close-modal')
            } else {
                this.error('Please type CONFIRM', {root: true})
                this.$emit('close-modal')
            }
        },
    }

}
</script>