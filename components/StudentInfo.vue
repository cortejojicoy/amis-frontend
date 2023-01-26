<template>
  <div class="mb-6">
    <div class="text-2xl font-bold">
        {{ studentData.name }}
    </div>
    <div class="mt-4 flex">
      <div class="mr-36">
          <div><span class="font-bold">Program: {{ studentData.program }}</span></div>
          <div><span class="font-bold">Status: {{ studentData.status }}</span></div>
      </div>
      <div>
          <div><span class="font-bold">UP Mail: {{ studentData.email }}</span></div>
          <div><span class="font-bold">Mobile Number: </span></div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    studentEmail: '',
    studentName: '',
    studProgram: '',
    studentStatus: ''
  }),
  props: {
      studentData: {
          type: Object
      }
  }
};
</script>
