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
          <div v-show="isAdmin">
              <div v-if="isUnitTag != ''">
                  <UnitEndorsement @onUpdateTxn="updateTxn" v-if="studentId != 0" :studentId="studentId"/>
              </div>
              <div v-else-if="isCollegeTag != ''">
                  <CollegeApproval @onUpdateTxn="updateTxn" v-if="studentId != 0" :studentId="studentId"/>
              </div>
          </div>
          <div v-show="isFaculty">
              <div v-if="mentorRole == 'Adviser'">
                  <AdviserEndorsement v-if="studentId != 0" :studentId="studentId"/>
              </div>
              <div v-else>
                  <FacultyNominated v-if="studentId != 0" :studentId="studentId"/>
              </div>
          </div>
        </div>
      </div>
    </aside>

  </nav>
</template>

<script>

import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import StudentInfo from '../StudentInfo.vue';
import UnitEndorsement from './_UnitEndorsement.vue';
import CollegeApproval from './_CollegeApproval.vue';
import AdviserEndorsement from './_AdviserEndorsement.vue';
import FacultyNominated from './_FacultyNominated.vue';
export default {
    components: { StudentInfo, UnitEndorsement, CollegeApproval, AdviserEndorsement, FacultyNominated },
    data: () => ({
        isOpen: false,
        studentId: 0,
        studentName: '',
        studentProgram: '',
        studentStatus: '',
        studentEmail: '',
        isUnitTag: String,
        isCollegeTag: String,
        mentorRole: String
    }), 
    computed: {
        ...mapGetters({
            showDrawer: "maTable/getDrawerStatus",
            getStudentInfo: "maTable/getStudent",
            getTags: "admin/mentorAssignment/checkTags/getTags",
            getMentorRole: "faculty/mentorRole/getMentorRole",
            getDrawer: "maTable/getDrawer"
      }),
      isAdmin() {
        if(this.$auth.user.roles) { 
          const roles = this.$auth.user.roles;
          return roles.find(el => el.name === "admin") ? true : false;
        } else {
          return false
        }
      },
      isFaculty() {
        if(this.$auth.user.roles) {
          const roles = this.$auth.user.roles;
          return roles.find(el => el.name === "faculty") ? true : false;
        } else {
          return false
        }
      }
    },
    async fetch() {
        if(this.isAdmin) { this.tags() }
        if(this.isFaculty) { this.checkMentorRole(this.$auth.user.sais_id) }
    },
    methods: {
        ...mapActions({
            tags: "admin/mentorAssignment/checkTags/getData",
            checkMentorRole: "faculty/mentorRole/getData"
        }),
        closeDrawer() {
            this.$emit("close");
            this.studentId = 0;
        },
        updateTxn(){
            this.$emit("onUpdateMATxn")
        }
    },

    watch: {
        showDrawer(value) {
            this.isOpen = value
            // console.log
        },
        getStudentInfo(data) {
            this.studentId = data.studId 
            this.studentName = data.studName 
            this.studentProgram = data.studProgram 
            this.studentStatus = data.studStatus 
        },
        getTags(tags) {
            this.isUnitTag = tags[0].unit,
            this.isCollegeTag = tags[0].college
        },
        getMentorRole(role) {
            role.map((item)=> {
                if(item.sais_id == this.$auth.user.sais_id) {
                    this.mentorRole = item.mentor_role
                }
            })
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