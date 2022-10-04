<template>
  <div class="my-6">
    <div class="flex justify-between mb-6">
      <div>
        <button @click="add" class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60" :disabled="isNominatedMentorsLoading">Add/Remove a
          Mentor</button>
        <CircSpinner :isLoading="isNominatedMentorsLoading" />
      </div>
    </div>
    <div class="bg-white shadow-xl sm:rounded-lg mb-4 flex flex-wrap lg:flex-nowrap flex-col md:flex-row md:justify-around" v-if="!isLoading">
      <table class="table-auto w-full items-center text-center">
          <thead>
            <tr class="font-bold">
              <td class="px-2 py-3">Action</td>
              <td class="px-2 py-3">Mentor</td>
              <td class="px-2 py-3">Role</td>
              <td class="px-2 py-3"></td>
            </tr>
          </thead>
          <tbody >
            <tr v-for="(ma, maIndex) in mentorAssignment" :key="maIndex">
              <td>actions</td>
              <td>mentor</td>
              <td>role</td>
              <td></td>
            </tr>
          </tbody>
        </table>
    </div>
    <Loader v-else :loaderType="'table'" :columnNum="3"/>

    <div class="flex justify-end">
      <div>
        <button class="p-2 bg-gray-200 mr-2" @click="save" :disabled="isNominatedMentorsLoading">Save</button>
      </div>
      <div>
        <button class="p-2 bg-gray-200" :disabled="isNominatedMentorsLoading" @click="show = true">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import CircSpinner from '../CircSpinner.vue';
import Loader from "../Loader.vue";
import VTailwindModal from "../VTailwindModal.vue";
export default {
  components: { Loader, CircSpinner, VTailwindModal },
  data: () => ({
      actionList: ["Add", "Remove"],
      roleList: ["Adviser", "Member"],
      actionStatus: "submitted",
      show: false,
      noData: true,

  }),
  props: {
      link: String,
      roles: String
  },
  computed: {
    ...mapState({
        mentorAssignment: state => state.mentorAssignment.addRemoveMentor.data.save_mentors
    }),
    ...mapGetters({
      
    }),

  },
  async fetch() {
      this.getSaveMentor({
        sais_id: this.$auth.user.sais_id,
        link: this.link,
        roles: this.roles
      })
  },
  methods: {
    ...mapActions({
        getSaveMentor: "student/mentorAssignment/addRemoveMentor/getSaveMentor",
    }),
    ...mapMutations({
      

    }),
    deleteRecord(id) {
      this.deleteRow(id);
    },
    
    add() {
      this.addRow(this.$auth.user.sais_id);
    },

    update(field, id, event) {
      
    },

    save() {
      
    },

    submit() {

    }
      
  },
  watch: {
      updateTxnIndicator(newVal, oldVal) {
          this.$emit('onUpdateTxn')
      },
      isModalOpen() {
        this.show = false
      }
  },
}
</script>
