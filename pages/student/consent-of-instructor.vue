<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-red-500 text-white text-center w-full py-8 mb-4">
            APPLICATION FOR CONSENT OF INSTRUCTOR IS NOW CLOSED.
        </div>
        <div class="text-2xl font-bold mb-8">
            Consent of Instructor
        </div>

        <div class="text-md">
            <p class="mb-4">
                Use the Remarks/Appeal field to give the faculty in charge the correct and complete information that may be necessary for her/his decision in granting your COI. The usual information needed by the FIC are your degree program, standing, units earned or remaining units and background information related to the course you are applying for. Your Remarks/Appeals are recorded which may be reviewed later. Kindly limit your remarks/appeal to <b>230 characters</b>. 
            </p>
            <p class="mb-4">
                You may use the Class Search function of SAIS to know more details about courses and classes.
            </p>
            <p class="mb-4 font-bold">
                For CEAT Students:
            </p>
            <p class="mb-4">
                The faculty-in-charge (FIC) shall require students applying for COI the following supporting documents listed in the link below before approving the COI:
                <a class="text-blue-400" target="_blank" href="https://ocs.ceat.uplb.edu.ph/wp-content/uploads/2022/06/CEAT-Courses-Requiring-COI-as-of-2022.pdf">https://ocs.ceat.uplb.edu.ph/wp-content/uploads/2022/06/CEAT-Courses-Requiring-COI-as-of-2022.pdf</a>.
                The FIC may email you for supporting documents before approving your COI.
            </p>
            <p class="mb-4 font-bold">
                For CAFS Students:
            </p>
            <p class="mb-4">
                For those students who are intending to enroll 190, 198, 200, and 200a courses without approved COI yet, kindly fill-out the this form: <a class="text-blue-400" target="_blank" href="https://docs.google.com/forms/d/15U43WNG-KuodnKRO9IttQqV822ry6VD32Y_F7UxuvUI">https://docs.google.com/forms/d/15U43WNG-KuodnKRO9IttQqV822ry6VD32Y_F7UxuvUI</a> first for checking of your eligibility. For further inquiries, you may contact us at <span class="font-bold">cafs_ocs.registration.uplb@up.edu.ph</span>.
            </p>
        </div>
        <hr class="border-2 border-solid border-black mb-6" />
        <ManageCOI />
        <hr class="border-2 border-solid border-black mb-6" />
        <TransactionHistory :txnType="'coitxn'" />
      </div>
    </div>
  </div>
</template>

<script>
import TransactionHistory from "../../components/TransactionHistory.vue";
import ManageCOI from "../../components/ManageCOI.vue";

export default {
  components: {
    TransactionHistory,
    ManageCOI,
  },

};
</script>

<style></style>
