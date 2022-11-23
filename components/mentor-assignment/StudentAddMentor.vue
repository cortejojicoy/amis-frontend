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
              <!-- <td class="px-2 py-3">Field Represented</td>
              <td class="px-2 py-3">Effectivity Start</td>
              <td class="px-2 py-3">Effectivity End</td> -->
              <td class="px-2 py-3"></td>
            </tr>
          </thead>
          <tbody v-show="savedMentor">
            <tr v-for="(record, recordIndex) in savedMentor" :key="recordIndex">
              <td>
                <select :value="record.actions" @change="update('actions', record.id, $event)" class="text-md border border-gray-400 rounded p-1">
                  <option v-for="(action, actionIndex) in actionList" :key="actionIndex">
                    {{ action }}
                  </option>
                </select>
              </td>
              <td v-if="record.actions === 'Add'">
                 <div v-if="facultyName[recordIndex] != null">
                   <select :value="record.mentor_id" @change="update('mentor_id', record.id, $event)" class="text-md border border-gray-400 rounded p-1">
                     <option></option>
                     <option v-for="(mentor, mentorIndex) in facultyName" :value="mentor.sais_id" :key="mentorIndex">
                        {{ mentor.last_name+' '+mentor.first_name }}
                     </option>
                   </select>
                </div>
              </td>
              
              <td v-else>
                
                <select :value="record.mentor_id" @change="update('mentor_id', record.id, $event)" class="text-md border border-gray-400 rounded p-1">
                  <option v-for="(mentor, mentorIndex) in studActiveMentor" :key="mentorIndex + 1" :value="mentor.sais_id">
                    {{ mentor.faculty[mentorIndex].uuid.last_name+' '+mentor.faculty[mentorIndex].uuid.first_name }} 
                  </option>
                </select>
              </td>
              <td v-if="record.mentor_role == null">
                {{ record.mentor_role }}
              </td>
              <td v-else>
                <select :value="record.mentor_role" @change="update('mentor_role', record.id, $event)" class="text-md border border-gray-400 rounded p-1">
                  <option v-for="(mentorRole, mentorRoleIndex) in mRole" :key="mentorRoleIndex">
                    {{ mentorRole.titles }}
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
    <Loader v-else :loaderType="'table'" :columnNum="3"/>
    <VTailwindModal v-model="show">
      <template v-slot:title>Confirm Action</template>
        <template v-slot:content>
            <div>
                Are you sure you want to commit the following change/s? 

                <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
                    <table class="table-auto w-full items-center text-center">
                        <thead>
                            <tr class="font-bold">
                                <td class="px-2 py-3">Action</td>
                                <td class="px-2 py-3">Mentor</td>
                                <td class="px-2 py-3">Role</td>
                            </tr>
                        </thead>
                        <tr v-for="(confirmMentor, confirmMentorIndex) in savedMentor" :key="confirmMentorIndex">
                            <td class="px-2 py-3">{{ confirmMentor.actions }}</td>
                            <td class="px-2 py-3">{{ confirmMentor.mentor_name }}</td>
                            <td class="px-2 py-3">{{ confirmMentor.mentor_role }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="text-right mb-8">
                <div class="grid grid-flow-row-dense grid-cols-3">
                    <div class="col-span-2 px-8 py-2">
                        Type <b>CONFIRM</b> to confirm your action:
                    </div>
                    <div>
                        <input v-model="confirmText" type="text" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" required>
                    </div>
                </div>
                <div class="grid grid-flow-row-dense grid-cols-3">
                    <div class="col-span-2 px-8 py-2">
                        Type Google Autheticator Code to confirm your action:
                    </div>
                    <div>
                        <input type="text" disabled class=" disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:buttons>
            <div class="text-right">
                <button class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60" @click="submit">Confirm and Submit</button>
            </div>
        </template>
    </VTailwindModal>
    <div class="flex justify-end">
      <div>
        <button @click="save" :disabled="tableLength > 0 ? isNominatedMentorsLoading : ''" :class="tableLength > 0 ? 'p-2 bg-blue-500 text-white mr-2 ' : 'mr-2 p-2 bg-blue-500 text-white opacity-60 cursor-not-allowed'">Save</button>
      </div>
      <div>
        <button :disabled="tableLength > 0 ? isNominatedMentorsLoading : ''" @click="show = true" :class="tableLength > 0 ? 'p-2 bg-green-500 text-white mr-2 ' : 'mr-2 p-2 bg-green-500 text-white opacity-60 cursor-not-allowed'">Submit</button>
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
      actionStatus: "submitted",
      tableLength: 0,
      show: false
  }),
  props: {
    link: String,
    roles: String
  },
  computed: {
    ...mapState({
        mRole: state => state.student.mentorAssignment.studentAddMentor.mRole,
        facultyName: state => state.student.mentorAssignment.studentAddMentor.facultyName,
        studActiveMentor: state => state.student.mentorAssignment.studentActiveMentor.activeMentor,
        savedMentor: state => state.student.mentorAssignment.studentAddMentor.data.save_mentors,
        updateTxnIndicator: state => state.student.mentorAssignment.studentAddMentor.updateTxnIndicator,
        isNominatedMentorsLoading: state => state.student.mentorAssignment.studentAddMentor.loading,
        isModalOpen: state => state.student.mentorAssignment.studentAddMentor.show,
        isLoading: state => state.student.mentorAssignment.studentAddMentor.loading,
    }),
    ...mapGetters({
        faculties: "student/mentorAssignment/studentAddMentor/getWithoutId",
        getConfirmText: "student/mentorAssignment/studentAddMentor/getConfirmText",
    }),
    confirmText: {
          get() {
              return this.getConfirmText
          },
          set(value) {
              this.updateConfirmation(value)
          }
      }
  },
  async fetch() {
    this.getFaculties();
    this.getActive(this.$auth.user.sais_id);
    this.getNominated({
      sais_id: this.$auth.user.sais_id,
      link: this.link,
      roles: this.roles
    });
  },
  methods: {
    ...mapActions({
        getNominated: "student/mentorAssignment/studentAddMentor/getData",
        updateToSaved: "student/mentorAssignment/studentAddMentor/updateToSaved",
        updateToSubmitted: "student/mentorAssignment/studentAddMentor/updateToSubmitted",
        submitRequestedMentors: "student/mentorAssignment/studentAddMentor/confirm",

        // getActive: "student/studentDetails/getData",
        getActive: "student/mentorAssignment/studentActiveMentor/getData",
        getFaculties: "faculty/getData",
    }),
    ...mapMutations({
        addRow: "student/mentorAssignment/studentAddMentor/ADD_ROW",
        deleteRow: "student/mentorAssignment/studentAddMentor/DELETE_ROW",
        changeField: "student/mentorAssignment/studentAddMentor/CHANGE_FIELD_STATE",
        updateConfirmation: "student/mentorAssignment/studentAddMentor/UPDATE_CONFIRMATION"

    }),
    deleteRecord(id) {
      this.deleteRow(id);
    },
    
    add() {
      this.addRow(this.$auth.user.sais_id)
      this.clickedAdd++
    },

    update(field, id, event) {
      // console.log(field, id, event.target.value)
      this.changeField({
        "field": field,
        "newValue": event.target.value,
        "id": id
      });
      if (field === "mentor_id") {
        this.changeField({
          "field": "mentor_name",
          "newValue": event.target.options[event.target.selectedIndex].text,
          "id": id
        });
      }
      
    },

    save() {
      this.updateToSaved({
          data: this.faculties,
          sais_id: this.$auth.user.sais_id
      });
    },

    submit() {
      if(this.getConfirmText == "CONFIRM") {
          this.updateToSubmitted({
              data: this.faculties,
              sais_id: this.$auth.user.sais_id,
              status: this.actionStatus
          })
      }
      this.submitRequestedMentors({
          data: this.faculties,
          sais_id: this.$auth.user.sais_id
      })
      
      this.show = false;
    }
  },
  watch: {
      updateTxnIndicator(newVal, oldVal) {
          this.$emit('onUpdateTxn')
      },
      isModalOpen() {
          this.show = false
      },
      savedMentor(data) {
        if(data) {
            this.tableLength = data.length
        }
      }
  },
}
</script>
