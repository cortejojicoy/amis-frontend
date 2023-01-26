<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- <div v-if="!$config.COI_ENABLED" class="bg-red-500 text-white text-center w-full py-8 mb-4">
          COI requesting for General Registration is now closed. COI for Prerog will be on Feb 13-17.
        </div> -->
        <div class="text-2xl font-bold mb-8">
            Consent of Instructor
        </div>

        <div class="text-md">
            
        </div>
        <div v-if="!isLoading">
          <ManageFacultyCOI v-show="classDetails" v-for="(classInstance, classKey) in classDetails" :key="classKey" :index="classKey" :classDetails="classInstance" @onUpdateTxn="updateTxn"/>
        </div>
        <Loader v-else :loaderType="'table'" :columnNum="4"/>
        <hr class="border-2 border-solid border-black mb-6" />
        <TransactionHistory :txnType="'coitxns'" :userRole="'faculties'" :update="updateTxnIndicator" :txnFilters="filters"/>
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
      filters: [
        {field: 'c.coi_id', name: 'coi_id', type: 'combobox', label: 'reference_id'},
        {field: 'action', name: 'action', type: 'select', label: 'action'},
        {field: 'course', name: 'course', type: 'select', label: 'course'},
        {field: 'campus_id', name: 'campus_id', type: 'combobox', label: 'campus_id'}
      ]
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
