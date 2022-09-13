<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex items-center mb-4">
            <div class="text-2xl font-bold">
                Generate Module Data
            </div>
            <CircSpinner :isLoading="coursesLoading"/>
        </div>
        <div>
            <div class="mb-8">
                <div class="text-xl font-bold mb-8">
                   Consent of Instructor
                </div>
                <div class="mt-6">
                    <div class="mt-5 flex">
                        <div class="mr-2">
                            <button @click="download('coi','ocs', 'ocs_approved_coi_' + timestamp + '.xlsx')" class="p-2 rounded bg-blue-500 text-white">Download OCS COI Data</button>
                        </div>
                        <div>
                            <button @click="download('coi','sais', 'sais_approved_coi_' + timestamp + '.xlsx')" class="p-2 rounded bg-blue-500 text-white">Download SAIS COI Data</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="border-2 border-solid border-black mb-6" />
            <div class="mb-8">
                <div class="text-xl font-bold mb-8">
                    Prerogative Enrollment
                </div>
                <div class="mt-6">
                    <div class="mt-5 flex">
                        <div>
                            <button @click="download('prerog','sais', 'sais_approved_prerog_' + timestamp + '.xlsx')" class="p-2 rounded bg-blue-500 text-white">Download SAIS Prerog Data</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CircSpinner from '../../components/CircSpinner.vue';

export default {
    data() {
        return {
            timestamp: ""
        }
    },
    components: {
        CircSpinner,
    },
    created() {
        setInterval(this.getNow, 1000);
    },
    computed: {
        ...mapState({
            coursesLoading: state => state.super_admin.downloadData.loading,
        }),
    },
    methods: {
        ...mapActions({
            downloadData: 'super_admin/downloadData/generateData',
        }),
        download(module, type, filename) {
            this.downloadData({
                module: module,
                type: type,
                filename: filename
            })
        },
        getNow() {
            const today = new Date();
            const date = today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate();
            this.timestamp = date;
        }
    },
};
</script>

<style></style>
