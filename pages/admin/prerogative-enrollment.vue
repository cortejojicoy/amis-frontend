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
              On this page you will see prerog application of students on your respective college this semester that are accepted by the faculty-in-charge of the course.
            </p>
        </div>
        <hr class="border-2 border-solid border-black mb-6" />
        <ManageAdminPrerog @onUpdateTxn="updateTxn"/>
        <hr class="border-2 border-solid border-black mb-6" />
        <TransactionHistory :txnType="'prerog_txns'" :userRole="'admins'" :update="updateTxnIndicator" :txnFilters="filters"/>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionHistory from "../../components/TransactionHistory.vue";
import ManageAdminPrerog from "../../components/ManageAdminPrerog.vue";

export default {
  components: {
    TransactionHistory,
    ManageAdminPrerog
  },
  data () {
    return {
      updateTxnIndicator: 0,
      filters: [ //field -> db field/column; name -> name of key returned; type -> what type of filter; label -> label to be used
        {field: 'p.prg_id', name: 'prg_id', type: 'combobox', label: 'reference_id'},
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
