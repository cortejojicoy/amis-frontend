<template>
  <div class="my-6">
    <div class="flex justify-between mb-6">
      <div>
        <button @click="addRemoveMentor" class="p-2 bg-gray-300 btn" :disabled="isNominatedMentorsLoading">Add/Remove a
          Mentor</button>
        <CircSpinner :isLoading="isNominatedMentorsLoading" />
      </div>
    </div>
    <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
      <div class="div" v-show="nominatedMentors">


        <table class="table-auto w-full items-center text-center">
          <thead>
            <tr class="font-bold">
              <td class="px-2 py-3">Action</td>
              <td class="px-2 py-3">Mentor</td>
              <td class="px-2 py-3">Role</td>
              <!-- <td class="px-2 py-3">Field Represented</td>
              <td class="px-2 py-3">Effectivity Start</td>
              <td class="px-2 py-3">Effectivity End</td> -->
              <td class="px-2 py-3"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, recordIndex) in nominatedMentors" :key="recordIndex">
              <td>
                <!-- {{record.actions}} -->
                <select :value="record.actions" @change="updateMentorRecord('actions', record.id, $event)" class="bg-gray-50 border border-gray-300 text-gray-900 text-small p-1">
                  <option v-for="(action, actionIndex) in actionList" :key="actionIndex">
                    {{ action }}
                  </option>
                </select>
              </td>
              <td v-if="record.actions === 'Add'">
                <!-- <select :value="record.mentor_id" @change="updateMentorRecord('mentor_id', record.id, $event)"> -->
                <select :value="record.mentor_id" @change="updateMentorRecord('mentor_id', record.id, $event)" class="bg-gray-50 border border-gray-300 text-gray-900 text-small p-1">
                  <option></option>
                  <option v-for="(mentor, mentorIndex) in facultyNames" :value="mentor.sais_id" :key="mentorIndex">
                    {{ mentor.mentor_name }}
                  </option>
                </select>
              </td>
              <td v-else>
                <select :value="record.mentor_id" @change="updateMentorRecord('mentor_id', record.id, $event)" class="bg-gray-50 border border-gray-300 text-gray-900 text-small p-1">
                  <option v-for="(mentor, mentorIndex) in activeMentor" :key="mentorIndex + 1" :value="mentor.sais_id">
                    {{ mentor.mentor_name }}
                  </option>
                </select>
              </td>
              <td>
                <select :value="record.mentor_role" @change="updateMentorRecord('mentor_role', record.id, $event)" class="bg-gray-50 border border-gray-300 text-gray-900 text-small p-1">
                  <option v-for="(mentorRole, mentorRoleIndex) in roleList" :key="mentorRoleIndex">
                    {{ mentorRole }}
                  </option>
                </select>
              </td>
              <!-- <td>{{ record.field_represented }}</td>
              <td>{{ record.effectivity_start }}</td>
              <td>{{ record.effectivity_end }}</td> -->
              <td class="px-2 py-3">
                <button @click="deleteRecord(record.id)" :disabled="isNominatedMentorsLoading">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-end">
      <div>
        <button class="p-2 bg-gray-200 mr-2" @click="clickSaveMentor"
          :disabled="isNominatedMentorsLoading">Save</button>
      </div>
      <div>
        <div class="modal" v-show="isModalOpen">
          <ConfirmAddRemoveMentor class="modal-content" @close-modal="isModalOpen = false"/>
        </div>
        <button class="p-2 bg-gray-200" :disabled="isNominatedMentorsLoading" @click="isModalOpen = true">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import ConfirmAddRemoveMentor from './ConfirmAddRemoveMentor.vue';
import CircSpinner from './CircSpinner.vue';
export default {
  data() {
    return {
      actionList: ["Add", "Remove"],
      roleList: ["Adviser", "Member"],
      isModalOpen: false
    };
  },
  computed: {
    ...mapState({
      nominatedMentors: state => state.student.mentorAssignment.nominatedMentor.data.save_mentors,
      isNominatedMentorsLoading: state => state.student.mentorAssignment.nominatedMentor.loading,
      faculties: state => state.faculty.faculty.data,
      // activeMentors: state => state.student.mentorAssignment.activeMentorAssignment.data.active_mentors,
    }),
    ...mapGetters({
      facultyNames: "faculty/faculty/getNameId",
      withoutTempID: "student/mentorAssignment/nominatedMentor/withoutTempID",
      activeMentor: "student/mentorAssignment/activeMentorAssignment/getActiveMentors"

    })
  },
  async fetch() {
    this.getFaculties();
    this.getActiveMentors();
    this.getNominatedMentors(this.$auth.user.sais_id);
  },
  methods: {
    ...mapActions({
      getNominatedMentors: "student/mentorAssignment/nominatedMentor/getData",
      saveMentors: "student/mentorAssignment/nominatedMentor/updateData",
      getFaculties: "faculty/faculty/getData",
      getActiveMentors: "student/mentorAssignment/activeMentorAssignment/getData",
    }),
    ...mapMutations({
      addRow: "student/mentorAssignment/nominatedMentor/ADD_ROW",
      deleteRow: "student/mentorAssignment/nominatedMentor/DELETE_ROW",
      updateMentor: "student/mentorAssignment/nominatedMentor/CHANGE_FIELD_STATE"
    }),
    deleteRecord(id) {
      this.deleteRow(id);
    },
    addRemoveMentor() {
      this.addRow(this.$auth.user.sais_id);
    },

    updateMentorRecord(field, id, event) {
      this.updateMentor({
        "field": field,
        "newValue": event.target.value,
        "id": id
      });
      if (field === "mentor_id") {
        this.updateMentor({
          "field": "mentor_name",
          "newValue": event.target.options[event.target.selectedIndex].text,
          "id": id
        });
      }
    },

    clickSaveMentor() {
      this.saveMentors({
        data: this.withoutTempID,
        sais_id: this.$auth.user.sais_id
      });
    },
  },
  components: { CircSpinner, ConfirmAddRemoveMentor }
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  padding-top: 100px;
  width: 100%;
  height: 100%;
  background-color: gray;
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}
</style>