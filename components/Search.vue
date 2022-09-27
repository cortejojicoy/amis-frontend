<template>
    <div>
        <!-- <input type="text" id="filter-search" class="bg-gray-50 border text-gray-900 text-small p-1" placeholder="Search keyword..." /> -->
        <input type="text" v-model="q" class="bg-gray-50 border text-gray-900 text-small p-1" placeholder="Search keyword..."/>
        <button @click="search" class="p-1 ml-2 text-small font-small text-white bg-blue-700 border border-blue-700">Search</button>
        <button type="submit" @click="viewAll" class="p-1 ml-2 text-small font-small text-white bg-green-500 border border-green-500">View All</button>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
    data: () => ({
        q: ''
    }),

    props: {
        sLink: String,
        sRoles: String
    },
    
    methods: {
        ...mapActions({
            getSearch: "search/getData"
        }),

        search() {
            this.getSearch({
                keywords: this.q,
                role: this.sRoles,
                link: this.sLink
            })
            // console.log(this.q)
        }
    }
}
</script>