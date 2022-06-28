<template>
  <div class="mb-6">
    <div class="text-2xl font-bold">
      {{ this.$auth.user.first_name }} {{ this.$auth.user.middle_name }} {{ this.$auth.user.last_name }}
    </div>
    <div class="mt-4 flex" v-if="StudentProgram.program">
      <div class="mr-36">
        <div>
          <span class="font-bold">Program: {{ StudentProgram.program.program }}</span>
        </div>
        <div>
          <span class="font-bold">Status: {{ StudentProgram.program.status }}</span>
        </div>
      </div>
      <div>
        <div>
          <span class="font-bold">UP Mail: {{ this.$auth.user.email }}</span>
        </div>
        <div>
          <span class="font-bold">Mobile Number:</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
    ...mapState({
      StudentProgram: state => state.student.program.data,
      StudentProgramLoading: state => state.student.program.loading,
    })
  },
  async fetch () {
    this.getStudentProgramData()
  },
  methods: {
    ...mapActions({
      getStudentProgramData: 'student/program/getData',
    }),
  }
};
</script>
