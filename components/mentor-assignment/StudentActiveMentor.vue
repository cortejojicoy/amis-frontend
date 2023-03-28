<template>
  <div class="my-6">
    <div class="flex justify-between mb-6">
      <div class="text-2xl font-bold">Active Mentor Assignments</div>
      <div class="">
        <button :class="is_student ? 'hidden' : 'p-2 bg-gray-300' " disabled>
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
          <!-- {{ mentorData }} -->
          <tr v-for="(row, rowIndex) in mentorData" :key="rowIndex">
            <!-- {{ row }} -->
            <td class="px-4 py-3">{{ row.mentor_name }}</td>
            <td class="px-4 py-3">{{ row.mentor_role }}</td>
            <td class="px-4 py-3"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    is_adviser: {
      type: Boolean
    },
    mentorData: {
        type: Array
    },
    is_student: {
        type: Boolean
    }
  }
};
</script>
