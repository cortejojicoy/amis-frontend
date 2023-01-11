<template>
    <div
      class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="text-2xl font-bold mb-8">
              General Elective Coursework
          </div>
          <div class="text-md">
            <p class="mb-4 font-bold">
                NOTICE (PLEASE READ): 
            </p>
          </div>
          <GenericTable :isLoading="dataLoading" :isInitialLoad="initialLoad" :tableFilters="filters" :tableFilterData="filterData" :tableHeaders="headers" :tableData="getTableData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination">
            <template v-slot:action="index">
              <button @click="updateDrawer(index)" class="bg-green-500 text-white p-2 rounded mb-2">
                View
              </button>
            </template>
          </GenericTable>
          <hr class="border-2 border-solid border-black mb-6" />
        </div>
      </div>
      <GenericDrawer :isOpen="showDrawer" @closeDrawer="updateDrawer">
        <template v-slot:content>
          <div v-if="index != null" class="w-full mb-4">
            <div v-for="(cwCourse, cwCourseIndex) in getTableData[index].coursework_data" :key="cwCourseIndex">
              {{ cwCourse }}
            </div>
          </div>
        </template>
      </GenericDrawer>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
  import CurriculumStructure from "../../components/academic-catalog/CurriculumStructure.vue";
  
  export default {
    components: {
      CurriculumStructure
    },
    data () {
      return {
        filters: [ //field -> db field/column; name -> name of key returned; type -> what type of filter; label -> label to be used
          // {field: 'student_number', name: 'student_number', type: 'combobox', label: 'Student Number'},
        ],
        headers: [
            "student_name",
            "student_number",
            "degree",
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
          filterData: state => state.faculty.planOfCoursework.geCoursework.filters,
          dataLoading: state => state.faculty.planOfCoursework.geCoursework.loading,
          initialLoad: state => state.faculty.planOfCoursework.geCoursework.initialLoad,
        }),
        ...mapGetters({
          getTableData: "faculty/planOfCoursework/geCoursework/getTableData"
        })
    },
    async fetch() {
      this.updateFilterValues({}) // reset filter values
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
    methods:{
      ...mapActions({
        getData: 'faculty/planOfCoursework/geCoursework/getData',
        getFilters: "faculty/planOfCoursework/geCoursework/getFilters"
      }),
      ...mapMutations({
        updateFilterValues: 'faculty/planOfCoursework/geCoursework/UPDATE_FILTER_VALUES',
      }),
      updateDrawer(index){
        this.showDrawer = !this.showDrawer
        if(index) {
          this.index = index.index
        } else {
          this.index = null
        }
      },
      fetchTableData(page) { // reusable function for getting the data to be displayed in generic table
        this.getData({
          link: this.module,
          data: {
              page: page,
              items: this.options.numOfItems,
              uuid: this.$auth.user.uuid,
              mentor_with_active_coursework: true,
              faculty_id: 99999,
              status: 'ACTIVE'
          }
        })
      },
      handleOptionsUpdate(options) {
        this.options.numOfItems = options.numOfItems
        this.updateFilterValues(options.filters)
        this.fetchTableData(1)
      },
      handlePagination(page) {
        this.fetchTableData(page)
      }
    }
  };
  </script>
  
  <style></style>
    