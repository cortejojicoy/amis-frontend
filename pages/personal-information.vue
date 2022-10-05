<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div v-if="!isLoading" class="bg-white overflow-hidden sm:rounded-lg p-4 flex flex-wrap">
            <div class="md:w-1/4 w-full items-center justify-center flex md:m-0 my-8">
                <img src="/logos/no-picture.png" class="h-70 w-auto" alt="User Picture">
            </div>
            <div class="md:w-3/4 w-full text-md">
                <div class="my-4 text-xl font-bold">
                    General Information
                </div>
                <div class="flex flex-wrap">
                    <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                        <div class="text-gray-500 block w-full">
                            Name:
                        </div>
                        <div class="block w-full">
                            {{userData.user.full_name}}
                        </div>
                    </div>
                    <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                        <div class="text-gray-500 block w-full">
                            SAIS ID:
                        </div>
                        <div class="block w-full">
                            {{userData.user.sais_id}}
                        </div>
                    </div>
                    <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                        <div class="text-gray-500 block w-full">
                            Email:
                        </div>
                        <div class="block w-full">
                            {{userData.user.email}}
                        </div>
                    </div>
                </div>
                <div v-if="userData.user.student">
                    <hr class="border-2 border-solid border-black mb-6" />
                    <div class="my-4 text-xl font-bold">
                        Student Data
                    </div>
                    <div class="flex flex-wrap">
                        <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                            <div class="text-gray-500 block w-full">
                                Student ID:
                            </div>
                            <div class="block w-full">
                                {{userData.user.student.campus_id}}
                            </div>
                        </div>
                        <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                            <div class="text-gray-500 block w-full">
                                Degree Program:
                            </div>
                            <div class="block w-full">
                                {{userData.user.student.program_records[0].academic_program_id}}
                            </div>
                        </div>
                        <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                            <div class="text-gray-500 block w-full">
                                GWA:
                            </div>
                            <div class="block w-full">
                                {{userData.user.gwa}}
                            </div>
                        </div>
                        <div class="flex flex-wrap mb-3 md:w-1/2 w-full">
                            <div class="text-gray-500 block w-full">
                                Total Units:
                            </div>
                            <div class="block w-full">
                                {{userData.user.totalUnits}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Loader v-else/>
       </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import Loader from "../components/Loader.vue";

export default {
    components: {
        Loader
    },
    computed: {
        ...mapState({
            isLoading: state => state.personalInformation.loading,
        }),
        ...mapGetters({
            userData: "personalInformation/getUserData"
        }),
    },
    async fetch () {
        this.getUser({
            sais_id: this.$auth.user.sais_id
        })
    },
    methods: {
        ...mapActions({
            getUser: 'personalInformation/getUser',
        }),
    }
};
</script>

<style></style>
