<template>
  <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
  <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div>
        <div class="mb-4 flex items-center">
          <div class="text-2xl font-bold">Mentor Assignment (Faculty)</div>
        </div>
      </div>

      <div>
        <!-- {{ getTableDataByFacultyID }} -->

        <GenericTable 
            :isLoading="dataLoading" 
            :isInitialLoad="initialLoad" 
            :tableFilters="filters" 
            :tableFilterData="filterData" 
            :tableHeaders="headers" 
            :tableData="tableData" 
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
              <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <StudentInfo :studentData="studInfo"/>
                  <hr class="border-2 border-solid border-black mb-6" />
                  <StudentActiveMentor :mentorData="getActitveMentorByUuid" :is_adviser="is_adviser"/>
                  <!-- {{ getRequestedMentor }} -->
                  
                  <MentorAssignmentTable :navbar="menu" :mentorTable="getRequestedMentor" :uuid="studentUuid">
                    <template v-slot:action="id">
                      <div v-if="menu === 'my-advisee'">
                          <button @click="btn('endorse','', id.id)" class="bg-green-500 text-white p-2 rounded">Endorse</button>
                          <button @click="btn('modalReturn', 'value', id)" class="bg-yellow-500 text-white p-2 rounded">Return</button>
                          <button @click="btn('modalDisapprove','', id)" class="bg-red-500 text-white p-2 rounded">Disapproved</button>
                      </div>
                    </template>
                  </MentorAssignmentTable>
                  
                </div>
              </div>
            </template>
        </GenericDrawer>
      </div>

      <div>
        <VTailwindModal v-model="show">
          <template v-slot:title>Remarks</template>
            <template v-slot:content>
                <div class="px-2 py-3">
                    <textarea v-model="remarks" placeholder="limit to 280 characters" class="w-full border border-gray-400 rounded p-1 md:w-80" type="text" rows="5" maxlength="280" required></textarea>
                </div>
            </template>
            <template v-slot:buttons>
                <div class="text-right" v-if="btnValue != 'value'">
                    <button class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60" :value="confirmId.id" @click="btn('disapproved','', $event.target.value);">Confirm</button>
                  </div>
                <div v-else>
                    <button class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60" :value="confirmId.id" @click="btn('returned', '', $event.target.value);">Confirm</button>  
                </div>
            </template>
        </VTailwindModal>
      </div>
      
      <TransactionHistory :txnType="'matxns'" :userRole="'faculties'" :txnFilters="txnFilters" :update="updateTxnIndicator"/>
    </div>
  </div>
</div>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import TransactionHistory from '../../components/TransactionHistory.vue';
import GenericTable from '../../components/GenericTable.vue';
import GenericDrawer from '../../components/GenericDrawer.vue';
import StudentInfo from '../../components/StudentInfo.vue';
import VTailwindModal from "../../components/VTailwindModal.vue";
import StudentActiveMentor from '../../components/mentor-assignment/StudentActiveMentor.vue';
import MentorAssignmentTable from '../../components/mentor-assignment/MentorAssignmentTable.vue';
export default {
  components: { TransactionHistory, GenericTable, GenericDrawer, StudentActiveMentor, MentorAssignmentTable, StudentInfo, VTailwindModal },
  data() {
    return {
        confirmId: 0,
        menu: 'my-advisee',
        module: 'mentors',
        btnValue: '',
        is_adviser: true,
        facultyInfo: {},
        facultyId:0,
        remarks: '',
        maCss: true,
        headers: [
          "name",
          "program",
          "student_status",
          "mentor",
          "role",
          "status"
        ],
        show: false,
        showDrawer: false,
        index: null,
        studentUuid: '',
        options: {
          page: 1,
          filters: {},
          numOfItems: 5
        },
        updateTxnIndicator: 0,
        filters: [
          {field: 'name', name: 'name', type: 'combobox', label: 'filter by name'},
          {field: 'program', name: 'program', type: 'select', label: 'filter by program'},
          {field: 'student_status', name: 'student_status', type: 'select', label: 'filter by status'},
          {field: 'mentor', name: 'mentor', type: 'select', label: 'filter by mentor'},
          {field: 'role', name: 'role', type: 'select', label: 'filter by role'},
          {field: 'status', name: 'status', type: 'select', label: 'filter by status'}
        ],
        txnFilters: [
          {field: 'ma.id', name: 'id', type: 'combobox', label: 'transaction id'},
          {field: 'action', name: 'action', type: 'select', label: 'status'},
          {field: 'ma.mentor_name', name: 'mentor_name', type: 'combobox', label: 'mentor'}
        ]
    }
  },
  computed: {
    ...mapState({
        studInfo: state => state.faculty.mentorAssignment.studInfo,
        dataLoading: state => state.faculty.mentorAssignment.loading,
        initialLoad: state => state.faculty.mentorAssignment.initialLoad,
        tableData: state => state.faculty.mentorAssignment.tableData,
        filterData: state => state.faculty.mentorAssignment.filters,
        closeModal: state => state.faculty.mentorAssignment.closeModal,
    }),

    remarks: {
        get() {
          return this.getRemarks
        },
        set(value) {
          this.updateRemarks(value)
        }
    },

    getActitveMentorByUuid() {
        return this.getActiveMentor(this.studentUuid, this.menu)
    },  

    ...mapGetters({
        getActiveMentor: "faculty/mentorAssignment/getActiveMentor",
        getRequestedMentor: "faculty/mentorAssignment/getRequestedMentor"
    })
  },

  async fetch() {
    this.updateFilterValues({}) // set the filter values to nothing every time a txn history is rendered
    this.fetchTableData(this.options.page)
    this.filters.forEach(filter => { // create the filter values that will be used for this txn history instance
        this.getFilters({ 
          link: this.module,
          // fetchType: '',
          data: {
              table_filters: true,
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
        deleteRow: "faculty/mentorAssignment/DELETE_ROW",
        updateNumOfItems: 'faculty/mentorAssignment/UPDATE_NUM_OF_ITEMS',
        updateFilterValues: 'faculty/mentorAssignment/UPDATE_FILTER_VALUES',
        setTableModule: 'mentorAssignment/SET_MODULE'
    }),
    
    ...mapActions({
        // GET REQUEST
        getActive: 'faculty/mentorAssignment/getActive',
        getData: 'faculty/mentorAssignment/getData', //table data of advisee
        getFilters: 'faculty/mentorAssignment/getFilters',
        getUserInfo: 'faculty/mentorAssignment/getUserInfo',
        // PUT REQUEST
        approval: "faculty/mentorAssignment/approval"
    }),

    btn(type, value, transactionId) {
      this.btnValue = value
      if(type === 'endorse' || type === 'returned' || type === 'disapproved') {
        // console.log(transactionId)
          this.deleteRow(transactionId)
          this.approval({transactionId, type: type, remarks: this.remarks})
          this.updateTxnIndicator++
          this.show = false
      }

      if(type === 'modalReturn' || type === 'modalDisapprove') {
          this.confirmId = transactionId
          this.show = true
      }
    },

    openDetails(data) {
      this.getData({ //fetch requested mentors
        link: 'mentor-assignments',
        fetchType: 'request_mentor',
        data: {
          page: this.options.page,
          advisee:true,
          uuid: data.uuid, //student uuid
          items: this.options.numOfItems,
      }})

      this.getUserInfo({data: {
          student_information: true,
          uuid: data.uuid //student uuid
      }})

      this.getActive({data:{
          uuid: this.$auth.user.uuid, //faculty uuid
          is_adviser:true,
          active_mentor:true,
          items: this.options.numOfItems,
          page: this.options.page,
      }})

      this.updateDrawer(data)
      this.studentUuid = data.uuid
    },

    openDrawer(data) {
      this.showDrawer = true
    },

    onUpdateFaculty(data){
      console.log(data)
    },  
    
    fetchTableData(page) { // reusable function for getting the data to be displayed in txn history
      this.getData({ //fetch students data
        // link: 'mentors',
        fetchType: 'table_data',
        data: {
            page: page,
            advisee: true,
            table_filters: true,
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
        // console.log(options.filters)
        this.options.numOfItems = options.numOfItems
        this.updateFilterValues(options.filters)
        this.fetchTableData(1)
    },
    handlePagination(page) {
      this.fetchTableData(page)
    },

    // updateTxn(){
    //     this.updateTxnIndicator++
    // }
  },
  watch: {
    closeModal() {
      this.show = false
    }
  }
}
</script>