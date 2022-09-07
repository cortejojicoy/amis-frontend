<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="text-2xl font-bold mb-8">
            Prerogative Enrollment
        </div>

        <div class="text-md">
          <div class="flex justify-start w-full items-center mb-4">
            <div class="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#eab308" class="w-7 h-7">
                <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="text-xl text-red-600 font-bold mr-2">
              READ FIRST BEFORE APPLYING
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#eab308" class="w-7 h-7">
                <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <p class="mb-4">
            <b>Please check first in SAIS if the class is closed.</b> If the class you are applying for a prerog is open, you may enlist that class direcly in SAIS and save yourself some time from the prerog application process.
          </p>
          <p class="mb-4">
            Please be advised that <b>only classes tagged by the FIC are open</b> for prerog applications.
          </p>
          <p class="mb-4">
            For classes with lecture and laboratory classes, you are required to apply for a prerog to both of them in order to be tagged correctly in SAIS.
          </p>
          <p class="mb-4">
            Use the Remarks/Appeal field to give the faculty in charge the correct and complete information that may be necessary for her/his decision in granting your prerog application. The usual information needed by the FIC are your degree program, standing, units earned or remaining units and background information related to the course you are applying for. Your Remarks/Appeals are recorded which may be reviewed later. Kindly limit your remarks/appeal to <b>500 characters</b>. 
          </p>
          <p class="mb-4">
            You may use the Class Search function of SAIS to know more details about courses and classes.
          </p>
          <p class="mb-4">
            Once your prerog application is approved you may enroll the class in SAIS <b>after 24 hours</b>.
          </p>
        </div>
        <hr class="border-2 border-solid border-black mb-6" />
        <StudentApplicationPrerog @onUpdateTxn="updateTxn" @onUpdateSummary="updateSummary"/>
        <hr class="border-2 border-solid border-black mb-6" />
        <ManageStudentPrerog @onUpdateTxn="updateTxn" :update="updateSummaryIndicator"/>
        <hr class="border-2 border-solid border-black mb-6" />
        <TransactionHistory :txnType="'prerog_txns'" :userRole="'students'" :update="updateTxnIndicator" :txnFilters="filters"/>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionHistory from "../../components/TransactionHistory.vue";
import StudentApplicationPrerog from "../../components/StudentApplicationPrerog.vue";
import ManageStudentPrerog from "../../components/ManageStudentPrerog.vue";

export default {
  components: {
    TransactionHistory,
    StudentApplicationPrerog,
    ManageStudentPrerog
  },
  data () {
    return {
      updateTxnIndicator: 0,
      updateSummaryIndicator: 0,
      filters: [
        {field: 'action', name: 'action', type: 'select', label: 'action'},
        {field: 'course', name: 'course', type: 'select', label: 'course'},
      ]
    };
  },
  methods:{
    updateTxn(){
      this.updateTxnIndicator++
    },
    updateSummary() {
      this.updateSummaryIndicator++
    }
  }
};
</script>

<style></style>
