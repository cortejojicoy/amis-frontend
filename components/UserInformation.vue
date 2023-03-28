<template>
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
                    <input class="w-full border border-gray-400 p-1 rounded" type="text" :value="userInfo.details.first_name" :disabled="!editEnabled ? true : null">
                </div>
            </div>
            <div class="flex flex-wrap mb-3 md:w-1/3 w-full">
                <div class="text-gray-500 block w-full">
                    Middle name:
                </div>
                <div class="block md:w-10/12 w-full">
                    <input class="w-full border border-gray-400 p-1 rounded" type="text" :value="userInfo.details.middle_name" :disabled="!editEnabled ? true : null">
                </div>
            </div>
            <div class="flex flex-wrap mb-3 md:w-1/3 w-full">
                <div class="text-gray-500 block w-full">
                    Last name:
                </div>
                <div class="block md:w-10/12 w-full">
                    <input class="w-full border border-gray-400 p-1 rounded" type="text" :value="userInfo.details.last_name" :disabled="!editEnabled ? true : null">
                </div>
            </div>
            </div>
            <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                <div class="text-gray-500 block w-full">
                    SAIS ID:
                </div>
                <div class="block md:w-10/12 w-full">
                <input class="w-full border border-gray-400 p-1 rounded" type="text" :value="userInfo.sais_id" :disabled="!editEnabled ? true : null">
                </div>
            </div>
            <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                <div class="text-gray-500 block w-full">
                    Email:
                </div>
                <div class="block md:w-10/12 w-full">
                <input class="w-full border border-gray-400 p-1 rounded" type="text" :value="userInfo.details.email" :disabled="!editEnabled ? true : null">
                </div>
            </div>
            <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                <div class="text-gray-500 w-1/2">
                    Tester:
                </div>
                <div class="w-1/2">
                <input class="w-full border border-gray-400 p-1 rounded" type="checkbox" :checked="userInfo.details.email" :disabled="!editEnabled ? true : null">
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import 'vue-select/dist/vue-select.css';
import CircSpinner from './CircSpinner.vue';

export default {
    props: {
        userInfo: {
            type: Object
        },
        editEnabled: {
            type: Boolean
        }
    },
    components: {
        CircSpinner
    },
    computed: {
        ...mapState({

        }),
        ...mapGetters({

        }),

    },
    async fetch () {
        this.getCoursesData()
    },
    methods: {
        ...mapActions({

        }),
        ...mapMutations({

        }),
    },
    watch: {
      
    }
}
</script>