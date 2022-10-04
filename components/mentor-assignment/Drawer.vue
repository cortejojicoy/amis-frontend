<template>
  <nav
  class="flex fixed w-full items-center justify-between px-6 bg-transparent text-gray-700 z-10">
  <transition
    enter-class="opacity-0"
    enter-active-class="ease-out transition-medium"
    enter-to-class="opacity-100"
    leave-class="opacity-100"
    leave-active-class="ease-out transition-medium"
    leave-to-class="opacity-0">
  </transition>
  

  <aside class="transform top-16 right-0 w-full bg-gray-100 fixed h-full shadow-md overflow-auto ease-in-out transition-all duration-300 z-10 p-10"
    :class="isOpen ? '-translate-x-0' : 'translate-x-full'">
    <span @click="isOpen = false" class="justify-right items-right">
      <button class="px-4 p-2 mb-6 justify-right items-right text-white bg-red-400 hover:bg-red-600" @click="closeDrawer">
        Close
      </button>
    </span>
    <!-- MENTOR ASSIGNMENT REQUEST -->
    <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <StudentInfo 
              :studentName="studentName"
              :studProgram="studentProgram"
              :studentStatus="studentStatus"
              :studentEmail="studentEmail"
              
          />
        <hr class="border-2 border-solid border-black mb-6" />
        <MentorAssignment
            v-if="studentId != 0 && studentIndex != 0"
            :studentId="studentId"
            :studentIndex="studentIndex"
            :mLink="'ma'" 
            :maLink="maLink"
            :roles="userRoles"
            :adminType="admin"
            :facultyType="faculty"
            @onUpdateTxn="updateTxn"
        />
      </div>
    </div>
  </aside>

</nav>
</template>

<script>

import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import StudentInfo from '../StudentInfo.vue';
import MentorAssignment from './MentorAssignment.vue';
export default {
  components: { StudentInfo, MentorAssignment },
  data: () => ({
      isOpen: false,
      studentId: 0,
      studentIndex: 0,
      studentName: '',
      studentProgram: '',
      studentStatus: '',
      studentEmail: '',
  }), 
  props: {
      admin: String,
      userRoles: String,
      mLink: String,
      maLink: String,
      faculty: String
  },
  computed: {
      ...mapGetters({
          showDrawer: "maTable/getDrawerStatus",
          getStudentInfo: "maTable/getStudent",
          getDrawer: "maTable/getDrawer"
    }),
  },
  methods: {
      closeDrawer() {
          this.$emit("close");
          this.studentId = 0;
      },
      updateTxn(){
          this.$emit("onUpdateMATxn");
      }
  },

  watch: {
      showDrawer(value) {
          this.isOpen = value
          // console.log
      },
      getStudentInfo(data) {
        // console.log(data)
          this.studentId = data.studId 
          this.studentIndex = data.index 
          this.studentName = data.studName 
          this.studentEmail = data.studEmail 
          this.studentProgram = data.studProgram 
          this.studentStatus = data.studStatus 
      },
      getDrawer(value) {
        if(value != 0) {
          this.isOpen = false
          this.studentId = 0
        }
      }
    }
  }
</script>