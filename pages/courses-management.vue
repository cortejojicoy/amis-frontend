<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="text-2xl font-bold mb-8">
            Courses Management
        </div>
        <div class="mb-2">
            Note: The courses listed in this page are incomplete and are still being updated. 
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
                  <div class="mb-4">
                      <div class="my-4 text-xl font-bold w-full">
                          Course Specifics
                      </div>
                      <div class="w-full flex ml-3">
                          <div class="mr-4">
                              <b>Course ID:</b> {{getTableData[index].details.sais_course_id}}
                          </div>
                          <div class="mr-4">
                              <b>Course Code: </b> {{getTableData[index].details.course_code}}
                          </div>
                          <div class="mr-4">
                              <b>Grading:</b> {{getTableData[index].details.grading}}
                          </div>
                      </div>
                  </div>
                  <hr class="border-1 border-solid border-black mb-4" />
                  <CourseGeneralDetails :courseDetails="getTableData[index].details" />
                  <hr class="border-1 border-solid border-black mb-4" />
                  <!-- <CoursePrerequisites /> -->
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
import CourseGeneralDetails from "../components/academic-catalog/CourseGeneralDetails.vue";
import CoursePrerequisites from "../components/academic-catalog/CoursePrerequisites.vue";

export default {
  components: {
    GenericTable,
    CourseGeneralDetails,
    CoursePrerequisites
  },
  data () {
    return {
      filters: [ //field -> db field/column; name -> name of key returned; type -> what type of filter; label -> label to be used
        {field: 'course_code', name: 'course_code', type: 'combobox', label: 'Subject'},
        // {field: 'sem_offered', name: 'action', type: 'select', label: 'Sem Offered'},
        // {field: 'course', name: 'course', type: 'select', label: 'Home Unit'},
      ],
      headers: [
        "course",
        "title",
        "description",
        "sem_offered",
        "units",
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
      filterData: state => state.coursesManagement.filters,
      dataLoading: state => state.coursesManagement.loading,
      initialLoad: state => state.coursesManagement.initialLoad,
      coursesData: state => state.coursesManagement.data,
      tableFilterValues: state => state.coursesManagement.filterValues,
    }),
    ...mapGetters({
      getTableData: "coursesManagement/getTableData"
    }),
  },
  async fetch () {
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
    });
  },
  methods: {
    ...mapMutations({
      updateNumOfItems: 'coursesManagement/UPDATE_NUM_OF_ITEMS',
      updateFilterValues: 'coursesManagement/UPDATE_FILTER_VALUES',
      setTableModule: 'coursesManagement/SET_MODULE'
    }),
    ...mapActions({
      getData: 'coursesManagement/getData',
      getFilters: 'coursesManagement/getFilters'
    }),
    openDrawer(data) {
      this.showDrawer = true
      this.drawerData = data
    },
    fetchTableData(page) { // reusable function for getting the data to be displayed in txn history
      this.getData({
        link: this.module,
        data: {
            page: page,
            items: this.options.numOfItems,
            order_type: 'ASC',
            order_field: 'course_code'
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
  