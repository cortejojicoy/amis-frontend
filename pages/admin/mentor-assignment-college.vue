<template>
    <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div>
            <div class="mb-4 flex items-center">
              <div class="text-2xl font-bold">Mentor Assignment (College)</div>
            </div>
          </div>
          
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

          <div>
            <GenericDrawer :isOpen="showDrawer" @closeDrawer="updateDrawer">
              <template v-slot:content>
                <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
                  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <StudentInfo :studentData="studInfo"/>
                    <hr class="border-2 border-solid border-black mb-6" />
                    <StudentActiveMentor :mentorData="getActitveMentorByUuid"/>

                    <!-- {{ getActitveMentorByUuid }} -->
                    
                    <MentorAssignmentTable :navbar="menu" :mentorTable="getRequestedMentorByUuid" :uuid="studentUuid">
                      <template v-slot:action="id">
                        <button @click="btn('approved', id.id)" class="bg-green-500 text-white p-2 rounded">Approved</button>
                        <button @click="btn('modalDisapprove', id)" class="bg-red-500 text-white p-2 rounded">Disapproved</button>
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
                    <div class="text-right">
                      <button class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60" :value="confirmId.id" @click="btn('disapproved','', $event.target.value);">Confirm</button>
                    </div>
                </template>
            </VTailwindModal>
          </div>

          
          <TransactionHistory :txnType="'matxns'" :userRole="'admins'" :txnFilters="txnFilters" :update="updateTxnIndicator"/>
        
        </div>
      </div>
    
    
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import GenericTable from '../../components/GenericTable.vue';
import GenericDrawer from '../../components/GenericDrawer.vue';
import TransactionHistory from '../../components/TransactionHistory.vue';
import VTailwindModal from "../../components/VTailwindModal.vue";
import StudentInfo from '../../components/StudentInfo.vue';
import StudentActiveMentor from '../../components/mentor-assignment/StudentActiveMentor.vue';
import MentorAssignmentTable from '../../components/mentor-assignment/MentorAssignmentTable.vue';
export default {
    components: { GenericDrawer, GenericTable, TransactionHistory, StudentActiveMentor, MentorAssignmentTable, StudentInfo, VTailwindModal },
    data() {
        return {
          menu: 'mentor-assignment-college',
          confirmId: 0,
          show: false,
          remarks: '',
          showDrawer: false,
          maCss: true,
          studentUuid: '',
          module: 'admins/admin-ma',
          headers: [
            "name",
            "program",
            "student_status",
            "mentor",
            "role",
            "status"
          ],
          updateTxnIndicator: 0,
          options: {
            page: 1,
            filters: {},
            numOfItems: 5
          },

          filters: [
            {field: "uuid", name: 'name', type: 'combobox', label: 'filter by name'},
            {field: 'student_program_records.academic_program_id', name: 'program', type: 'select', label: 'filter by program'},
            {field: 'student_program_records.status', name: 'student_status', type: 'select', label: 'filter by status'},
            {field: 'mentor_name', name: 'mentor_name', type: 'select', label: 'filter by mentor'},
            {field: 'mentor_role', name: 'mentor_role', type: 'select', label: 'filter by role'},
            {field: 'mentor_status', name: 'mentor_status', type: 'select', label: 'filter by status'}
          ],
          txnFilters: [
            {field: 'ma.id', name: 'id', type: 'combobox', label: 'transaction id'},
            {field: 'action', name: 'action', type: 'select', label: 'status'},
            {field: 'ma.mentor_name', name: 'mentor_name', type: 'combobox', label: 'mentor'}
          ],
        }
    },

    computed: {
      ...mapState({
          filterData: state => state.mentorAssignment.filters,
          dataLoading: state => state.mentorAssignment.loading,
          studInfo: state => state.mentorAssignment.studInfo,
          initialLoad: state => state.mentorAssignment.initialLoad,
          tableFilterValues: state => state.mentorAssignment.filterValues
      }),

      getActitveMentorByUuid() {
          return this.getActiveMentor(this.studentUuid)
      },  

      getRequestedMentorByUuid() {
          return this.getRequestedMentor(this.studentUuid)
      }, 
 
      getTableDataByPage() {
          return this.getTableData(this.menu)
      },

      ...mapGetters({
          getTableData : "mentorAssignment/getTableData",
          getActiveMentor: "admin/mentorAssignment/getActiveMentor",
          getRequestedMentor: "admin/mentorAssignment/getRequestedMentor"
          
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
        deleteRow: "admin/mentorAssignment/DELETE_ROW",
        updateNumOfItems: 'mentorAssignment/UPDATE_NUM_OF_ITEMS',
        updateFilterValues: 'mentorAssignment/UPDATE_FILTER_VALUES',
    }),
    
    ...mapActions({
        getMentors: 'admin/mentorAssignment/getData',
        getData: 'mentorAssignment/getData',
        getActive: 'admin/mentorAssignment/getActive',
        getFilters: 'mentorAssignment/getFilters',
        getStudentInfo: 'mentorAssignment/getStudentInfo',
        // PUT REQUEST
        approval: "admin/mentorAssignment/approval"
    }),

    btn(type, transactionId) {
      if(type === 'approved' || type === 'disapproved') {
        // console.log(transactionId)
          this.deleteRow(transactionId)
          this.approval({transactionId, type: type, remarks: this.remarks})
          this.show = false
      }

      if(type === 'modalDisapprove') {
          this.confirmId = transactionId
          this.show = true
      }
    },

    openDetails(data) { 
      this.getMentors({data: {
          page: this.options.page,
          is_admin:true,
          request_mentor:true,
          uuid: data.uuid,
          items: this.options.numOfItems,
      }})

      this.getActive({data: {
          uuid: data.uuid,
          is_admin: true,
          active_mentor:true,
          items: this.options.numOfItems,
          page: this.options.page,
      }})

      this.getStudentInfo({data: {
          student_information: true,
          uuid: data.uuid
      }})

      this.updateDrawer(data)
      this.drawerData = data
      this.studentUuid = data.uuid
    },

    openDrawer(data) {
      this.showDrawer = true
      this.drawerData = data
    },

    fetchTableData(page) { // reusable function for getting the data to be displayed in txn history
      this.getData({
        link: this.module,
        data: {
            is_admin: true,
            table_data: true,
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
  }
}
</script>