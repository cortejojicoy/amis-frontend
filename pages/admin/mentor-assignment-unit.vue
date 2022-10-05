<template>
    <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div>
          <div class="mb-4 flex items-center">
            <div class="text-2xl font-bold">Mentor Assignment (Unit)</div>
          </div>
        </div>

        <MentorAssignmentTable 
            :admin="'unit'"
            :maLink="'admin-ma'" 
            :userRole="'admins'" 
            :updateTable="updateMaTable" 
            :maFilters="filters" 
            @onUpdateMATXNs="updateTxn"
          />
        <TransactionHistory :txnType="'matxns'" :userRole="'admins'" :update="updateTxnIndicator" :txnFilters="txnFilters"/>
      </div>
    </div>
    
    
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import MentorAssignmentTable from '../../components/mentor-assignment/MentorAssignmentTable.vue';
import TransactionHistory from '../../components/TransactionHistory.vue';
export default {
    components: { MentorAssignmentTable, TransactionHistory },
    data() {
        return {
            updateTxnIndicator: 0,
            filters: [
              {field: 'name', name: 'name', type: 'combobox', label: 'filter by name'},
              {field: 'program', name: 'program', type: 'select', label: 'filter by program'},
              {field: 'status', name: 'student_status', type: 'select', label: 'filter by status'},
              {field: 'mentor_name', name: 'mentor_name', type: 'select', label: 'filter by mentor'},
              {field: 'mentor_role', name: 'mentor_role', type: 'select', label: 'filter by role'},
              {field: 'mentor_status', name: 'mentor_status', type: 'select', label: 'filter by status'}
            ],
            txnFilters: [
              {field: 'ma.mas_id', name: 'mas_id', type: 'combobox', label: 'transaction id'},
              {field: 'action', name: 'action', type: 'select', label: 'status'},
              {field: 'ma.mentor_name', name: 'mentor_name', type: 'combobox', label: 'mentor'}
            ]
          }
    },
    
    methods: {
        updateTxn(){
            this.updateTxnIndicator++
        }
    }
}
</script>