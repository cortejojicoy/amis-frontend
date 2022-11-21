<template>
  <div class="mb-6">
    <div class="text-2xl font-bold">
      {{ studentName }}
    </div>
    <div class="mt-4 flex">
      <div class="mr-36">
          <div><span class="font-bold">Program: {{ studProgram }}</span></div>
          <div><span class="font-bold">Status: {{ studentStatus }}</span></div>
      </div>
      <div>
          <div><span class="font-bold">UP Mail: {{ studentEmail }}</span></div>
          <div><span class="font-bold">Mobile Number: </span></div>
      </div>
    </div>
    
  </div>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  props: {
      studentEmail: String,
      studentName: String,
      studProgram: String,
      studentStatus: String,
  },
};
</script>
