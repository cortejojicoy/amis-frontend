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
              On this page you will see Teacher's Prerogative Enrollment Applications of students for the classes that you are handling this semester.
            </p>
            <p class="mb-4">
              Please click the appropriate button to exercise your prerogative in these student requests to register in your class. 
            </p>
            <p class="mb-4">
              Note that approved prerog requests are <b>added on top of the maximum class size in SAIS</b>, hence, it is best to check your SAIS Class List regularly to monitor and control the number of students enrolled in your class. You may opt to close/reopen the class for prerog applications whenever you like.
            </p>
            <p class="mb-4">
              Approved requests don't mean that the students are automatically added to your class; the students may still opt not to use the approved prerog request.
            </p>
        </div>
        <div v-if="!isLoading">
          <ManageFacultyPrerog v-show="classDetails" v-for="(classInstance, classKey) in classDetails" :key="classKey" :index="classKey" :classDetails="classInstance" @onUpdateTxn="updateTxn"/>
        </div>
        <Loader v-else :loaderType="'table'" :columnNum="4"/>
        <hr class="border-2 border-solid border-black mb-6" />
        <TransactionHistory :txnType="'prerog_txns'" :userRole="'faculties'" :update="updateTxnIndicator" :txnFilters="filters"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import TransactionHistory from "../../components/TransactionHistory.vue";
import ManageFacultyPrerog from "../../components/ManageFacultyPrerog.vue";

export default {
  components: {
    TransactionHistory,
    ManageFacultyPrerog
  },
  data () {
    return {
      updateTxnIndicator: 0,
      filters: [ //field -> db field/column; name -> name of key returned; type -> what type of filter; label -> label to be used
        {field: 'p.prg_id', name: 'prg_id', type: 'combobox', label: 'reference_id'},
        {field: 'action', name: 'action', type: 'select', label: 'action'},
        {field: 'course', name: 'course', type: 'select', label: 'course'},
        {field: 'campus_id', name: 'campus_id', type: 'combobox', label: 'campus_id'}
      ]
    };
  },
  computed: {
    ...mapState({
        isLoading: state => state.faculty.prerogativeEnrollment.prerogPage.loading,
    }),
    ...mapGetters({
        classDetails: "faculty/prerogativeEnrollment/prerogPage/classDetails",
    })
  },
  async fetch () {
    this.getClasses({
      faculty_sais_id: this.$auth.user.sais_id
    })
  },
  methods:{
    ...mapActions({
      getClasses: 'faculty/prerogativeEnrollment/prerogPage/getClasses'
    }),
    updateTxn(){
      this.updateTxnIndicator++
    }
  }
};
</script>

<style></style>
