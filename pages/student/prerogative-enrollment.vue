<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="text-2xl font-bold mb-8">
            Prerogative Enrollment
        </div>

        <div class="text-md">
            <p class="mb-4">
                <b>Please check first in SAIS if the class is closed.</b> If the class you are applying for a prerog to is open, you may enlist that class direcly in SAIS and save yourself some time from the prerog application process.
            </p>
            <p class="mb-4">
                Please be advised that <b>only classes tagged by the FIC are open</b> for prerog applications. A queueing system will also be implemented such that, if there are <b>15 pending applications</b> on a class, applications on the said class will be <b>temporarily closed</b> to prevent an overwhelming number of student requests. 
            </p>
            <p class="mb-4">
                Use the Remarks/Appeal field to give the faculty in charge the correct and complete information that may be necessary for her/his decision in granting your prerog application. The usual information needed by the FIC are your degree program, standing, units earned or remaining units and background information related to the course you are applying for. Your Remarks/Appeals are recorded which may be reviewed later. Kindly limit your remarks/appeal to <b>280 characters</b>. 
            </p>
            <p class="mb-4">
                You may use the Class Search function of SAIS to know more details about courses and classes.
            </p>
        </div>
        <hr class="border-2 border-solid border-black mb-6" />
        <StudentApplicationPrerog @onUpdateTxn="updateTxn" />
        <hr class="border-2 border-solid border-black mb-6" />
        <TransactionHistory :txnType="'prerog_txns'" :userRole="'students'" :update="updateTxnIndicator" :txnFilters="filters"/>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionHistory from "../../components/TransactionHistory.vue";
import StudentApplicationPrerog from "../../components/StudentApplicationPrerog.vue";

export default {
  components: {
    TransactionHistory,
    StudentApplicationPrerog
  },
  data () {
    return {
      updateTxnIndicator: 0,
      filters: [
        {field: 'action', name: 'action', type: 'select', label: 'action'},
        {field: 'course', name: 'course', type: 'select', label: 'course'},
      ]
    };
  },
  methods:{
    updateTxn(){
      this.updateTxnIndicator++
    }
  }
};
</script>

<style></style>
