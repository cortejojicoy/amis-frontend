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
        <div class="flex justify-end">
          <button @click="updateDrawer" class="bg-blue-500 text-white p-2 rounded mb-2">
              View Curriculum
          </button>
        </div>
        <div v-if="!isLoading">
          <ApplyCoursework :courseWorkCount="getGEElectivesCount" :courses="getCurriculumCourses" :courseworkType="'GE ELECTIVE'">

          </ApplyCoursework>
        </div>
        <Loader v-else :loaderType="'table'" :columnNum="4"/>
        <hr class="border-2 border-solid border-black mb-6" />
      </div>
    </div>
    <GenericDrawer :isOpen="showDrawer" @closeDrawer="updateDrawer">
      <template v-slot:content>
        <div v-if="!isLoading" class="w-full mb-4">      
          <div class="flex flex-wrap justify-start mb-4">
            <div class="w-full text-lg font-bold my-2">
              Curriculum Structure
            </div>
            <div class="flex flex-wrap justify-center">
              <div v-for="(semYearData, semYearDataIndex) in getCurriculumStructures" :key="semYearDataIndex" class="w-full md:w-1/2 mt-2">
                <CurriculumStructure :curriculumDetails="semYearData" :curriculumCourses="getCurriculumCourses" :index="semYearDataIndex"/>
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
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import ApplyCoursework from "../../components/plan-of-coursework/applyCoursework.vue";
import CurriculumStructure from "../../components/academic-catalog/CurriculumStructure.vue";

export default {
  components: {
    ApplyCoursework,
    CurriculumStructure
  },
  data () {
    return {
      showDrawer: false,
      courseWorkCount: 3
    };
  },
  computed: {
      ...mapState({
        isLoading: state => state.student.planOfCoursework.geCoursework.loading,
      }),
      ...mapGetters({
        getGEElectivesCount: "student/planOfCoursework/geCoursework/getGEElectivesCount",
        getCurriculumCourses: "student/planOfCoursework/geCoursework/getCurriculumCourses",
        getCurriculumStructures: "student/planOfCoursework/geCoursework/getCurriculumStructures",
      })
  },
  async fetch() {
    this.getStudentCurriculumData({
      sais_id: this.$auth.user.sais_id
    })
  },
  methods:{
    ...mapActions({
      getStudentCurriculumData: "student/planOfCoursework/geCoursework/getStudentCurriculumData"
    }),
    updateDrawer(){
      this.showDrawer = !this.showDrawer
    },
    //get available academic years
  }
};
</script>

<style></style>
  