<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="text-2xl font-bold mb-8">
            Consent of Instructor
        </div>

        <div class="text-md">
            
        </div>
        <hr class="border-2 border-solid border-black mb-6" />
        <TransactionHistory :txnType="'coitxns'" :userRole="'admins'" :update="updateTxnIndicator" :txnFilters="filters"/>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionHistory from "../../components/TransactionHistory.vue";

export default {
  components: {
    TransactionHistory,
  },
  data () {
    return {
      updateTxnIndicator: 0,
      filters: [
        {field: 'c.coi_id', name: 'coi_id', type: 'combobox', label: 'reference_id'},
        {field: 'action', name: 'action', type: 'select', label: 'action'},
        {field: 'course', name: 'course', type: 'select', label: 'course'},
        {field: 's.campus_id', name: 'campus_id', type: 'combobox', label: 'campus_id'}
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
