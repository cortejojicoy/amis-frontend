<template>
    <div
      class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="text-2xl font-bold mb-8">
              Major Elective Coursework
          </div>
  
          <div class="text-md">
            <p class="mb-4 font-bold">
                NOTICE (PLEASE READ): 
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    components: {
      
    },
    data () {
      return {
        filters: [
          {field: 'c.coi_id', name: 'coi_id', type: 'combobox', label: 'reference_id'},
          {field: 'action', name: 'action', type: 'select', label: 'action'},
          {field: 'course', name: 'course', type: 'select', label: 'course'},
        ]
      };
    },
    methods:{
      
    }
  };
  </script>
  
  <style></style>
  