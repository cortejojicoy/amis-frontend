<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-red-500 text-white text-center w-full py-8 mb-4">
            CONSENT OF INSTRUCTOR APPROVAL/DISAPPROVAL IS NOW CLOSED.
        </div>
        <div class="text-2xl font-bold mb-8">
            Consent of Instructor
        </div>

        <div class="text-md">
            <p class="mb-4">
                For CEAT Faculty:
            </p>
            <p class="mb-4">
                The faculty-in-charge shall require students applying for COI the following supporting documents listed in the link below before approving the COI:
                <a class="text-blue-400" target="_blank" href="https://ocs.ceat.uplb.edu.ph/wp-content/uploads/2022/06/CEAT-Courses-Requiring-COI-as-of-2022.pdf">https://ocs.ceat.uplb.edu.ph/wp-content/uploads/2022/06/CEAT-Courses-Requiring-COI-as-of-2022.pdf</a>.
                Email address of student is shown in the COI request email. You may ask for these supporting documents via email.
            </p>
        </div>
        <div v-if="!isLoading">
          <ManageFacultyCOI v-show="classDetails" v-for="(classInstance, classKey) in classDetails" :key="classKey" :index="classKey" :classDetails="classInstance" @onUpdateTxn="updateTxn"/>
        </div>
        <Loader v-else :loaderType="'table'" :columnNum="4"/>
        <hr class="border-2 border-solid border-black mb-6" />
        <TransactionHistory :txnType="'coitxns'" :userRole="'faculties'" :update="updateTxnIndicator"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import TransactionHistory from "../../components/TransactionHistory.vue";
import ManageFacultyCOI from "../../components/ManageFacultyCOI.vue";


export default {
  components: {
    TransactionHistory,
    ManageFacultyCOI
  },
  data () {
    return {
      updateTxnIndicator: 0,
    };
  },
  computed: {
    ...mapState({
        isLoading: state => state.faculty.consentOfInstructor.coiPage.loading,
    }),
    ...mapGetters({
        classDetails: "faculty/consentOfInstructor/coiPage/classDetails",
    })
  },
  async fetch () {
    this.getClasses({
      faculty_sais_id: this.$auth.user.sais_id
    })
  },
  methods:{
    ...mapActions({
      getClasses: 'faculty/consentOfInstructor/coiPage/getClasses'
    }),
    updateTxn(){
      this.updateTxnIndicator++
    }
  }
};
</script>

<style></style>
