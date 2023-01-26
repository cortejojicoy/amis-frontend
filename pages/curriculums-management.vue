<template>
    <div
      class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="text-2xl font-bold mb-8">
              Curriculum Management
          </div>
          <div class="mb-2">
              Note: The curriculums/curricula listed in this page are incomplete and are still being updated. 
          </div>
          <div>
            <GenericTable :isLoading="dataLoading" :isInitialLoad="initialLoad" :tableFilters="filters" :tableFilterData="filterData" :tableHeaders="headers" :tableData="getTableData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination">
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
                    <div class="w-full flex items-center justify-start">
                      <div class="text-xl font-bold my-4 mr-2">{{getTableData[index].details.code}}</div>
                      <div class="text-sm text-gray-500">
                        ({{getTableData[index].details.program.title}})
                      </div>
                    </div>

                    <hr class="border-1 border-solid border-black mb-4" />
                    
                    <div class="flex flex-wrap justify-start mb-4">
                      <div class="w-full text-lg font-bold my-2">
                        Curriculum Structure
                      </div>
                      <div class="flex flex-wrap justify-center">
                        <div v-for="(semYearData, semYearDataIndex) in getTableData[index].details.curriculum_structures" :key="semYearDataIndex" class="w-full md:w-1/2 mt-2">
                          <CurriculumStructure :curriculumDetails="semYearData" :curriculumCourses="getTableData[index].details.curriculum_courses" :index="semYearDataIndex"/>
                        </div>
                      </div>
                    </div>

                    <hr class="border-1 border-solid border-black mb-4" />

                    <div class="mt-4 bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                      <div class="w-full text-lg font-bold my-2">
                        Curriculum Courses
                      </div>
                      <div class="w-full text-center text-md text-gray-400">
                        -- Will be updated soon! --
                      </div>
                    </div>
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
import Loader from "../components/Loader.vue";
import GenericTable from "../components/GenericTable.vue";
import GenericDrawer from "../components/GenericDrawer.vue";
import CurriculumStructure from "../components/academic-catalog/CurriculumStructure.vue";

export default {
  components: {
    GenericTable,
    CurriculumStructure,
    GenericDrawer
  },
  data () {
    return {
      filters: [ //field -> db field/column; name -> name of key returned; type -> what type of filter; label -> label to be used
        {field: 'code', name: 'code', type: 'combobox', label: 'Code'},
      ],
      headers: [
          "code",
          "program",
          // "total_units",
          "action"
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
      filterData: state => state.curriculumsManagement.filters,
      dataLoading: state => state.curriculumsManagement.loading,
      initialLoad: state => state.curriculumsManagement.initialLoad,
      curriculumsData: state => state.curriculumsManagement.data,
      tableFilterValues: state => state.curriculumsManagement.filterValues,
    }),
    ...mapGetters({
      getTableData: "curriculumsManagement/getTableData"
    }),
  },
  async fetch () {
    this.updateFilterValues({}) // set the filter values to nothing every time a generic table is rendered
    this.fetchTableData(this.options.page)
    this.filters.forEach(filter => { // create the filter values that will be used for this generic table instance
        this.getFilters({ 
          link: this.module,
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
      updateNumOfItems: 'curriculumsManagement/UPDATE_NUM_OF_ITEMS',
      updateFilterValues: 'curriculumsManagement/UPDATE_FILTER_VALUES',
      setTableModule: 'curriculumsManagement/SET_MODULE'
    }),
    ...mapActions({
      getData: 'curriculumsManagement/getData',
      getFilters: 'curriculumsManagement/getFilters'
    }),
    openDrawer(data) {
      this.showDrawer = true
      this.drawerData = data
    },
    fetchTableData(page) { // reusable function for getting the data to be displayed in generic table
      this.getData({
        link: this.module,
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
    