<template>
    <div>
        <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
            <div class="py-12">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="flex items-center mb-4">
                        <div class="text-2xl font-bold">
                            Permissions Module
                        </div>
                        <CircSpinner :isLoading="dataLoading"/>
                    </div>
                    <div v-if="!initialLoad">
                        <div class="flex">
                            <button @click="openModal" class="bg-green-500 text-white p-2 rounded mb-2">Add Permission</button>
                        </div>
                        <div v-for="(permissionsGroup, pgIndex) in getTableData" :key="pgIndex" class="w-full mb-4 bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                            <div class="text-xl font-bold mb-4">
                                {{pgIndex == 'null' ? 'Not Categorized' : pgIndex}}
                            </div>
                            <div class="mt-6 flex">
                                <div v-for="(permissions, permissionIndex) in permissionsGroup.permissions" :key="permissionIndex" class="mx-2 p-1 bg-gray-100 rounded shadow hover:bg-gray-200">
                                    {{permissions.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <VTailwindModal v-model="show">
            <template v-slot:title>Create Permission</template>
            <template v-slot:content>
                <div>
                    Provide the following details to create a permission:
                </div>
                <div class="mt-2">
                    <div class="my-2">
                        <label for="permission_name" class="block text-sm text-gray-600">Permission Name</label>
                        <input v-model="permission_name" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="view/edit/delete <module>">
                    </div>
                    <div class="my-2">
                        <label for="permission_group" class="block text-sm text-gray-600">Permission Group</label>
                        <select class="w-full text-md border border-gray-400 rounded p-1" @change="chooseGroup($event.target.value)">
                            <option value="" selected>Choose a group</option>
                            <option value="new-group">Enter a new group</option>
                            <option v-for="(group, groupIndex) in getTableData" :key="groupIndex" :value="groupIndex">{{groupIndex}}</option>
                        </select>
                    </div>
                    <div v-if="new_group" class="my-2">
                        <label for="new_group_name" class="block text-sm text-gray-600">New Group Name</label>
                        <input v-model="permission_new_group" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="<module>">
                    </div>
                </div>
            </template>
            <template v-slot:buttons>
                <div>
                    <button @click="create" class="bg-green-500 text-white p-2 px-4 rounded mr-2">
                        Create
                    </button>          
                    <button @click="cancel" class="bg-red-500 text-white p-2 px-4 rounded mr-2">
                        Cancel
                    </button>
                </div>
            </template>
        </VTailwindModal>
    </div>
</template>
  
<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
// import Loader from "../components/Loader.vue";
import VTailwindModal from "../../components/VTailwindModal.vue";

  
export default {
    components: {
        // GenericTable,
        VTailwindModal
    },
    data () {
        return {
            show: false,
            new_group: false
        };
    },
    computed: {
        ...mapState({
            dataLoading: state => state.super_admin.permissionsModule.loading,
            initialLoad: state => state.super_admin.permissionsModule.initialLoad,
        }),
        ...mapGetters({
            getTableData: "super_admin/permissionsModule/getTableData",
            getToStorePermissionName: "super_admin/permissionsModule/getToStorePermissionName",
            getToStoreGroup: "super_admin/permissionsModule/getToStoreGroup"
        }),
        permission_name: {
            get() {
                return this.getToStorePermissionName
            },
            set(value) {
                this.updatePermissionName(value)
            },
        },
        permission_new_group: {
            get() {
                return this.getToStoreGroup
            },
            set(value) {
                this.updateGroup(value)
            },
        }
    },
    async fetch() {
        this.getData({})
    },
    methods: {
        ...mapMutations({
            updatePermissionName: 'super_admin/permissionsModule/UPDATE_PERMISSION_NAME',
            updateGroup: 'super_admin/permissionsModule/UPDATE_GROUP'
        }),
        ...mapActions({
            getData: 'super_admin/permissionsModule/getData',
            createPermission: 'super_admin/permissionsModule/createPermission'
        }),
        cancel() {
            this.show = false
        },
        openModal() {
            this.show = true
        },
        chooseGroup(group) {
            if(group == 'new-group') {
                this.updateGroup('')
                this.new_group = true
            } else {
                this.updateGroup(group)
                this.new_group = false
            }
        },
        create() {
            this.createPermission();
            this.show = false;
        }
    }
};
</script>

<style></style>
  