<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div v-if="!$config.COI_ENABLED" class="bg-red-500 text-white text-center w-full py-8 mb-4">
          COI requesting for General Registration is now closed. COI for Prerog will be on Feb 13-17.
        </div>
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
            <p cAllass="mb-4">
              All approved COI request for pre-registration will be reflected in SAIS on or before Jan 22.
            </p>
            <p class="mb-4 font-bold">
                For CAFS Students:
            </p>
            <p class="mb-4">
              All CAFS Students COI applications shall be checked and tagged by CAFS-OCS EXCEPT for MGT 101 and other non-CAFS courses. A google link will be emailed by CAFS-OCS and processing will be First Come-First Served.
            </p>
            <p class="mb-4 font-bold">
                For CFNR Students:
            </p>
            <p class="mb-4">
                Approved COI of 200 and 200a courses will be forwarded to the OCS for verification and encoding in SAIS. For further inquiries, you may contact us at <span class="font-bold">cfnr_ocs.uplb@up.edu.ph</span>. Please name the email Subject description to “AMIS Enrollment 200/200a” for easier message filtering.
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
