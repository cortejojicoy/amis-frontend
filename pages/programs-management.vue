<template>
    <div
      class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="text-2xl font-bold mb-8">
            Programs Management
        </div>
        <div class="mb-2">
            Note: The programs listed in this page are incomplete and are still being updated. 
        </div>
        <div>
          <GenericTable :isLoading="dataLoading" :isInitialLoad="initialLoad" :tableFilters="filters" :tableFilterData="filterData" :tableHeaders="headers" :tableData="getTableData" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination">
            <template v-slot:action="index">
              <button @click="updateDrawer(index)" class="bg-green-500 text-white p-2 rounded mb-2">
                View
              </button>
            </template>
          </GenericTable>
        </div>
        <div>
          <GenericDrawer :isOpen="showDrawer" @closeDrawer="updateDrawer">
              <template v-slot:content>
                <div v-if="index != null" class="w-full mb-4">
                  
                </div>
              </template>
          </GenericDrawer>
        </div>
      </div>
      </div>
    </div>
  </template>
    
<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import GenericTable from "../components/GenericTable.vue";
  
export default {
  components: {
      GenericTable
  },
  data () {
    return {
      filters: [ //field -> db field/column; name -> name of key returned; type -> what type of filter; label -> label to be used
        {field: 'acronym', name: 'acronym', type: 'combobox', label: 'Acronym'},
        {field: 'college', name: 'college', type: 'select', label: 'College'},
      ],
      headers: [
        "acronym",
        "title",
        "career",
        "college",
        "description",
      ],
      showDrawer: false,
      drawerData: {},
      index: null,
      options: {
        page: 1,
        filters: {},
        numOfItems: 5
      }
    };
  },
  computed: {
    ...mapState({
      filterData: state => state.programsManagement.filters,
      dataLoading: state => state.programsManagement.loading,
      initialLoad: state => state.programsManagement.initialLoad,
      programsData: state => state.programsManagement.data,
      tableFilterValues: state => state.programsManagement.filterValues,
    }),
    ...mapGetters({
      getTableData: "programsManagement/getTableData"
    }),
  },
  async fetch () {
    this.updateFilterValues({}) // set the filter values to nothing every time a txn history is rendered
    this.fetchTableData(this.options.page)
    this.filters.forEach(filter => { // create the filter values that will be used for this txn history instance
        this.getFilters({ 
          data: {
            column_name: filter.field,
            distinct: 'true',
            order_type: 'ASC',
            order_field: filter.field
          }
        })
    });
  },
  methods: {
    ...mapMutations({
      updateNumOfItems: 'programsManagement/UPDATE_NUM_OF_ITEMS',
      updateFilterValues: 'programsManagement/UPDATE_FILTER_VALUES',
    }),
    ...mapActions({
      getData: 'programsManagement/getData',
      getFilters: 'programsManagement/getFilters'
    }),
    openDrawer(data) {
      this.showDrawer = true
      this.drawerData = data
    },
    fetchTableData(page) { // reusable function for getting the data to be displayed
      this.getData({
        data: {
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
    }
  },
};
</script>
  
<style></style>
    