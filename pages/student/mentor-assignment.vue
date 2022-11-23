<template>
  <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div>
          <StudentInfo
            :studentEmail="studentEmail"
            :studentName="studentName"
            :studProgram="studentProgram"
            :studentStatus="studentStatus"
          />
          
          <hr class="border-2 border-solid border-black mb-6" />
          <StudentActiveMentor :activeMentor="studActiveMentor"/>
          <hr class="border-2 border-solid border-black mb-6" />
          <div v-if="!isLoading">
          <StudentAddMentor :facultyName="faculty" :link="'saved-mentors'" :roles="'students'" @onUpdateTxn="updateTxn"/>
          </div>
          <Loader v-else :loaderType="'table'" :columnNum="3"/>
          <hr class="border-2 border-solid border-black mb-6" />
          <TransactionHistory :txnType="'matxns'" :userRole="'students'"  :update="updateTxnIndicator" :txnFilters="txnFilters"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudentInfo from "../../components/StudentInfo.vue";
import TransactionHistory from "../../components/TransactionHistory.vue";
import StudentActiveMentor from "../../components/mentor-assignment/StudentActiveMentor.vue";
import StudentAddMentor from "../../components/mentor-assignment/StudentAddMentor.vue";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  components: { StudentInfo, TransactionHistory, StudentActiveMentor, StudentAddMentor },
  data: ()  => ({
      updateTxnIndicator: 0,
      studentEmail: "",
      studentName: "",
      studentProgram: "",
      studentStatus: "",
      faculty: {},
      txnFilters: [
        {field: 'ma.mas_id', name: 'mas_id', type: 'combobox', label: 'transaction id'},
        {field: 'action', name: 'action', type: 'select', label: 'status'},
        {field: 'ma.mentor_name', name: 'mentor_name', type: 'combobox', label: 'mentor'}
      ]
  }),

  async fetch() {
      this.getInfo(this.$auth.user.sais_id)
  },
  computed: {
    ...mapState({
        isLoading: state => state.student.studentDetails.loading,
        studInfo: state => state.student.studentDetails.studInfo
        // studActiveMentor: state => state.student.studentDetails.activeMentor 
    }),
    ...mapGetters({
      studActiveMentor: "student/mentorAssignment/studentActiveMentor/getStudActiveMentor",
      getStudent: "student/studentDetails/getStudentDetails",
      facultyName: "faculty/getFacultyName"
    }),
  },
  methods: {
    ...mapActions({
        getInfo: "student/studentDetails/getData"
    }),
    updateTxn(){
        this.updateTxnIndicator++
    },

  },
  watch: {
    studInfo(value) {
      value.map((item) => {
        this.studentName = item.last_name+', '+item.first_name
        this.studentProgram = item.academic_program_id
        this.studentStatus = item.status
        this.studentEmail = item.email
      })
    },
    facultyName(data) {
      this.faculty = data
    }
  }
};
</script>