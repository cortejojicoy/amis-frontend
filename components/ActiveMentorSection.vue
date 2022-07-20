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
          <tr  v-for="(record, recordIndex) in getActiveMentors" :key="recordIndex">
            <td class="px-4 py-3">{{ record.last_name+ ' '+record.first_name }}</td>
            <td class="px-4 py-3">{{ record.mentor_role }}</td>
            <td class="px-4 py-3"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
      ...mapState({
          getActiveMentors: state => state.student.mentorAssignment.activeMentorAssignment.data.active_mentors,
      }),
  },
};
</script>
