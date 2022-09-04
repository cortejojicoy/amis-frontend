<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- <div class="bg-red-500 text-white text-center w-full py-8 mb-4">
            APPLICATION FOR CONSENT OF INSTRUCTOR IS NOW CLOSED.
        </div> -->
        <div class="text-2xl font-bold mb-8">
            Consent of Instructor
        </div>

        <div class="text-md">
          <p class="mb-4 font-bold">
                NOTICE (PLEASE READ): 
            </p>
            <p class="mb-4">
                Use the Remarks/Appeal field to give the faculty in charge the correct and complete information that may be necessary for her/his decision in granting your COI. The usual information needed by the FIC are your degree program, standing, units earned or remaining units and background information related to the course you are applying for. Your Remarks/Appeals are recorded which may be reviewed later. Kindly limit your remarks/appeal to <b>230 characters</b>. 
            </p>
            <p class="mb-4">
                <span class="text-red-600 font-bold">For courses with laboratory/recit classes, apply COI for both the lecture and lab/recit section.</span> You may use the Class Search function of SAIS to know more details about courses and classes.
            </p>
            <p class="mb-4">
                Kindly wait at least 24 hours before your COI approval is reflected in SAIS.
            </p>
            <p class="mb-4 font-bold">
                For CAFS Students:
            </p>
            <p class="mb-4">
                Approved COI of 190, 191, 198, 199, 200, and 200a courses will be forwarded to the OCS for verification and encoding in SAIS. For further inquiries, you may contact us at <span class="font-bold">cafs_ocs.registration.uplb@up.edu.ph</span>.
            </p>
            <p class="mb-4 font-bold">
                For CFNR Students:
            </p>
            <p class="mb-4">
                Approved COI of 200 and 200a courses will be forwarded to the OCS for verification and encoding in SAIS. For further inquiries, you may contact us at <span class="font-bold">cfnr_ocs.uplb@up.edu.ph</span>. Please name the email Subject description to “1221 Enrollment 200/200a/190” for easier message filtering.
            </p>
            <p class="mb-4">
                For FOR 200/200a courses, kindly follow the correct coding of sections and units to this link: <a class="text-blue-400" target="_blank" href="https://docs.google.com/document/d/1d-qcHwLU8QS1RG__OfCgLqGpZP1BhqtE/edit?usp=sharing&ouid=117123832471773687557&rtpof=true&sd=true">Thesis/Practicum/Special Problem Consent</a>
            </p>
        </div>
        <hr class="border-2 border-solid border-black mb-6" />
        <StudentApplicationCOI @onUpdateTxn="updateTxn" />
        <hr class="border-2 border-solid border-black mb-6" />
        <TransactionHistory :txnType="'coitxns'" :userRole="'students'" :update="updateTxnIndicator" :txnFilters="filters"/>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionHistory from "../../components/TransactionHistory.vue";
import StudentApplicationCOI from "../../components/StudentApplicationCOI.vue";

export default {
  components: {
    TransactionHistory,
    StudentApplicationCOI,
  },
  data () {
    return {
      updateTxnIndicator: 0,
      filters: [
        {field: 'c.coi_id', name: 'coi_id', type: 'combobox', label: 'reference_id'},
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
