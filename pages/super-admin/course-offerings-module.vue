<template>
    <div>
        <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
          <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div class="text-2xl font-bold mb-8">
                  Course Offerings Module
              </div>
              <div class="text-md">
                <p class="mb-4 font-bold">
                    Note: Before adding a course offering, please make sure that the faculty is existing in our system. You may check it by visiting the Faculty Module. 
                </p>
              </div>
              <div>
                <div class="flex">
                  <button @click="openModal(index, 'add')" class="bg-green-500 text-white p-2 rounded mb-2">Add Course Offering</button>
                </div>  
              </div>
              <div>
                <GenericTable :isLoading="dataLoading" :isInitialLoad="initialLoad" :tableFilters="filters" :tableFilterData="filterData" :tableHeaders="headers" :tableData="getTableData" :tableOptions="options" @onUpdateOptions="handleOptionsUpdate" @onUpdatePage="handlePagination">
                  <template v-slot:action="index">
                    <button @click="openModal(index, 'edit')" class="bg-green-500 text-white p-2 rounded mb-2">
                      Edit
                    </button>
                    <button @click="openModal(index, 'delete')" class="bg-red-500 text-white p-2 rounded mb-2">
                      Delete
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
                Update Course Offering
              </div>
              <div v-else-if="modalMode == 'delete'">
                Delete Course Offering
              </div>
              <div v-else>
                Add Course Offering
              </div>
            </template>
            <template v-slot:content>
              <div v-if="modalMode == 'edit'">
                Enter new course offering details you wish to change:
              </div>
              <div v-else-if="modalMode == 'delete'">
                Are you sure you want to delete this course offering?
              </div>
              <div v-else>
                Provide the following details to create a course offering:
              </div>
              <div class="mt-2">
                  <div class="my-2">
                      <label for="institution" class="block text-sm text-gray-600">Institution</label>
                      <input v-model.lazy="institution" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="UPLB" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <div class="my-2">
                        <label for="career" class="block text-sm text-gray-600">Career</label>
                        <select :disabled="modalMode == 'delete' ? true : null" class="w-full text-md border border-gray-400 rounded p-1" v-model.lazy="career" >
                            <option value="UGRD" selected>UGRD</option>
                            <option value="GRAD">GRAD</option>
                        </select>
                  </div>
                  <div class="my-2">
                      <label for="course_id" class="block text-sm text-gray-600">Course ID</label>
                      <input v-model.lazy="course_id" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. 11324" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <div class="my-2">
                      <label for="acad_group" class="block text-sm text-gray-600">Acad Group</label>
                      <input v-model.lazy="acad_group" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. CAS" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <div class="my-2">
                      <label for="acad_org" class="block text-sm text-gray-600">Acad Org</label>
                      <input v-model.lazy="acad_org" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. LBICS" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <div class="my-2">
                      <label for="subject" class="block text-sm text-gray-600">Subject</label>
                      <input v-model.lazy="subject" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. CMSC" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <div class="my-2">
                      <label for="catalog" class="block text-sm text-gray-600">Catalog</label>
                      <input v-model.lazy="catalog" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. 12" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <div class="my-2">
                      <label for="descr" class="block text-sm text-gray-600">Description</label>
                      <input v-model.lazy="descr" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. Foundations of CMSC" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <div class="my-2">
                        <label for="component" class="block text-sm text-gray-600">Component</label>
                        <select :disabled="modalMode == 'delete' ? true : null" class="w-full text-md border border-gray-400 rounded p-1" v-model.lazy="component">
                            <option v-for="(component, componentIndex) in getComponents" :key="componentIndex" :value="component">{{component}}</option>
                        </select>
                  </div>
                  <div class="my-2">
                      <label for="section" class="block text-sm text-gray-600">Section</label>
                      <input v-model.lazy="section" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. B" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <div class="my-2">
                      <label for="class_nbr" class="block text-sm text-gray-600">Class Nbr</label>
                      <input v-model.lazy="class_nbr" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. 34567" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <div class="my-2">
                      <label for="times" class="block text-sm text-gray-600">Times</label>
                      <input v-model.lazy="times" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. 10:00AM - 11:00AM" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <!-- <div class="my-2">
                      <label for="times" class="block text-sm text-gray-600">Times</label>
                      <input v-model.lazy="start_times" type="time" name="start_times" class="border border-gray-400 p-1 rounded"/> to <input type="time" v-model.lazy="end_times" name="end_times" class="border border-gray-400 p-1 rounded"/>
                  </div> -->
                  <div class="my-2">
                      <label for="days" class="block text-sm text-gray-600">Days</label>
                      <input v-model.lazy="days" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. TTH" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <div class="my-2">
                      <label for="faculty" class="block text-sm text-gray-600">Faculty (SAIS ID)</label>
                      <v-select class="w-full" :dropdown-should-open="dropdownShouldOpen" :options="getFaculties" :label="'sais_id'" v-model.lazy="id" :disabled="modalMode == 'delete' ? true : null"></v-select>
                  </div>
                  <div class="my-2">
                      <label for="faculty" class="block text-sm text-gray-600">Faculty Name</label>
                      <div>
                        {{getToStore.name ? getToStore.name : 'None Selected'}}
                      </div>
                  </div>
                  <div class="my-2">
                      <label for="faculty" class="block text-sm text-gray-600">Faculty Email</label>
                      <div>
                        {{getToStore.email ? getToStore.email : 'None Selected'}}
                      </div>
                  </div>
                  <div class="my-2">
                        <label for="consent" class="block text-sm text-gray-600">Consent</label>
                        <select class="w-full text-md border border-gray-400 rounded p-1" v-model.lazy="consent" :disabled="modalMode == 'delete' ? true : null">
                            <option value="N" selected>No COI Restriction</option>
                            <option value="I">With COI Restriction</option>
                            <option value="D">With Departmental COI Restriction</option>
                        </select>
                  </div>
                  <div class="my-2">
                      <label for="offer_nbr" class="block text-sm text-gray-600">Offer Nbr</label>
                      <input v-model.lazy="offer_nbr" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. 1" :disabled="modalMode == 'delete' ? true : null">
                  </div>
                  <div class="my-2">
                      <label for="topic_id" class="block text-sm text-gray-600">Topic ID</label>
                      <input v-model.lazy="topic_id" type="text" class="w-full border border-gray-400 p-1 rounded" placeholder="E.g. 4" :disabled="modalMode == 'delete' ? true : null">
                  </div>
              </div>
            </template>
            <template v-slot:buttons>
                <div v-if="modalMode == 'edit'">
                  <button @click="edit" class="bg-green-500 text-white p-2 px-4 rounded mr-2">
                      Update
                  </button>          
                </div>
                <div v-else-if="modalMode == 'delete'">
                  <button @click="deleteCO" class="bg-green-500 text-white p-2 px-4 rounded mr-2">
                      Delete
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
          {field: 'course', name: 'course', type: 'combobox', label: 'Course'},
          {field: 'component', name: 'component', type: 'select', label: 'Component'},
          {field: 'class_nbr', name: 'class_nbr', type: 'combobox', label: 'Class Number'},
          {field: 'id', name: 'id', type: 'combobox', label: 'Faculty SAIS ID'},
        ],
        headers: [
          "course_id",
          "course",
          "descr",
          "section",
          "times",
          "days",
          "class_nbr",
          "id",
          "name",
          "email",
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
        filterData: state => state.super_admin.courseOfferingsModule.filters,
        dataLoading: state => state.super_admin.courseOfferingsModule.loading,
        initialLoad: state => state.super_admin.courseOfferingsModule.initialLoad,
        tagsData: state => state.super_admin.courseOfferingsModule.data,
        tableFilterValues: state => state.super_admin.courseOfferingsModule.filterValues,
      }),
      ...mapGetters({
        getTableData: "super_admin/courseOfferingsModule/getTableData",
        getToStore: "super_admin/courseOfferingsModule/getToStore",
        getComponents: "super_admin/courseOfferingsModule/getComponents",
        getFaculties: "super_admin/courseOfferingsModule/getFaculties",
      }),
        institution: {
            get() {
                return this.getToStore.institution
            },
            set(value) {
                this.updateInstitution(value)
            }
        },
        career: {
            get() {
                return this.getToStore.career
            },
            set(value) {
                this.updateCareer(value)
            }
        },
        term: {
            get() {
                return this.getToStore.term
            },
            set(value) {
                this.updateTerm(value)
            }
        },
        course_id: {
            get() {
                return this.getToStore.course_id
            },
            set(value) {
                this.updateCourseID(value)
            }
        },
        acad_org: {
            get() {
                return this.getToStore.acad_org
            },
            set(value) {
                this.updateAcadOrg(value)
            }
        },
        acad_group: {
            get() {
                return this.getToStore.acad_group
            },
            set(value) {
              this.updateAcadGroup(value)
            }
        },
        subject: {
            get() {
                return this.getToStore.subject
            },
            set(value) {
                this.updateSubject(value)
            }
        },
        catalog: {
            get() {
                return this.getToStore.catalog
            },
            set(value) {
                this.updateCatalog(value)
            }
        },
        descr: {
            get() {
                return this.getToStore.descr
            },
            set(value) {
                this.updateDescr(value)
            }
        },
        component: {
            get() {
                return this.getToStore.component
            },
            set(value) {
                this.updateComponent(value)
            }
        },
        section: {
            get() {
                return this.getToStore.section
            },
            set(value) {
                this.updateSection(value)
            }
        },
        class_nbr: {
            get() {
                return this.getToStore.class_nbr
            },
            set(value) {
                this.updateClassNbr(value)
            }
        },
        // start_times: {
        //     get() {
        //         return this.getToStore.start_times
        //     },
        //     set(value) {
        //         this.updateStartTimes(value)
        //     }
        // },
        // end_times: {
        //     get() {
        //         return this.getToStore.end_times
        //     },
        //     set(value) {
        //         this.updateEndTimes(value)
        //     }
        // },
        times: {
            get() {
                return this.getToStore.times
            },
            set(value) {
                this.updateTimes(value)
              }
        },
        days: {
            get() {
                return this.getToStore.days
            },
            set(value) {
                this.updateDays(value)
            }
        },
        id: {
            get() {
                return this.getToStore.id
            },
            set(value) {
                this.updateID(value)
            }
        },
        consent: {
            get() {
                return this.getToStore.consent
            },
            set(value) {
                this.updateConsent(value)
            }
        },
        offer_nbr: {
            get() {
                return this.getToStore.offer_nbr
            },
            set(value) {
                this.updateOfferNbr(value)
            }
        },
        topic_id: {
            get() {
                return this.getToStore.topic_id
            },
            set(value) {
                this.updateTopicID(value)
            }
        },
    },
    async fetch () {
      this.updateFilterValues({}) // set the filter values to nothing every time a generic table is rendered
      this.fetchTableData(this.options.page)
      this.filters.forEach(filter => { // create the filter values that will be used for this generic table instance
          this.getFilters({ 
            link: this.module,
            data: {
                column_name: filter.field,
                distinct: 'true',
                order_type: 'ASC',
                order_field: filter.field
            }
          })
      })
      this.getFacultiesData({
        data: {
            with_user: true
        }
      })
    },
    methods: {
      ...mapMutations({
        updateNumOfItems: 'super_admin/courseOfferingsModule/UPDATE_NUM_OF_ITEMS',
        updateFilterValues: 'super_admin/courseOfferingsModule/UPDATE_FILTER_VALUES',
        setTableModule: 'super_admin/courseOfferingsModule/SET_MODULE',
        setInitialValues: 'super_admin/courseOfferingsModule/SET_INITIAL_VALUES',
        updateInstitution: 'super_admin/courseOfferingsModule/UPDATE_INSTITUTION',
        updateCareer: 'super_admin/courseOfferingsModule/UPDATE_CAREER',
        updateTerm: 'super_admin/courseOfferingsModule/UPDATE_TERM',
        updateCourseID: 'super_admin/courseOfferingsModule/UPDATE_COURSE_ID',
        updateAcadOrg: 'super_admin/courseOfferingsModule/UPDATE_ACAD_ORG',
        updateAcadGroup: 'super_admin/courseOfferingsModule/UPDATE_ACAD_GROUP',
        updateSubject: 'super_admin/courseOfferingsModule/UPDATE_SUBJECT',
        updateCatalog: 'super_admin/courseOfferingsModule/UPDATE_CATALOG',
        updateDescr: 'super_admin/courseOfferingsModule/UPDATE_DESCR',
        updateComponent: 'super_admin/courseOfferingsModule/UPDATE_COMPONENT',
        updateSection: 'super_admin/courseOfferingsModule/UPDATE_SECTION',
        updateClassNbr: 'super_admin/courseOfferingsModule/UPDATE_CLASS_NBR',
        // updateStartTimes: 'super_admin/courseOfferingsModule/UPDATE_START_TIMES',
        // updateEndTimes: 'super_admin/courseOfferingsModule/UPDATE_END_TIMES',
        updateTimes: 'super_admin/courseOfferingsModule/UPDATE_TIMES',
        updateDays: 'super_admin/courseOfferingsModule/UPDATE_DAYS',
        updateID: 'super_admin/courseOfferingsModule/UPDATE_ID',
        updateConsent: 'super_admin/courseOfferingsModule/UPDATE_CONSENT',
        updateOfferNbr: 'super_admin/courseOfferingsModule/UPDATE_OFFER_NBR',
        updateTopicID: 'super_admin/courseOfferingsModule/UPDATE_TOPIC_ID',
      }),
      ...mapActions({
        getData: 'super_admin/courseOfferingsModule/getData',
        getFilters: 'super_admin/courseOfferingsModule/getFilters',
        getFacultiesData: 'super_admin/courseOfferingsModule/getFacultiesData',
        editCourseOffering: 'super_admin/courseOfferingsModule/editCourseOffering',
        createCourseOffering: 'super_admin/courseOfferingsModule/createCourseOffering',
        deleteCourseOffering: 'super_admin/courseOfferingsModule/deleteCourseOffering',
      }),
      fetchTableData(page) { // reusable function for getting the data to be displayed in generic table
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
          var initialValues = this.getTableData[index.index]
          this.setInitialValues(initialValues)
        } else {
          this.setInitialValues({
            course_offerings_id: '',
            institution: '',
            career: '',
            term: '',
            course_id: '',
            acad_org: '',
            acad_group: '',
            subject: '',
            catalog: '',
            descr: '',
            component: '',
            section: '',
            class_nbr: '',
            // start_times: '',
            // end_times: '',
            times: '',
            days: '',
            id: '',
            consent: '',
            offer_nbr: '',
            topic_id: ''
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
      dropdownShouldOpen(VueSelect) {
        return VueSelect.search.length > 2 && VueSelect.open
      },
      cancel() {
        this.show = false
      },
      edit() {
        this.editCourseOffering({
          link: this.module,
          data: {
              page: 1,
              items: this.options.numOfItems,
          }
        })
        this.show = false
      },
      create() {
        this.createCourseOffering({
          link: this.module,
          data: {
              page: 1,
              items: this.options.numOfItems,
          }
        })
        this.show = false
      },
      deleteCO() {
        this.deleteCourseOffering({
          link: this.module,
          data: {
            page: 1,
            items: this.options.numOfItems
          }
        })
        this.show = false
      }
    },
};
</script>

<style></style>
    