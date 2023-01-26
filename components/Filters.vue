<template>
    <div :class="maFilterCss ? 'my-2 w-full text-center' : 'my-2' ">
        <div v-if="!isLoading">
            <div v-if="filter_headers.length > 0" class="mb-4 flex items-end">
                <div v-for="(filter, filterKey) in filter_headers" :key="filterKey" :class="maFilterCss ? 'mr-2 w-full' : 'mr-2'">
                    <!-- {{ filter }} -->
                    <div v-if="filter.type == 'select'">
                        <label :for=filterKey class="block text-xs text-gray-500">{{filter.label}}</label>
                        <select :name=filterKey :id="filter.name + '_' + filterKey" :class="maFilterCss ? 'p-2 leading-8 w-28' : 'p-2 leading-8' " @change="chooseFilter($event.target.value, filter.name)">
                            <option value="--" class="text-center" selected>--</option>
                            <option v-for="(fValue, fKey) in filters[filter.field]" :key="fKey">{{fValue[filter.name]}}</option>
                        </select>
                    </div>
                    <div v-else-if="filter.type == 'combobox'" class="w-52">
                        <label :for=filterKey class="block text-xs text-gray-500">{{filter.label}}</label>
                        <v-select class="w-full style-chooser" :dropdown-should-open="dropdownShouldOpen" :label="filter.name" :options="filters[filter.field]" @input="(value) => chooseCombobox(filter.name, value)"></v-select>
                    </div>
                </div>
                <div :class="maFilterCss ? 'w-full' : ''">
                    <button @click="applyFilter" class="p-2 bg-blue-500 text-white">Apply Filter</button>
                </div>
            </div>
        </div>
        <Loader v-else :loaderType="'filters'" :columnNum="3" />
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import Loader from "./Loader.vue";
import 'vue-select/dist/vue-select.css';

export default {
	props: {
        maFilterCss: {
            type: Boolean
        },
        filter_headers: {
            type: Array,
        },
        filters: {
            type: Object,
        },
        isLoading: {
            type: Boolean
        }
    },
    components: {
        Loader,
    },
    computed: {
        ...mapState({
            filterValues: state => state.filters.filterValues,
        }),
    },
    async fetch () {
        this.filter_headers.forEach(txnFilter => {
            this.createFilters(txnFilter.name)
        });
    },
    methods: {
        ...mapMutations({
            createFilters: 'filters/CREATE_FILTERS',
            updateFilterValue: 'filters/UPDATE_FILTER_VALUE'
        }),
        chooseFilter(e, key) {
            this.updateFilterValue({
                key: key,
                value: e
            })
        },
        chooseCombobox(key, value) {
            if(value) {    
                this.updateFilterValue({
                    key: key,
                    value: value[key]
                })
            } else {
                this.updateFilterValue({
                    key: key,
                    value: '--'
                })
            }
        },
        applyFilter() {
            this.$emit('applyFilter', this.filterValues)
        },
        dropdownShouldOpen(VueSelect) {
            return VueSelect.search.length > 2 && VueSelect.open
        },
    }
}
</script>

<style>
    .style-chooser .vs__search::placeholder,
    .style-chooser .vs__dropdown-toggle,
    .style-chooser .vs__dropdown-menu,
    .vs--searchable, .vs__search {
        line-height: 1.75rem !important;
    }
</style>