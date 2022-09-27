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
                <tbody v-show="getNominated">
                    <tr v-for="(record, recordIndex) in getNominated" :key="recordIndex">
                        <td class="px-4 py-3">{{ record.actions }}</td>
                        <td class="px-4 py-3">{{ record.mentor_name }}</td>
                        <td class="px-4 py-3">{{ record.mentor_role }}</td>
                        <td class="px-4 py-3"></td>
                        
                        <td class="px-4 py-3"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>

import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
    data() {
        return {
            isUnitTag: ''
        }
    },
    props: {
        studentId: Number,

    },
    computed: {
        ...mapState({
            updateTxnIndicator: state => state.faculty.mentorAssignment.facultyNominated.updateTxnIndicator,
            getNominated: state => state.faculty.mentorAssignment.facultyNominated.nominees.requested_mentors
        }),
        isFaculty() {
            if(this.$auth.user.roles) {
                const roles = this.$auth.user.roles;
                return roles.find(el => el.name === "faculty") ? true : false;
            } else {
                return false
            }
        }
    },
    async fetch() {
        if(this.isFaculty) { this.getRequestedMentors(this.studentId) }  
    },
    methods: {
        ...mapActions({
            getRequestedMentors: "faculty/mentorAssignment/facultyNominated/getStudentData",
            endorseMentor: "faculty/mentorAssignment/endorseMentor"
        }),
        endorse(id) {
            this.endorseMentor({
                data: this.getRequestMentors,
                sais_id: id
            })
        },
        reject() {
            console.log('reject testing')
        }
    },
    watch: {
        updateTxnIndicator(newVal, oldVal) {
            this.$emit('onUpdateTxn')
        },
        
    }
}
</script>