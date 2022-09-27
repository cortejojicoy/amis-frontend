<template>
    <div>
        <div class="flex lg:nowrap flex-wrap justify-between">
            <Filters :isLoading="initialLoad" :filter_headers="maFilters" :maFilterCss="maCss" :filters="filters" @applyFilter="applyFilter"/>
        </div>
        <div v-if="!maLoading">
            <div class="bg-white overflow-auto shadow-xl sm:rounded-lg">
                <table class="table-auto w-full items-center">
                    <thead>
                        <tr class="font-bold">
                            <td v-for="(maHeader, maHeaderIndex) in maHeaders" :key="maHeaderIndex" class="p-4">{{maHeader}}</td>
                        </tr>
                    </thead>
                    <tbody v-show="mentorAssignment">
                        <tr v-for="(ma, maIndex) in mentorAssignment" :key="maIndex" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td class="px-4 py-3"  @click="openDrawer(); getStudentId(ma.id, ma.sais_id, ma.name, ma.program, ma.status);">{{ ma.name }}</td>
                            <!-- <td class="px-4 py-3"  @click="openDrawer(); getStudentId(ma.id);">{{ ma.name }}</td> -->
                            <td class="px-4 py-3">{{ ma.program }}</td>
                            <td class="px-4 py-3">{{ ma.status }}</td>
                            <td class="px-4 py-3">{{ ma.mentor_name ? ma.mentor_name : "UNASSIGNED" }}</td>
                            <td class="px-4 py-3">{{ ma.mentor_role ? ma.mentor_role : "UNASSIGNED" }}</td>
                            <td class="px-4 py-3">{{ ma.mentor_status ? ma.mentor_status : "UNASSIGNED" }}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-show="mentorAssignment.length < 1" class="w-full text-center">
                    <p>No records found.</p>
                </div>
                <vs-pagination :total-pages="totalPages" :current-page="currentPage" @change="changePage"></vs-pagination>
            </div>
        </div>
        <Loader v-if="maLoading" :loaderType="'table'" :columnNum="6"/>
        
        <Drawer @onUpdateMATxn="updateMATxn" :admin="admin" :userRoles="userRole" :mLink="mLink" :faculty="faculty"/>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import Loader from "../Loader.vue";
import Filters from "../Filters.vue";
import Drawer from "../../components/mentor-assignment/Drawer.vue";
export default {
    components: { Loader, Drawer, Filters },
    data: () => ({
        // adminUnit: '',
        // adminCollege: '',
        openStudentView: true,
        maCss: true,
        q: '',
    }),
    props: {
        faculty: String,
        admin: String,
        maLink: String,
        mLink: String,
        updateTable: Number,
        userRole: String,
        maFilters: {
            type: Array,
            default() {
                return []
            }
        }
    },
    computed: {
        ...mapState({
            filters: state => state.maTable.filters,
            currentPage: state => state.maTable.data.ma.current_page,
            totalPages: state => state.maTable.data.ma.last_page,
            mentorAssignment: state => state.maTable.data.ma.data,
            maLoading: state => state.maTable.loading,
            initialLoad: state => state.maTable.initialLoad
        }),
        ...mapGetters({
            maHeaders: "maTable/getTableHeaders",
            getNumOfItems: "maTable/getNumOfItems"
        }),
        numOfItems: {
            get() {
                return this.getNumOfItems
            },
            set(value) {
                this.updateNumOfItems(value)
                this.getMaTable(1)
            }
        },
    },

    async fetch() {
        this.getMaTable(1)
        this.updateFilterValues({})
        this.maFilters.forEach(maFilter => { 
        this.getFilters({ 
                link: this.maLink,
                role: this.userRole,
                data: {
                    column_name: maFilter.field,
                    distinct: 'true',
                    sais_id: this.$auth.user.sais_id,
                    txn_history: 'true'
                }
            })
        })
    },

    methods: {
        ...mapActions({
            getData: 'maTable/getData',
            getFilters: 'maTable/getFilters'
            
        }),
        ...mapMutations({
            updateNumOfItems: 'maTable/UPDATE_NUM_OF_ITEMS',
            updateFilterValues: 'maTable/UPDATE_FILTER_VALUES',
            updateStudentInfo: "maTable/UPDATE_STUDENT_INFO",
            searchKeywords: "maTable/SEARCH_KEYWORDS",
            drawer: 'maTable/OPEN_DRAWER'
        }),
        applyFilter(data) {
            this.updateFilterValues(data)
            this.getMaTable(1)
        },
        search() {
            this.searchKeywords({
                keywords: this.q
            })
        },
        changePage(page) {
            this.getMaTable(page)
        },
        getMaTable(page) {
            this.getData({
                link: this.maLink,
                role: this.userRole,
                data: {
                    page: page,
                    items: this.numOfItems,
                    faculty: this.faculty,
                    admin: this.admin,
                    sais_id: this.$auth.user.sais_id
                }
            })
        },
        getStudentId(index, id, name, program, status) {
            this.updateStudentInfo({
                index: index,
                studId: this.studentId = id,
                studName: this.studentName = name,
                studProgram: this.studProgram = program,
                studStatus: this.studentStatus = status
            })
            // console.log(index)
        },
        openDrawer() {
            this.drawer({
                status: this.openStudentView
            })
        },
        updateMATxn() {
            this.$emit("onUpdateMATXNs")
        }
    },

    watch: {
        updateTable(newVal, oldVal) {
            this.changePage(1)
        }
    }
}
</script>