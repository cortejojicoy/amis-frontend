<template>
    <div>
        <div class="my-8">
            <div class="flex items-center">
                <div class="w-full flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <Filters :isLoading="isInitialLoad" :filter_headers="tableFilters" :maFilterCss="maCss" :filters="tableFilterData" @applyFilter="filterAction"/>
                    </div>
                    <div>
                        <label for="num-of-items" class="block text-xs text-gray-500">Number of items</label>
                        <select v-model="numOfItems" name="num-of-items" id="num-of-items" class="p-2 w-full">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </div>
            <div v-if="!this.isInitialLoad" class="w-full flex justify-center">
                <CircSpinner :isLoading="this.isLoading" :size="'large'"/>
            </div>
            <div v-if="!this.isLoading" class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
                <table class="table-auto w-full items-center text-center ">
                    <thead>
                        <tr class="font-bold">
                            <td v-for="(header, headerIndex) in tableHeaders" :key="headerIndex" class="px-2 py-3">
                                {{header}}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" :class="maCss ? 'hover:bg-gray-200 cursor-pointer' : ''">
                            <td v-for="(header, headerIndex) in tableHeaders" :key="headerIndex" class="px-2 py-3">
                                <div v-if="header == 'roles' || header == 'permissions'">
                                    <div v-if="row[header].length > 0" class="flex justify-center flex-wrap">
                                        <div v-for="(item, itemIndex) in row[header]" :key="itemIndex" class="m-1 p-1 bg-blue-200 rounded shadow hover:bg-blue-400 hover:text-white">
                                            {{item}} 
                                        </div>
                                    </div>
                                    <div v-else>
                                        -- Empty --
                                    </div>
                                </div>
                                <div v-else-if="header != 'action'">
                                    <div v-if="isMa != 'ma'">
                                        {{row[header]}}
                                    </div>

                                    <div v-else>
                                        <td class="flex justify-center flex-wrap" @click="openDrawer(rowIndex)">{{ row[header] }}</td>
                                    </div>
                                </div>
                                <div v-else>
                                    <slot name="action" :index="rowIndex">

                                    </slot>
                                </div>
                            </td>
                        </tr>    
                    </tbody>
                </table>
                <vs-pagination :total-pages="tableData.last_page" :current-page="tableData.current_page" @change="changePage"></vs-pagination>
            </div>
            <Loader v-if="this.isInitialLoad && this.isLoading" :loaderType="'table'" :columnNum="4"/>
        </div>
    </div>
</template>

<script>
import CircSpinner from './CircSpinner.vue';
import Loader from "./Loader.vue";
import Filters from "./Filters.vue";
import GenericDrawer from "./GenericDrawer.vue";

export default {
    props: {
        maCss: {
            type: Boolean
        },
        isMa: {
            type: String
        },
        isLoading: {
            type: Boolean
        },
        isInitialLoad: {
            type: Boolean
        },
        tableFilters: {
            type: Array,
            default() {
                return []
            }
        },
        tableFilterData: {
            type: Object
        },
        tableHeaders: {
            type: Array
        },
        tableData: {
            type: Array
        },
    },
    data() {
        return {
            page: 0,
            options: {
                numOfItems: 5,
                filters: {}
            },
            watcherValue: 0
        };
    },
    components: {
        Loader,
        CircSpinner,
        Filters,
        GenericDrawer,
    },
    computed: {
        numOfItems: {
            get() {
                return this.options.numOfItems
            },
            set(value) {
                this.options.numOfItems = value
                this.watcherValue++
            }
        }
    },
    methods: {
        filterAction(data) { // apply the filter from the filters component
            // console.log(data)
            this.options.filters = data
            this.watcherValue++
        },
        changePage(page) { // change the page
            this.page = page
        },
        openDrawer(index) { // if clicked; display student info
            this.$emit('openDetails', this.tableData[index])
        }
    },
    watch: {
        watcherValue(newVal, oldVal) {
            this.$emit('onUpdateOptions', this.options)
        },
        page(newVal, oldVal) {
            this.$emit('onUpdatePage', this.page)
        }
    }
}
</script>