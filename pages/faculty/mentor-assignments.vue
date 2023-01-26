<template>
  <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
  <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div>
        <div class="mb-4 flex items-center">
          <div class="text-2xl font-bold">Mentor Assignment (Faculty)</div>
        </div>
      </div>

      <!-- {{ getTableDataByPage }} -->
      <div>
        <GenericTable 
            :isLoading="dataLoading" 
            :isInitialLoad="initialLoad" 
            :tableFilters="filters" 
            :tableFilterData="filterData" 
            :tableHeaders="headers" 
            :tableData="getTableDataByPage" 
            :tableOptions="options" 
            :isMa="'ma'"
            :maCss="maCss"
            @openDetails="openDetails"
            @onUpdateOptions="handleOptionsUpdate" 
            @onUpdatePage="handlePagination">
            
        </GenericTable>
      </div>

      <div>
        <GenericDrawer :isOpen="showDrawer" @closeDrawer="updateDrawer">
            <template v-slot:content>
              {{ drawerData }}
              <div v-if="index != null" class="w-full mb-4">
                <h1>HELLO</h1>
              </div>
            </template>
        </GenericDrawer>
      </div>
    </div>
  </div>
  
</div>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import TransactionHistory from '../../components/TransactionHistory.vue';
import MentorAssignmentTable from '../../components/mentor-assignment/MentorAssignmentTable.vue';
import GenericTable from '../../components/GenericTable.vue';
import GenericDrawer from '../../components/GenericDrawer.vue';

export default {
  components: { MentorAssignmentTable, TransactionHistory, GenericTable, GenericDrawer },
  data() {
    return {
        // menu: 'mentor-assignments',
        module: 'mentor-assignments',
        headers: [
          "name",
          "program",
          "student_status",
          "mentor",
          "role",
          "status"
        ],
        showDrawer: false,
        maCss: true,
        drawerData: {},
        index: null,
        options: {
          page: 1,
          filters: {},
          numOfItems: 5
        },
        q: '',
        updateTxnIndicator: 0,
        filters: [
          {field: "first_name", name: 'name', type: 'combobox', label: 'filter by name'},
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
  computed: {
    ...mapState({
        filterData: state => state.mentorAssignment.filters,
        dataLoading: state => state.mentorAssignment.loading,
        initialLoad: state => state.mentorAssignment.initialLoad,
        tableFilterValues: state => state.mentorAssignment.filterValues
    }),

    getTableDataByPage() {
        return this.getTableData(this.module)
    },

    ...mapGetters({
        getTableData: "mentorAssignment/getTableData"
    })
  },

  async fetch() {
    this.updateFilterValues({}) // set the filter values to nothing every time a txn history is rendered
    this.fetchTableData(this.options.page)
    this.filters.forEach(filter => { // create the filter values that will be used for this txn history instance
        this.getFilters({ 
          link: this.module,
          data: {
              column_name: filter.field,
              distinct: 'true',
              order_type: 'ASC',
              order_field: filter.field
          }
        })
    })
  },
  methods: {
      ...mapMutations({
        updateNumOfItems: 'faculty/mentorAssignment/UPDATE_NUM_OF_ITEMS',
        updateFilterValues: 'faculty/mentorAssignment/UPDATE_FILTER_VALUES',
        setTableModule: 'faculty/mentorAssignment/SET_MODULE'
      }),

      ...mapActions({
        getData: 'mentorAssignment/getData',
        getFilters: 'mentorAssignment/getFilters'
      }),
      openDetails(data) {
        // console.log(data)
        this.updateDrawer(data)
        this.drawerData = data
      },
      openDrawer(data) {
        this.showDrawer = true
        this.drawerData = data
      },
      fetchTableData(page) { // reusable function for getting the data to be displayed in txn history
        this.getData({
          link: this.module,
          data: {
              nominees: true,
              uuid: this.$auth.user.uuid,
              page: page,
              items: this.options.numOfItems,
          }
        })
      },
      updateDrawer(index){
        this.showDrawer = !this.showDrawer
        if(index) {
          this.index = index.index
        } else {
          this.index = null
        }
      },
      handleOptionsUpdate(options) {
          this.options.numOfItems = options.numOfItems
          this.updateFilterValues(options.filters)
          this.fetchTableData(1)
      },
      handlePagination(page) {
        this.fetchTableData(page)
      },

      updateTxn(){
          this.updateTxnIndicator++
      }
    },
}
</script>
