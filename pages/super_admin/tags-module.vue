<template>
    <div>
        <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
          <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div class="text-2xl font-bold mb-8">
                  Tags Module
              </div>
              <div>
                <div class="flex">
                  <button @click="openModal(index, 'add')" class="bg-green-500 text-white p-2 rounded mb-2">Add Tag</button>
                </div>  
              </div>
              <div>
                <GenericTable :isLoading="dataLoading" :isInitialLoad="initialLoad" :tableFilters="filters" :tableFilterData="filterData" :tableHeaders="headers" :tableData="getTableData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination">
                  <template v-slot:action="index">
                    <button @click="openModal(index, 'edit')" class="bg-green-500 text-white p-2 rounded mb-2">
                      Edit
                    </button>
                  </template>
                </GenericTable>
              </div>
            </div>
          </div>
        </div>

        <VTailwindModal v-model="show">
            <template v-slot:title>
              <div v-if="modalMode == 'edit'">
                Update Tag
              </div>
              <div v-else>
                Add Tag
              </div>
            </template>
            <template v-slot:content>
              <div v-if="modalMode == 'edit'">
                Enter new tag details you wish to change:
              </div>
              <div v-else>
                Provide the following details to create a permission:
              </div>
              <div class="mt-2">
                  <div class="my-2">
                      <label for="tag_name" class="block text-sm text-gray-600">Tag Name</label>
                      <input v-model.lazy="tag_name" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="Name of tag">
                  </div>
                  <div class="my-2">
                      <label for="reference_model" class="block text-sm text-gray-600">Reference Model</label>
                      <input v-model.lazy="reference_model" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="Name of the model">
                  </div>
                  <div class="my-2">
                      <label for="reference_field" class="block text-sm text-gray-600">Reference Field</label>
                      <input v-model.lazy="reference_field" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="Name of the field">
                  </div>
                  <div class="my-2">
                      <label for="reference_value" class="block text-sm text-gray-600">Reference Value</label>
                      <input v-model.lazy="reference_value" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="Value to check">
                  </div>
                  <div class="my-2">
                      <label for="reference_type" class="block text-sm text-gray-600">Reference Type</label>
                      <input v-model.lazy="reference_type" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="Type of the value">
                  </div>
                  <div class="my-2">
                      <label for="reference_operation" class="block text-sm text-gray-600">Reference Operation</label>
                      <input v-model.lazy="reference_operation" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="Operation to be used">
                  </div>
              </div>
            </template>
            <template v-slot:buttons>
                <div v-if="modalMode == 'edit'">
                  <button @click="edit" class="bg-green-500 text-white p-2 px-4 rounded mr-2">
                      Update
                  </button>          
                </div>
                <div v-else>
                  <button @click="create" class="bg-green-500 text-white p-2 px-4 rounded mr-2">
                      Create
                  </button>          
                </div>
                <button @click="cancel" class="bg-red-500 text-white p-2 px-4 rounded mr-2">
                    Cancel
                </button>
            </template>
        </VTailwindModal>
    </div>
  </template>
    
  <script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
  import Loader from "../../components/Loader.vue";
  import GenericTable from "../../components/GenericTable.vue";
  
  export default {
    components: {
      GenericTable,
    },
    data () {
      return {
        filters: [ //field -> db field/column; name -> name of key returned; type -> what type of filter; label -> label to be used
          {field: 'tag_name', name: 'tag_name', type: 'combobox', label: 'Tag Name'},
        ],
        headers: [
          "tag_id",
          "tag_name",
          "reference_model",
          "reference_field",
          "reference_value",
          "reference_type",
          "reference_operation",
          "action"
        ],
        show: false,
        modalMode: '',
        showDrawer: false,
        drawerData: {},
        index: null,
        options: {
          page: 1,
          filters: {},
          numOfItems: 5
        },
      };
    },
    computed: {
      ...mapState({
        filterData: state => state.super_admin.tagsModule.filters,
        dataLoading: state => state.super_admin.tagsModule.loading,
        initialLoad: state => state.super_admin.tagsModule.initialLoad,
        tagsData: state => state.super_admin.tagsModule.data,
        tableFilterValues: state => state.super_admin.tagsModule.filterValues,
      }),
      ...mapGetters({
        getTableData: "super_admin/tagsModule/getTableData",
        getToStore: "super_admin/tagsModule/getToStore"
      }),
      tag_name: {
        get() {
          return this.getToStore.tag_name
        },
        set(value) {
          this.updateTagName(value)
        }
      },
      reference_model: {
        get() {
          return this.getToStore.reference_model
        },
        set(value) {
          this.updateReferenceModel(value)
        }
      },
      reference_field: {
        get() {
          return this.getToStore.reference_field
        },
        set(value) {
          this.updateReferenceField(value)
        }
      },
      reference_value: {
        get() {
          return this.getToStore.reference_value
        },
        set(value) {
          this.updateReferenceValue(value)
        }
      },
      reference_type: {
        get() {
          return this.getToStore.reference_type
        },
        set(value) {
          this.updateReferenceType(value)
        }
      },
      reference_operation: {
        get() {
          return this.getToStore.reference_operation
        },
        set(value) {
          this.updateReferenceOperation(value)
        }
      },
    },
    async fetch () {
      this.updateFilterValues({}) // set the filter values to nothing every time a txn history is rendered
      this.fetchTableData(this.options.page)
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
        updateNumOfItems: 'super_admin/tagsModule/UPDATE_NUM_OF_ITEMS',
        updateFilterValues: 'super_admin/tagsModule/UPDATE_FILTER_VALUES',
        setTableModule: 'super_admin/tagsModule/SET_MODULE',
        setInitialValues: 'super_admin/tagsModule/SET_INITIAL_VALUES',
        updateTagName: 'super_admin/tagsModule/UPDATE_TAG_NAME',
        updateReferenceModel: 'super_admin/tagsModule/UPDATE_REFERENCE_MODEL',
        updateReferenceField: 'super_admin/tagsModule/UPDATE_REFERENCE_FIELD',
        updateReferenceValue: 'super_admin/tagsModule/UPDATE_REFERENCE_VALUE',
        updateReferenceType: 'super_admin/tagsModule/UPDATE_REFERENCE_TYPE',
        updateReferenceOperation: 'super_admin/tagsModule/UPDATE_REFERENCE_OPERATION'
      }),
      ...mapActions({
        getData: 'super_admin/tagsModule/getData',
        getFilters: 'super_admin/tagsModule/getFilters',
        editTag: 'super_admin/tagsModule/editTag',
        createTag: 'super_admin/tagsModule/createTag',
      }),
      fetchTableData(page) { // reusable function for getting the data to be displayed in txn history
        this.getData({
          link: this.module,
          data: {
              page: page,
              items: this.options.numOfItems,
          }
        })
      },
      openModal(index, mode) {
        this.show = true
        this.modalMode = mode
        if(index) {
          this.setInitialValues(this.getTableData[index.index])
        } else {
          this.setInitialValues({
            tag_name: '',
            reference_model: '',
            reference_field: '',
            reference_value: '',
            reference_type: '',
            reference_operation: ''
          })

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
        this.show = false
      },
      edit() {
        this.editTag({
          link: this.module,
          data: {
              page: 1,
              items: this.options.numOfItems,
          }
        })
        this.show = false
      },
      create() {
        this.createTag({
          link: this.module,
          data: {
              page: 1,
              items: this.options.numOfItems,
          }
        })
        this.show = false
      }
    },
  };
  </script>
  
  <style></style>
    