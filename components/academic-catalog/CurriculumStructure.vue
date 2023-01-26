<template>
    <div class="w-full h-full mb-4 bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
        <div class="flex items-center justify-start">
            <div class="my-4 mr-2 text-md font-bold">
                {{curriculumTitle}}
            </div>
            <div class="text-sm text-gray-500">
                (Total number of subjects: {{curriculumDetails.total_count}})
            </div>
        </div>
        <div>
            <div class="flex">
                <div class="w-full">
                    <div v-for="(course, courseIndex) in details" :key="courseIndex">
                        <div v-if="course.course != null">
                            {{course.course.course_code}} - {{course.course.title}}
                        </div>
                        <div v-else>
                            {{course.course_type}} - {{course.description}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    props: {
        curriculumDetails: {
            type: Object
        },
        curriculumCourses: {
            type: Array
        },
        index: {
            type: Number
        }
    },
    async fetch () {
        this.setInitialData({
            value: {
                curriculumCourses: this.curriculumCourses,
                curriculumDetails: this.curriculumDetails,
            },
            key: this.index
        })
    },
    computed: {
        ...mapGetters({
            semYearCourses: "academic_catalog/curriculumStructures/getSemYearCourses",
            title: "academic_catalog/curriculumStructures/title",
        }),
        details() {
            return this.semYearCourses(this.index)
        },
        curriculumTitle() {
            return this.title(this.index)
        }
    },
    methods: {
        ...mapMutations({
            setInitialData: 'academic_catalog/curriculumStructures/SET_INITIAL_DATA'
        }),
    }
}
</script>