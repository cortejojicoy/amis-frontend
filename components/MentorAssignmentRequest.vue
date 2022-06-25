<template>
  <div class="my-6">
    <div class="flex align-middle items-center mb-6">
      <div class="text-2xl font-bold mr-3">Mentor Assignment Request</div>
      <div>(acceptance or rejection of nomination to serve as mentor)</div>
    </div>
    <div class="flex">
      <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
        <table class="table-auto w-full items-center text-center">
          <tr class="font-bold">
            <th class="px-2 py-3">Actions</th>
            <th class="px-2 py-3">Mentor Name</th>
            <th class="px-2 py-3">Field Represented</th>
            <th class="px-2 py-3">Effectivity Start</th>
            <th class="px-2 py-3">Effectivity End</th>
            <th class="px-2 py-3">Actions</th>
          </tr>
          <tbody>
            <tr>
              <td class="px-4 py-3">{{ $data["actions"] }}</td>
              <td class="px-4 py-3">{{ $data["mentor_name"] }}</td>
              <td class="px-4 py-3">{{ $data["field_represented"] }}</td>
              <td class="px-4 py-3">{{ $data["effectivity_start"] }}</td>
              <td class="px-4 py-3">{{ $data["effectivity_end"] }}</td>

              <td class="px-4 py-3">
                <button class="bg-green-500 text-white p-2 rounded">
                  Endorse
                </button>
                <button class="bg-red-500 text-white p-2 rounded">
                  Reject
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
export default {};
</script>
