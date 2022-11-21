<template>
  <div class="my-6">
    <div class="flex justify-between mb-6">
      <div class="text-2xl font-bold">Active Mentor Assignments</div>
      <div class="">
        <button class="p-2 bg-gray-300" disabled>
          Generate Certificate of Mentor Assignment
        </button>
      </div>
    </div>
    <div class="bg-white overflow-auto shadow-xl sm:rounded-lg">
      <table class="table-auto w-full items-center text-center">
        <thead>
          <tr class="font-bold">
            <td class="p-4">Mentor</td>
            <td class="p-4">Roles</td>
            <td class="p-4">Field Represented</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(active, activeIndex) in getActiveMentors" :key="activeIndex">
            <td class="px-4 py-3">{{ active.faculty.user.last_name+' '+active.faculty.user.first_name }}</td>
            <td class="px-4 py-3">{{ active.mentor_role }}</td>
            <td class="px-4 py-3"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
      ...mapState({
          getActiveMentors: state => state.student.mentorAssignment.studentActiveMentor.data.active_mentors,
      }),
  },
  async fetch() {
    this.getData(this.$auth.user.sais_id)
  },  
  methods: {
    ...mapActions({
        getData: "student/mentorAssignment/studentActiveMentor/getData"
    })
  }
};
</script>
