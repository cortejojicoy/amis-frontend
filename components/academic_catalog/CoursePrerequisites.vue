<template>
    <div class="w-full mb-4">
        <div class="flex items-center justify-between">
            <div class="my-4 text-xl font-bold">
                Prerequisites
            </div>
            <div>
                <button class="bg-green-500 hover:bg-green-700 text-white p-2 rounded mr-2">
                    Add Row
                </button>
            </div>
        </div>
        <div class="w-full ml-3">
            <div class="mb-2">
                Each row below will be connected by 'OR' operator and each item per row will be connected by 'AND' operator.
            </div>
            <div class="w-full flex">
                <div class="w-full flex items-center">
                    <span class="mr-3 font-bold">Preview:</span> 
                    <div class="border-2 border-solid border-black rounded px-2 py-1 w-full">
                        (CMSC 123 and MATH 28) or (CMSC 123 and MATH 38)
                    </div>
                </div>
            </div>
            <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
                <table class="table-auto w-full items-center text-center">
                    <thead>
                        <tr class="font-bold">
                            <td class="px-2 py-3"></td>
                            <td class="px-2 py-3">Prerequisite</td>
                            <td class="px-2 py-3">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="px-2 py-3">
                                1
                            </td>
                            <td class="px-2 py-3">
                                CMSC 123, MATH 28
                            </td>     
                            <td class="px-2 py-3">
                                <button @click="show = true" class="bg-red-500 hover:bg-red-700 text-white p-2 rounded mr-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-2 py-3">
                                2
                            </td>
                            <td class="px-2 py-3">
                                CMSC 123, MATH 38
                            </td>     
                            <td class="px-2 py-3">
                                <button @click="show = true" class="bg-red-500 hover:bg-red-700 text-white p-2 rounded mr-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-2 py-3">
                                3
                            </td>
                            <td class="px-2 py-3">
                                COI
                            </td>     
                            <td class="px-2 py-3">
                                <button @click="show = true" class="bg-red-500 hover:bg-red-700 text-white p-2 rounded mr-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-2 py-3">
                                4
                            </td>
                            <td class="px-2 py-3">
                                COI
                            </td>     
                            <td class="px-2 py-3">
                                <button @click="show = true" class="bg-red-500 hover:bg-red-700 text-white p-2 rounded mr-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-2 py-3">
                                5
                            </td>
                            <td class="px-2 py-3">
                                COI
                            </td>     
                            <td class="px-2 py-3">
                                <button @click="show = true" class="bg-red-500 hover:bg-red-700 text-white p-2 rounded mr-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

</script>