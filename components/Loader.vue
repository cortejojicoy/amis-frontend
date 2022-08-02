<template>
    <div class="my-2">
        <div v-if="loaderType == 'text'" class="border border-gray-300 shadow rounded-md p-4 w-full mx-auto">
            <div class="animate-pulse flex py-4">
                <div class="flex justify-center w-1/4">
                    <div class="rounded-full bg-blue-500 h-20 w-20"></div>
                </div>
                <div class="flex-1 space-y-6 py-1 px-2">
                    <div class="h-2 bg-blue-500 rounded"></div>
                    <div class="space-y-2">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-blue-500 rounded col-span-2"></div>
                            <div class="h-2 bg-blue-500 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-blue-500 rounded"></div>
                        <div class="h-2 bg-blue-500 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="loaderType == 'table'" class="border border-gray-300 shadow rounded-md p-4 w-full mx-auto">
            <div class="animate-pulse flex py-4">
                <table class="table-auto w-full items-center text-center">
                <thead class="space-x-4">
                    <td v-for="cn in columnNum" v-bind:key="cn">
                        <div class="h-3 bg-blue-500 rounded mx-2"></div>
                    </td>
                </thead>
                <tbody>
                    <tr>
                        <td v-for="cn in columnNum" v-bind:key="cn">
                            <div class="h-2 bg-blue-500 rounded m-2"></div>
                        </td>
                    </tr>
                    <tr>
                        <td v-for="cn in columnNum" v-bind:key="cn">
                            <div class="h-2 bg-blue-500 rounded m-2"></div>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	props: {
        loaderType: {
            type: String,
            default: 'text'
        },
        columnNum: {
            type: Number,
            default: 4
        }
    },
    data() {
        return {
            // isLoading: true
        };
    },
}
</script>