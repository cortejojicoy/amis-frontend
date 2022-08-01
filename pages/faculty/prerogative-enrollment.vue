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
              On this page you will see prerog application of students on your handled classes this semester.
            </p>
        </div>
        <div v-if="!isLoading">
          <ManageFacultyPrerog v-show="classDetails" v-for="(classInstance, classKey) in classDetails" :key="classKey" :index="classKey" :classDetails="classInstance" @onUpdateTxn="updateTxn"/>
        </div>
        <Loader v-else :loaderType="'table'" :columnNum="4"/>
        <hr class="border-2 border-solid border-black mb-6" />
        <TransactionHistory :txnType="'prerog_txns'" :userRole="'faculties'" :update="updateTxnIndicator"/>
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
