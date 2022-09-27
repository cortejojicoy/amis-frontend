<template>
  <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
  <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div>
        <div class="mb-4 flex items-center">
          <div class="text-2xl font-bold">Mentor Assignment (Faculty)</div>
        </div>
      </div>
      <div class="relative mb-4">
        <input type="text" id="filter-search" class="bg-gray-50 border text-gray-900 text-small p-1" placeholder="Search keyword..." />
        <button type="submit" class="p-1 ml-2 text-small font-small text-white bg-blue-700 border border-blue-700">
          Search
        </button>
        <button type="submit" @click="viewAll" class="p-1 ml-2 text-small font-small text-white bg-green-500 border border-green-500">
          View All
        </button>
      </div>
      
      <MentorAssignmentTable 
          :mLink="'ma'"
          :faculty="'nominated'"
          :maLink="'faculty-ma'" 
          :userRole="'faculties'" 
          :updateTable="updateMaTable" 
          :maFilters="filters" 
          @onUpdateMATXNs="updateTxn"
        /> 
    </div>
  </div>
  
</div>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import TransactionHistory from '../../components/TransactionHistory.vue';
import MentorAssignmentTable from '../../components/mentor-assignment/MentorAssignmentTable.vue';
export default {
  components: { MentorAssignmentTable, TransactionHistory },
  data() {
      return {
          updateMaTable:0,
          filters: [
            {field: 'name', name: 'name', type: 'combobox', label: 'filter by name'},
            {field: 'program', name: 'program', type: 'select', label: 'filter by program'},
            {field: 'status', name: 'student_status', type: 'select', label: 'filter by status'},
            {field: 'mentor_name', name: 'mentor_name', type: 'select', label: 'filter by mentor'},
            {field: 'mentor_role', name: 'mentor_role', type: 'select', label: 'filter by role'},
            {field: 'mentor_status', name: 'mentor_status', type: 'select', label: 'filter by status'}
          ]
      };
  },
  methods: {
      viewAll() {
          this.updateMaTable++
      },
  }
}
</script>
