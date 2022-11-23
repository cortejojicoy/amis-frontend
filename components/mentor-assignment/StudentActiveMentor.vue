<template>
  <div class="my-6">
    <div class="flex justify-between mb-6">
      <div class="text-2xl font-bold">Active Mentor Assignments</div>
      <div class="">
        <button :class="adminType == 'unit' || adminType == 'college' ? 'hidden' : 'p-2 bg-gray-300' " disabled>
          Generate Certificate of Mentor Assignment
        </button>
      </div>
    </div>
    <div class="bg-white overflow-auto shadow-xl sm:rounded-lg">
      <table class="table-auto w-full items-center text-center">
        <thead>
          <tr class="font-bold">
            <td class="p-4">MENTOR</td>
            <td class="p-4">ROLES</td>
            <td class="p-4">FIELD REPRESENTED</td>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td class="px-4 py-3">{{ activeMentor.mentorName }}</td>
              <td class="px-4 py-3">{{ activeMentor.mentorRoles }}</td>
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

  props: {
    activeMentor: {
        type: Object
    },
    adminType: {
        type: String
    }
  }
};
</script>
