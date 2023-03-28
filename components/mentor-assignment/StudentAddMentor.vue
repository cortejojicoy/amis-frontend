<template>
    <div class="my-6">
      <div class="flex justify-between mb-6">
        <div>
          <button @click="btn('add')" class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60" :disabled="isLoading">Add/Remove a Mentor</button>
          <CircSpinner :isLoading="isLoading" />
        </div>
      </div>
      <div  v-if="!isLoading" class="bg-white shadow-xl sm:rounded-lg mb-4 flex flex-wrap lg:flex-nowrap flex-col md:flex-row md:justify-around" >
        <table class="table-auto w-full items-center text-center">
            <thead>
              <tr class="font-bold">
                <td class="px-2 py-3">Action</td>
                <td class="px-2 py-3">Mentor</td>
                <td class="px-2 py-3">Role</td>
                <td class="px-2 py-3">Remarks</td>
                <!-- <td class="px-2 py-3">Field Represented</td>
                <td class="px-2 py-3">Effectivity Start</td>
                <td class="px-2 py-3">Effectivity End</td> -->
                <td class="px-2 py-3"></td>
              </tr>
            </thead>
            
            <tbody v-show="saveMentor">
              <tr v-for="(record, recordIndex) in saveMentor" :key="recordIndex"> 
                <td>
                  <select :value="record.actions" @change="(value) => update('actions', record.id, value)" class="text-md border border-gray-400 rounded p-1">
                    <option v-for="(action, actionIndex) in actionList" :key="actionIndex">
                      {{ action }}
                    </option>
                  </select>
                </td>

                <td v-if="record.actions === 'Add'">
                  <v-select 
                      :label="'faculty_name'" 
                      :dropdown-should-open="dropdownShouldOpen"
                      :options="facultyList"
                      :value="record.mentor_name"
                      @input="(value) => update('mentor_id', record.id, value)">
                  </v-select>
                </td>
                
                <td v-else>
                  <select :value="record.faculty_id" @change="update('remove_mentor', record.id, $event);" class="w-full text-md border border-gray-400 rounded p-1">
                    <option v-for="(mentor, mentorIndex) in mentorData" :key="mentorIndex + 1" :value="mentor.faculty_id">
                      {{ mentor.mentor_name }}
                    </option>
                  </select>
                </td>

                <td>
                  <select :value="record.mentor_role" @change="(value) => update('mentor_role', record.id, value)" class="text-md border border-gray-400 rounded p-1">
                    <option v-for="(mentorRole, mentorRoleIndex) in mentorRoles"  :key="mentorRoleIndex" :value="mentorRole.id">
                        {{ mentorRole.titles }}
                    </option>
                  </select>
                </td>

                <td>
                  <!-- <textarea v-model="remarks" placeholder="limit to 280 characters" class="w-full border border-gray-400 rounded p-1 md:w-38" type="text" rows="2" maxlength="280"></textarea> -->
                  <textarea 
                      :value="record.remarks"
                      @input="update('remarks', record.id, $event)" 
                      placeholder="limit to 280 characters" 
                      class="w-full border border-gray-400 rounded p-1 md:w-38" 
                      type="text" 
                      rows="2" 
                      maxlength="280">
                  </textarea>
                </td>
                
                <!-- 
                <td> field_represented </td>
                <td> effectivity_start </td>
                <td> effectivity_end </td>
                -->
                <td class="px-2 py-3">
                  <button @click="btn('delete', record.id)" :disabled="isLoading">
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
                                <td class="px-2 py-3">Remarks</td>
                            </tr>
                        </thead>
                        <tr v-for="(mentor, mentorIndex) in saveMentor" :key="mentorIndex">
                          <td class="px-2 py-3">{{ mentor.actions }}</td>
                          <td class="px-2 py-3">{{ mentor.mentor_name }}</td>
                          <div v-for="(role, roleIndex) in mentorRoles" :key="roleIndex">
                            <td class="px-2 py-3" v-if="role.id == mentor.mentor_role">
                              {{ role.titles }}
                            </td>
                          </div>
                          <td class="px-2 py-3">{{ mentor.remarks }}</td>
                        </tr>
                    </table>
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
                  <!-- <div class="grid grid-flow-row-dense grid-cols-3">
                      <div class="col-span-2 px-8 py-2">
                          Type Google Autheticator Code to confirm your action:
                      </div>
                      <div>
                          <input type="text" disabled class=" disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                      </div>
                  </div> -->
              </div>
            </div>
        </template>
        <template v-slot:buttons>
          <div class="text-right">
            <button @click="btn('submit')" class="bg-green-500 text-white p-2 rounded w-full disabled:opacity-60">Submit</button>
          </div>
        </template>
      </VTailwindModal>

      <div class="flex justify-end">
        <div>
          <button @click="btn('save')" class="p-2 bg-blue-500 text-white mr-2">Save</button>
        </div>
        <div>
          <button :disabled="saveMentor.length > 0 ? isLoading : ''" @click="btn('modal');" :class="saveMentor.length > 0 ? 'p-2 bg-green-500 text-white mr-2 ' : 'mr-2 p-2 bg-green-500 text-white opacity-60 cursor-not-allowed'">Submit</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import "vue-select/dist/vue-select.css";
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import CircSpinner from '../CircSpinner.vue';
  import VTailwindModal from "../VTailwindModal.vue";
  import Loader from "../Loader.vue";
  export default {
    components: { Loader, CircSpinner, VTailwindModal },
    data: () => ({
        actionList: ["Add", "Remove"],
        actions: '',
        tableLength: 0,
        notificationModal: '',
        facultyId: 0,
        type: '',
        show: false,
        notif: true,
    }),
    props: {
      link: String,
      roles: String,
      saveMentor: {
        type: Array
      },
      mentorData: {
        type: Array
      },
    },

    computed: {
      ...mapState({
          facultyList: state => state.mentorAssignment.facultyList,
          mentorRoles: state => state.mentorAssignment.mentorRoles,
          studActiveMentor: state => state.mentorAssignment.studActiveMentor,
          isLoading: state => state.student.mentorAssignment.loading,
          closeModal: state => state.student.mentorAssignment.closeModal
      }),

      getMentorRoleId() {
          return this.maRoleId(this.facultyId)
      },  

      // getNotificationModal() {
      //     return this.notifModal(this.notificationModal)
      // },

      ...mapGetters({
          getWithoutId: "student/mentorAssignment/getWithoutId",
          getConfirmText: "student/mentorAssignment/getConfirmText",
          getRemarks: "student/mentorAssignment/getRemarks",
          maRoleId: "mentorAssignment/getMentorRoleId",
      }),

      confirmText: {
        get() {
          return this.getConfirmText
        },
        set(value) {
          this.updateConfirmation(value)
        }
      },
    },

    methods: {
      ...mapMutations({
          addRow: "student/mentorAssignment/ADD_ROW",
          deleteRow: "student/mentorAssignment/DELETE_ROW",
          changeField: "student/mentorAssignment/CHANGE_FIELD_STATE",
          updateConfirmation: "student/mentorAssignment/UPDATE_CONFIRMATION",
          updateRemarks: "student/mentorAssignment/UPDATE_REMARKS",
          pushActiveMentor: "student/mentorAssignment/GET_ACTIVE_MENTOR",
          
          // forSubmit: "mentorAssignment/FOR_SUBMIT_DATA",
          unsetRoles: "mentorAssignment/UNSET_MENTOR_ROLE",
          changeRolesField: "mentorAssignment/UPDATE_ROLES_FIELD",
          notification: "mentorAssignment/NOTIFICATION",
          updateFacultyState: "mentorAssignment/UPDATE_FACULTY_LIST"
      }), 

      btn(type, deleteId) {
        if(type === 'add') {
            // ADD BUTTON
            this.addRow(this.$auth.user.uuid)
            this.pushActiveMentor(this.mentorData)
            
            // this.notification(this.saveMentor)
        } else if(type === 'save') {
            // SAVE BUTTON
            this.$emit('storeMentors', this.getWithoutId)
        } else if(type === 'delete') {
            // DELETE BUTTON
            this.deleteRow(deleteId);
            this.actions = ''
        } else if(type === 'modal') {
            // MODAL
            // this.forSubmit(this.getWithoutId)
            // this.$emit('forSubmit', this.getWithoutId)
            // console.log(this.saveMentor)
            this.show = true
        } else if(type === 'submit') {
            // SUBMIT BUTTON
            this.$emit('submitRequest', this.getWithoutId, 'requested')
        }
      },

      update(field, id, event) {
        // event != null
        let value = event != null ? event : ''
        // console.log(value)

        if(field === 'remarks') {
            this.changeField({
              "field": field,
              "newValue": event.target.value,
              "id": id
            })
        }

        if(field === 'actions') {
            this.changeField({
              "field": field,
              "newValue": event.target.value,
              "id": id
            })
        }

        if(field === 'mentor_role') {
          this.changeField({ 
            "field": field,
            "newValue": event.target.value,
            "id": id
          })
        }

        if(field === 'remove_mentor') {
          this.changeField({
            "field": "mentor_name",
            "field2": "faculty_id",
            "newValue": event.target.options[event.target.selectedIndex].text,
            "newValue2": event.target.value,
            "id": id
          }),

          // console.log(this.mentorRoleId)
          this.facultyId = parseInt(event.target.value)
          this.$emit('mentorRoleId', this.getMentorRoleId, id)
          // this.notifModal = false
        }

        if(field === "mentor_id") {
          this.changeField({
            "field": "mentor_name",
            "field2": "faculty_id",
            "newValue": value.faculty_name,
            "newValue2": value.faculty_id,
            "id": id
          });
          
          if(event != null) {
            if(this.notif) {
              // console.log(actions)
              if(this.actionList != 'Remove') {
                // this.notificationModal = value.home_unit != null ? value.home_unit: '' 
                this.notification({
                  "homeunit": value.home_unit != null ? value.home_unit: '' 
                })
              }
            }
          }
        }
      },

      dropdownShouldOpen(VueSelect) {
          return VueSelect.search.length > 2 && VueSelect.open
      },
    },
    watch: {
      // mentorData(data) {
      //   // console.log(data)
      //   this.updateRoleId = data
      // },

      updateTxnIndicator(newVal, oldVal) {
          this.$emit('onUpdateTxn')
      },
      closeModal() {
        this.show = false
      }
    }
  }
  </script>
  