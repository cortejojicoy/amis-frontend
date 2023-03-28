<template>
    <div class="w-full mb-4">
        <div class="flex items-center">
            <div class="my-4 text-xl font-bold">
                General Details
            </div>
        </div>
        <div class="flex flex-wrap">
            <div class="w-full md:w-1/2">
                <div class="w-full flex mb-3">
                    <div class="font-bold">
                        <span class="ml-3">Title:</span>
                    </div>
                    <div class="ml-3">
                        {{courseDetails.title}}
                    </div>
                </div>
                <div class="w-full flex mb-3">
                    <div class="font-bold">
                        <span class="ml-3">Description:</span>
                    </div>
                    <div class="ml-3">
                        {{courseDetails.description}}
                    </div>
                </div>
                <div class="w-full flex mb-3">
                    <div class="font-bold">
                        <span class="ml-3">Career:</span>
                    </div>
                    <div class="ml-3">
                        {{courseDetails.career == 'UGRD' ? 'Undergraduate' : 'Graduate'}}
                    </div>
                </div>
                <div class="w-full flex mb-3">
                    <div class="font-bold">
                        <span class="ml-3">Sem Offered:</span>
                    </div>
                    <div class="ml-3">
                        {{courseDetails.sem_offered}}
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/2">
                <div class="w-full flex flex-wrap md:mb-3">
                    <div class="w-full mb-3 md:mb-0 md:w-1/2 flex">
                        <div class="font-bold">
                            <span class="ml-3">Units:</span>
                        </div>
                        <div class="ml-3">
                            {{courseDetails.units}}
                        </div>
                    </div>
                    <div class="w-full mb-3 md:mb-0 md:w-1/2 flex">
                        <div class="font-bold">
                            <span class="ml-3 md:ml-0">Campus:</span>
                        </div>
                        <div class="ml-3">
                            {{courseDetails.campus}}
                        </div>
                    </div>
                </div>
                <div class="w-full flex flex-wrap md:mb-3">
                    <div class="w-full mb-3 md:mb-0 md:w-1/2 flex">
                        <div class="font-bold">
                            <span class="ml-3">Active:</span>
                        </div>
                        <div class="ml-3">
                            {{courseDetails.is_active ? 'YES' : 'NO'}}
                        </div>
                    </div>
                    <div class="w-full mb-3 md:mb-0 md:w-1/2 flex">
                        <div class="font-bold">
                            <span class="ml-3 md:ml-0">Repeatable:</span>
                        </div>
                        <div class="ml-3">
                            {{courseDetails.is_repeatable ? 'YES' : 'NO'}}
                        </div>
                    </div>
                </div>
                <div class="w-full flex flex-wrap md:mb-3">
                    <div class="w-full mb-3 md:mb-0 md:w-1/2 flex">
                        <div class="font-bold">
                            <span class="ml-3">Multiple Enrollment:</span>
                        </div>
                        <div class="ml-3">
                            {{courseDetails.is_multiple_enrollment ? 'YES' : 'NO'}}
                        </div>
                    </div>
                    <div class="w-full mb-3 md:mb-0 md:w-1/2 flex">
                        <div class="font-bold">
                            <span class="ml-3 md:ml-0">Contact Hours:</span>
                        </div>
                        <div class="ml-3">
                            {{courseDetails.contact_hours ? courseDetails.contact_hours : "No data" }}
                        </div>
                    </div>
                </div>
                <div class="w-full flex flex-wrap mb-3">
                    <div class="font-bold">
                        <span class="ml-3">Teaching Mode:</span>
                    </div>
                    <div class="ml-3">
                        {{courseDetails.teaching_model ? courseDetails.teaching_model.description : "No data"}}
                    </div>
                </div>
                <div class="w-full flex mb-3">
                    <div class="font-bold">
                        <span class="ml-3">Equivalent:</span>
                    </div>
                    <div class="ml-3">
                        {{courseDetails.equivalent ? courseDetails.equivalent : 'Not Applicable'}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        courseDetails: {
            type: Object
        }
    }
}
</script>