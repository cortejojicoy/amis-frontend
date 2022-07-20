<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div>
          <StudentInfo />
          <hr class="border-2 border-solid border-black mb-6" />
          <ActiveMentorSection @onUpdateTxn="updateTxn" />
          <hr class="border-2 border-solid border-black mb-6" />
          <AddRemoveMentor />
          <hr class="border-2 border-solid border-black mb-6" />
          <TransactionHistory :txnType="'mastxn'" :update="updateTxnIndicator"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActiveMentorSection from "../../components/ActiveMentorSection.vue";
import StudentInfo from "../../components/StudentInfo.vue";
import TransactionHistory from "../../components/TransactionHistory.vue";
import AddRemoveMentor from "../../components/AddRemoveMentor.vue";

export default {
  components: {
    StudentInfo,
    ActiveMentorSection,
    TransactionHistory,
    AddRemoveMentor,
  },

  data() {
    return {
      updateTxnIndicator: 0,
    }
  }, 
  methods:{
    updateTxn(){
      this.updateTxnIndicator++
    }
  }

};
</script>

<style></style>
