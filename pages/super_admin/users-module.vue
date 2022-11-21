<template>
    <div
      class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="text-2xl font-bold mb-8">
              Users Module
          </div>
          <div>
            <GenericTable :isLoading="dataLoading" :isInitialLoad="initialLoad" :tableFilters="filters" :tableFilterData="filterData" :tableHeaders="headers" :tableData="getTableData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination">
              <template v-slot:action="index">
                <button @click="updateDrawer(index)" class="bg-green-500 text-white p-2 rounded mb-2">
                  View
                </button>
              </template>
            </GenericTable>
          </div>
          <div>
            <GenericDrawer :isOpen="showDrawer" @closeDrawer="updateDrawer">
                <template v-slot:content>
                  <div v-if="index != null" class="w-full mb-4">
                    <div class="flex justify-end">
                      <button @click="toggleEdit" class="text-white p-2 rounded mb-2" :class="!editEnabled ? 'bg-blue-500' : 'bg-green-500' ">{{!editEnabled ? "Edit User Info" : "Save"}}</button>
                    </div>
                    <div class="w-full flex flex-wrap">
                      <div class="md:w-1/4 w-full">
                        <div class="w-full items-center justify-center flex md:m-0 my-8 py-4">
                            <img src="/logos/no-picture.png" class="h-70 w-auto" alt="User Picture">
                        </div>
                        <div class="w-full">
                          <div class="flex items-center">
                            <div class="my-4 text-lg font-bold">
                                Roles 
                            </div>
                            <CircSpinner :isLoading="roleLoading"/>
                          </div>
                          <div class="flex flex-wrap">
                            <div v-for="(role, roleIndex) in getTableData[index].roles" :key="roleIndex" class="m-1 p-1 bg-blue-200 rounded shadow text-sm hover:bg-blue-400 hover:text-white flex items-center">
                              {{role}}
                              <button @click="openModal('remove_role', role)" class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-1">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                            </div>
                            <button @click="openModal('add_role')" class="m-1 p-1 px-2 bg-green-400 rounded shadow hover:bg-green-500 text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 hover:rotate-180 transform transition-transform">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div class="w-full">
                          <div class="flex items-center">
                            <div class="my-4 text-lg font-bold">
                                Permissions
                            </div>
                            <CircSpinner :isLoading="permissionLoading"/>
                          </div>
                          <div class="flex flex-wrap">
                            <div v-for="(permission, permissionIndex) in getTableData[index].permissions" :key="permissionIndex" class="m-1 p-1 bg-blue-200 rounded shadow text-sm hover:bg-blue-400 hover:text-white flex items-center">
                              <button @click="openModal('edit_permission', permission)">
                                {{permission}}
                              </button>
                              <button @click="openModal('remove_permission', permission)" class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-1">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                            </div>
                            <button @click="openModal('add_permission')" class="m-1 p-1 px-2 bg-green-400 rounded shadow hover:bg-green-500 text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 hover:rotate-180 transform transition-transform">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="md:w-3/4 w-full text-md md:px-6">
                          <div class="my-4 text-xl font-bold">
                              General Information
                          </div>
                          <div class="flex flex-wrap">
                              <div class="w-full flex">
                                <div class="flex flex-wrap mb-3 md:w-1/3 w-full">
                                    <div class="text-gray-500 block w-full">
                                        First name:
                                    </div>
                                    <div class="block md:w-10/12 w-full">
                                        <input class="w-full border border-gray-400 p-1 rounded" type="text" :value="getTableData[index].details.first_name" :disabled="!editEnabled ? true : null">
                                    </div>
                                </div>
                                <div class="flex flex-wrap mb-3 md:w-1/3 w-full">
                                    <div class="text-gray-500 block w-full">
                                        Middle name:
                                    </div>
                                    <div class="block md:w-10/12 w-full">
                                      <input class="w-full border border-gray-400 p-1 rounded" type="text" :value="getTableData[index].details.middle_name" :disabled="!editEnabled ? true : null">
                                    </div>
                                </div>
                                <div class="flex flex-wrap mb-3 md:w-1/3 w-full">
                                    <div class="text-gray-500 block w-full">
                                        Last name:
                                    </div>
                                    <div class="block md:w-10/12 w-full">
                                      <input class="w-full border border-gray-400 p-1 rounded" type="text" :value="getTableData[index].details.last_name" :disabled="!editEnabled ? true : null">
                                    </div>
                                </div>
                              </div>
                              <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                                  <div class="text-gray-500 block w-full">
                                      SAIS ID:
                                  </div>
                                  <div class="block md:w-10/12 w-full">
                                    <input class="w-full border border-gray-400 p-1 rounded" type="text" :value="getTableData[index].sais_id" :disabled="!editEnabled ? true : null">
                                  </div>
                              </div>
                              <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                                  <div class="text-gray-500 block w-full">
                                      Email:
                                  </div>
                                  <div class="block md:w-10/12 w-full">
                                    <input class="w-full border border-gray-400 p-1 rounded" type="text" :value="getTableData[index].details.email" :disabled="!editEnabled ? true : null">
                                  </div>
                              </div>
                              <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                                  <div class="text-gray-500 w-1/2">
                                      Tester:
                                  </div>
                                  <div class="w-1/2">
                                    <input class="w-full border border-gray-400 p-1 rounded" type="checkbox" :checked="getTableData[index].details.email" :disabled="!editEnabled ? true : null">
                                  </div>
                              </div>
                          </div>
                        
                      </div>
                    </div>
                  </div>
                </template>
            </GenericDrawer>

            <VTailwindModal v-model="showModal">
                <template v-slot:title>
                  <div v-if="modalMode == 'add_role'">
                    Add Role to User
                  </div>
                  <div v-else-if="modalMode == 'add_permission'">
                    Add Permission to User
                  </div>
                  <div v-else-if="modalMode == 'remove_role'">
                    Remove Role of User
                  </div>
                  <div v-else-if="modalMode == 'remove_permission'">
                    Remove Permission of User
                  </div>
                  <div v-else-if="modalMode == 'edit_permission'">
                    Edit Permission of User
                  </div>
                </template>
                <template v-slot:content>
                  <div v-if="modalMode == 'add_role'">
                    <div>
                      Choose the role that you wish to add:
                    </div>
                    <div class="my-2">
                      <label for="role" class="block text-sm text-gray-600">Role</label>
                      <select class="w-full text-md border border-gray-400 rounded p-1" @change="chooseRole($event.target.value)">
                        <option value="">--</option>
                        <option v-for="(role, roleIndex) in rolesData" :key="roleIndex" :value="role.name">{{role.name}}</option>
                      </select>
                    </div>
                  </div>
                  <div v-else-if="modalMode == 'add_permission'">
                    <div>
                      Choose the permissions that you wish to add:
                    </div>
                    <div class="my-2">
                      <label for="permission" class="block text-sm text-gray-600">Permission</label>
                      <select class="w-full text-md border border-gray-400 rounded p-1" @change="choosePermission($event.target.value)">
                        <option value="">--</option>
                        <option v-for="(permission, permissionIndex) in permissionsData" :key="permissionIndex" :value="permission.name">{{permission.name}}</option>
                      </select>
                    </div>
                    <div v-if="index != null">
                      <div class="my-2">
                        <label for="permission" class="block text-sm text-gray-600">Tags</label>
                        <v-select multiple class="w-full style-chooser" label="name" :dropdown-should-open="dropdownShouldOpen" :reduce="tag => tag.name" :options="tagsData" @input="(value) => chooseCombobox(value)"></v-select>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="modalMode == 'edit_permission'">
                    <div>
                      Edit the tag for this permission:
                    </div>
                    <div class="my-2">
                      <label for="permission" class="block text-sm text-gray-600">Permission</label>
                      <div>
                        {{toUpdateData.permission}}
                      </div>
                    </div>
                    <div class="my-2">
                      <label for="permission" class="block text-sm text-gray-600">Tags</label>
                      <v-select multiple class="w-full style-chooser" label="name" :dropdown-should-open="dropdownShouldOpen" :value="toUpdateData.tags[0]" :reduce="tag => tag.name" :options="tagsData" @input="(value) => chooseCombobox(value)"></v-select>
                    </div>
                  </div>
                  <div v-else-if="modalMode == 'remove_role'">
                    <div v-if="index != null">
                      Are you sure you want to remove <b>{{toUpdateData.role}}</b> role from {{getTableData[index].details.first_name}} {{getTableData[index].details.last_name}}?
                    </div>
                  </div>
                  <div v-else-if="modalMode == 'remove_permission'">
                    <div v-if="index != null">
                      Are you sure you want to remove <b>{{toUpdateData.permission}}</b> permission from {{getTableData[index].details.first_name}} {{getTableData[index].details.last_name}}?
                    </div>
                  </div>
                </template>
                <template v-slot:buttons>
                  <div v-if="modalMode == 'add_role'"> 
                    <button @click="rolePermissionHandler('add_role', getTableData[index].sais_id)" class="bg-green-500 text-white p-2 px-4 rounded mr-2">
                        Add Role
                    </button>
                  </div>
                  <div v-else-if="modalMode == 'add_permission'">
                    <button @click="rolePermissionHandler('add_permission', getTableData[index].sais_id)" class="bg-green-500 text-white p-2 px-4 rounded mr-2">
                        Add Permission
                    </button>
                  </div>
                  <div v-else-if="modalMode == 'remove_role'">
                    <button @click="rolePermissionHandler('remove_role', getTableData[index].sais_id)" class="bg-green-500 text-white p-2 px-4 rounded mr-2">
                        Remove Role
                    </button>
                  </div>
                  <div v-else-if="modalMode == 'remove_permission'">
                    <button @click="rolePermissionHandler('remove_permission', getTableData[index].sais_id)" class="bg-green-500 text-white p-2 px-4 rounded mr-2">
                        Remove Permission
                    </button>
                  </div>
                  <div v-else-if="modalMode == 'edit_permission'">
                    <button @click="rolePermissionHandler('edit_permission', getTableData[index].sais_id)" class="bg-green-500 text-white p-2 px-4 rounded mr-2">
                        Edit Permission
                    </button>
                  </div>
                  <button @click="cancel" class="bg-red-500 text-white p-2 px-4 rounded mr-2">
                      Close
                  </button>
                </template>
            </VTailwindModal>
          </div>
        </div>
      </div>
    </div>
  </template>
    
<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import Loader from "../../components/Loader.vue";
import CircSpinner from '../../components/CircSpinner.vue';
import GenericTable from "../../components/GenericTable.vue";
import VTailwindModal from "../../components/VTailwindModal.vue";
import 'vue-select/dist/vue-select.css';

export default {
  components: {
    GenericTable,
    VTailwindModal,
    CircSpinner
  },
  data () {
    return {
      filters: [ //field -> db field/column; name -> name of key returned; type -> what type of filter; label -> label to be used
        {field: 'sais_id', name: 'sais_id', type: 'combobox', label: 'SAIS ID'},
      ],
      headers: [
          "name",
          "sais_id",
          "roles",
          "permissions",
          "action"
      ],
      showModal: false,
      showDrawer: false,
      editEnabled: false,
      modalMode: '',
      drawerData: {},
      index: null,
      options: {
        page: 1,
        filters: {},
        numOfItems: 5
      }
    };
  },
  computed: {
    ...mapState({
      filterData: state => state.super_admin.usersModule.filters,
      dataLoading: state => state.super_admin.usersModule.loading,
      roleLoading: state => state.super_admin.usersModule.role_loading,
      permissionLoading: state => state.super_admin.usersModule.permission_loading,
      initialLoad: state => state.super_admin.usersModule.initialLoad,
      curriculumsData: state => state.super_admin.usersModule.data,
      tableFilterValues: state => state.super_admin.usersModule.filterValues,
    }),
    ...mapGetters({
      getTableData: "super_admin/usersModule/getTableData",
      rolesData: "super_admin/usersModule/getRoles",
      permissionsData: "super_admin/usersModule/getPermissions",
      tagsData: "super_admin/usersModule/getTags",
      toUpdateData: "super_admin/usersModule/getToUpdateData",
      initialTagValue: "super_admin/usersModule/getInitialTagValue",
    }),
  },
  async fetch () {
    this.updateFilterValues({}) // set the filter values to nothing every time a txn history is rendered
    this.fetchTableData(this.options.page)
    this.getRoles()
    this.getPermissions()
    this.getTags()
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
    });
  },
  methods: {
    ...mapMutations({
      updateNumOfItems: 'super_admin/usersModule/UPDATE_NUM_OF_ITEMS',
      updateFilterValues: 'super_admin/usersModule/UPDATE_FILTER_VALUES',
      setTableModule: 'super_admin/usersModule/SET_MODULE',
      setRoleToUpdate: 'super_admin/usersModule/SET_ROLE_TO_UPDATE',
      setPermissionToUpdate: 'super_admin/usersModule/SET_PERMISSION_TO_UPDATE',
      setTagsToUpdate: 'super_admin/usersModule/SET_TAGS_TO_UPDATE',
    }),
    ...mapActions({
      getData: 'super_admin/usersModule/getData',
      getFilters: 'super_admin/usersModule/getFilters',
      getRoles: 'super_admin/usersModule/getRoles',
      getPermissions: 'super_admin/usersModule/getPermissions',
      getTags: 'super_admin/usersModule/getTags',
      updateRole: 'super_admin/usersModule/updateRole',
      updatePermission: 'super_admin/usersModule/updatePermission',
    }),
    openDrawer(data) {
      this.showDrawer = true
      this.drawerData = data
    },
    fetchTableData(page) { // reusable function for getting the data to be displayed in txn history
      this.getData({
        link: this.module,
        data: {
            user_module: true,
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
    cancel() {
      this.showModal = false
      // this.modalMode = ''
      this.setRoleToUpdate('')
      this.setPermissionToUpdate('')
    },
    toggleEdit() {
      this.editEnabled = !this.editEnabled
    },
    openModal(mode, role_permission = null) {
      this.modalMode = mode
      if(mode == 'remove_permission') {
        this.setPermissionToUpdate(role_permission)
      } else if (mode == 'remove_role') {
        this.setRoleToUpdate(role_permission)
      } else if (mode == 'edit_permission') {
        this.setPermissionToUpdate(role_permission)
        this.setTagsToUpdate(this.initialTagValue(this.index))
      }
      this.showModal = true
    },
    chooseRole(role) {
      this.setRoleToUpdate(role)
    },
    choosePermission(permission) {
      this.setPermissionToUpdate(permission)
    },
    rolePermissionHandler(mode, sais_id) {
      if(mode == 'add_role') {
        this.updateRole({
          sais_id: sais_id,
          index: this.index,
          mode: 'add'
        })
      } else if(mode == 'add_permission') {
        this.updatePermission({
          sais_id: sais_id,
          index: this.index,
          mode: 'add'
        })
      } else if(mode == 'remove_role') {
        this.updateRole({
          sais_id: sais_id,
          index: this.index,
          mode: 'remove'
        })
      } else if(mode == 'remove_permission') {
        this.updatePermission({
          sais_id: sais_id,
          index: this.index,
          mode: 'remove'
        })
      } else if(mode == 'edit_permission') {
        this.updatePermission({
          sais_id: sais_id,
          index: this.index,
          mode: 'edit'
        })
      }
      this.showModal = false
    },
    chooseCombobox(value) {
      if(value) {    
        this.setTagsToUpdate(value)
      } else {
        this.setTagsToUpdate([])
      }
    },
    dropdownShouldOpen(VueSelect) {
      return VueSelect.search.length > 0 && VueSelect.open
    },
  },
};
</script>

<style></style>
    