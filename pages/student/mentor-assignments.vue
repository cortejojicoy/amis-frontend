<template>
    <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
        <div class="py-12">
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div v-if="!isLoading">
            <StudentInfo :studentData="studInfo" :is_student="is_student"/>
            </div>
            <Loader v-else :loaderType="'table'" :columnNum="2"/>
            <hr class="border-2 border-solid border-black mb-6" />
            <StudentActiveMentor :mentorData="getActitveMentorByUuid" :is_adviser="is_adviser"/>
            <hr class="border-2 border-solid border-black mb-6" />
            <div v-if="!isLoading">
            <StudentAddMentor 
                :saveMentor="savedMentor" 
                :mentorData="getActitveMentorByUuid" 
                @mentorRoleId="changeField"
                @storeMentors="saveData"
                @submitRequest="submitData" 
                @onUpdateTxn="updateTxn"
              />
            </div>
            <Loader v-else :loaderType="'table'" :columnNum="3"/>
            <hr class="border-2 border-solid border-black mb-6" />
            <TransactionHistory :txnType="'matxns'" :userRole="'students'"  :update="updateTxnIndicator" :txnFilters="txnFilters"/>
            <!-- {{ facultyName }} -->
          </div>
        </div>
      </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import StudentActiveMentor from "../../components/mentor-assignment/StudentActiveMentor.vue";
import StudentAddMentor from "../../components/mentor-assignment/StudentAddMentor.vue";
import TransactionHistory from '../../components/TransactionHistory.vue';
import GenericTable from '../../components/GenericTable.vue';
import StudentInfo from "../../components/StudentInfo.vue";
export default {
  components: { TransactionHistory, GenericTable, StudentInfo, StudentActiveMentor, StudentAddMentor },
  data() {
    return {
        menu: 'student-mentor-assignment',
        transactionId: '',
        is_student: true,
        is_adviser: true,
        faculty_list: true,
        module: 'mentors',
        updateTxnIndicator: 0,
        options: {
          page: 1,
          filters: {},
          numOfItems: 5
        },
        filters: [
          {field: 'name', name: 'name', type: 'combobox', label: 'filter by name'},
          {field: 'program', name: 'program', type: 'select', label: 'filter by program'},
          {field: 'status', name: 'student_status', type: 'select', label: 'filter by status'},
          {field: 'mentor_name', name: 'mentor_name', type: 'select', label: 'filter by mentor'},
          {field: 'mentor_role', name: 'mentor_role', type: 'select', label: 'filter by role'},
          {field: 'mentor_status', name: 'mentor_status', type: 'select', label: 'filter by status'}
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
        studInfo: state => state.mentorAssignment.studInfo,
        mentorAssignment: state => state.mentorAssignment.mentorData,
        filterData: state => state.student.mentorAssignment.filters,
        isLoading: state => state.student.mentorAssignment.loading,
        savedMentor: state => state.student.mentorAssignment.studSaveMentor,
        tableFilterValues: state => state.student.mentorAssignment.filterValues,
        closeModal: state => state.student.mentorAssignment.closeModal,
        updateTxn: state => state.student.mentorAssignment.updateTxnIndicator,
    }),

    getActitveMentorByUuid() {
        return this.getActiveMentor(this.$auth.user.uuid, this.menu)
    },  

    ...mapGetters({
        getActiveMentor: "mentorAssignment/getActiveMentor"
    })


  },
  async fetch() {
    this.fetchTableData(this.options.page)
    this.getMentorRole()
    this.getFaculty({
      data: { faculty_list: this.faculty_list }
    })
  },

  methods: {
    ...mapActions({
        getData: 'student/mentorAssignment/getData',
        getActive: 'mentorAssignment/getData',
        getFaculty: 'mentorAssignment/getFaculty',
        getMentorRole: 'mentorAssignment/getMentorRole',
        getUserInfo: 'mentorAssignment/getUserInfo',
        
        saveRequestedMentors: 'student/mentorAssignment/saveRequestedMentors',
        submitRequestedMentors: 'student/mentorAssignment/submitRequestedMentors'
    }),

    ...mapMutations({
        activeMentor: "student/mentorAssignment/ACTIVE_MENTOR",
        updateField: "student/mentorAssignment/CHANGE_FIELD_STATE",
    }),

    fetchTableData(page) { // reusable function for getting the data to be displayed in txn history
      this.activeMentor(this.mentorAssignment)
      this.getData({data: {
          student_add_mentor: true,
          uuid: this.$auth.user.uuid
      }})

      if(this.is_student) {
        this.getActive({link: this.module, data: {
            is_student: true,
            mentors_information: true, 
            uuid: this.$auth.user.uuid,
            page: page,
            items: this.options.numOfItems,
        }})

        this.getUserInfo({data: {
            student_information: true,
            uuid: this.$auth.user.uuid
        }})
      }
    },
    

    changeField(data, id) {
        this.updateField({
            "field3": "mentor_role",
            "newValue3": data,
            "id": id
        })
    },  

    submitData(data, type) {
      // console.log(data)
      this.submitRequestedMentors({
          uuid: this.$auth.user.uuid,
          data: data,
          type: type
      })
    },

    saveData(data) {
        this.saveRequestedMentors({
            uuid: this.$auth.user.uuid, 
            data: data
        })
    },

    // updateTxn(){
    //     this.updateTxnIndicator++
    // }
  },
  watch: {
    updateTxn(){
        this.updateTxnIndicator++
    }
  }
}
</script>