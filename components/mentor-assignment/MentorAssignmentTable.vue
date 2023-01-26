<template>
    <div class="my-6">
        <!-- {{ getActitveMentorByUuid }} -->

        <div class="flex align-middle items-center mb-6">
            <div class="text-2xl font-bold mr-3"> Mentor Assignment 
                {{ navbar === 'my-advisee' ? 'Request' : '' || navbar === 'unit' ? 'Request' : '' || navbar === 'mentor-assignment-college' ? 'Approval' : '' }} 
            </div><div> (acceptance or rejection of nomination to serve as mentor) </div>
        </div>

        <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4 w-full">
            <table class="table-auto w-full items-center text-center">
                <thead>
                    <tr class="font-bold">
                        <td v-for="(header, headerIndex) in headers" :key="headerIndex" class="p-4">{{header}}</td>
                    </tr>
                </thead>
                <tbody>
                    <!-- {{ mentorTable }} -->
                    <tr v-for="(ma, maIndex) in mentorTable" :key="maIndex">
                        <!-- {{ ma.uuid == uuid }} -->
                        <td v-for="(header, headerIndex) in headers" :key="headerIndex" class="px-4 py-3">
                            <div v-if="ma != ''">
                                <div v-if="header !== 'action'">
                                    {{ ma[header] }}                                
                                    <!-- {{ ma.id }} -->
                                </div>
                                <div v-else>
                                    <slot name="action" :id="ma.id">
    
                                    </slot>
                                </div>
                            </div>
                            <div v-else>
                                -- No Request Available --
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>


<script>
import "vue-select/dist/vue-select.css";
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import VTailwindModal from "../VTailwindModal.vue";
import StudentActiveMentor from "./StudentActiveMentor.vue";
import Loader from "../Loader.vue";
export default {
    data() {
        return {
            headers: [
                "actions",
                "mentor_name",
                "roles",
                "action",
            ],
        }
    },
    props: {
        navbar: {
            type: String
        },
        mentorTable: {
            type: Array
        },
        uuid: {
            type: String
        }
    }
}
</script>