<template>
<div>
  <nav
    class="flex fixed w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-20">
    <!-- START HEADER -->
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center">
        <button class="mr-2" aria-label="Open Menu" @click="drawer">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-8 h-8">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div class="m-auto md:mx-4">
          <img src="/logos/uplb-official-logo.png" class="h-12 w-auto" alt="UPLB Logo" />
        </div>
        <h1 class="font-semibold text-xl hidden md:flex items-center">
          AMIS
        </h1>
      </div>
      <div class="flex items-center">
        <NuxtLink to='/personal-information' class="md:mr-4">
          <div class="flex items-center">
            <div class="m-auto px-3">
              <img
                src="/logos/no-picture.png"
                class="h-8 w-auto"
                alt="User Picture" />
            </div>
            <h1 class="font-semibold text-lg hidden md:flex items-center">
              {{ this.$auth.user.first_name }}
            </h1>
          </div>
        </NuxtLink>
        <div class="relative inline-block">
          <svg @click="isSettingOpen =  !isSettingOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
          <ul v-if="isSettingOpen" class="absolute z-10 right-1 bg-white pt-4 border">
            <li class="block py-2 px-10 hover:bg-blue-200 cursor-pointer">Settings</li>
            <li @click="logout" class="block py-2 px-10 hover:bg-red-500 hover:text-white cursor-pointer">Logout</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- END HEADER -->
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0">
      <div
        @keydown.esc="isOpen = false"
        v-show="isOpen"
        class="z-10 fixed inset-0 transition-opacity">
        <div
          @click="isOpen = false;"
          class="absolute inset-0 bg-black opacity-0"
          tabindex="0"></div>
      </div>
    </transition>
    <aside
      class="transform top-16 left-0 w-64 bg-white fixed h-full shadow-md overflow-auto ease-in-out transition-all duration-300 z-10"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <!-- DASHBOARD -->
      <!-- <span
        @click="isOpen = false"
        class="flex w-full items-center p-4 border-b">
        <div class="flex text-black">
          <div class="m-auto px-3">
            <img
              src="/logos/no-picture.png"
              class="h-12 w-auto"
              alt="User Picture" />
          </div>

          <div class="inline-block w-2/3">
            <p class="font-bold text-xl">{{ this.$auth.user.first_name }} {{ this.$auth.user.middle_name }} {{ this.$auth.user.last_name }}</p>
            <p class="break-words text-sm">{{ this.$auth.user.email }}</p>
          </div>
        </div>
      </span> -->
      <span
        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700"
        ><span class="mr-2">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6">
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </span>
        <NuxtLink to='/'>Dashboard</NuxtLink>
      </span>
        <!-- END DASHBOARD -->
      <!-- FUTURE PROOFING -->
      <span
        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700">
        <span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        </span>
        <span>Future Proofing</span>
        <ul id="dropdown-future-proofing" class="hidden py-2 space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >Products</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >Billing</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >Invoice</a
            >
          </li>
        </ul>
      </span>
      <!-- END FUTURE PROOFING -->
      <!-- FACULTY -->
      <span
        @click="isFacultyOpen = !isFacultyOpen"
        v-show="isFaculty"
        class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700 cursor-pointer">
        <span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </span>
        <span>Faculty Portal</span>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          class="w-3 h-3 ml-auto transform"
          :class="isFacultyOpen ? 'rotate-0' : '-rotate-90'"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
        </svg>
     
      </span>
         <ul id="dropdown-faculty" class="py-2 space-y-2"  v-show="isFacultyOpen">
          <!-- <li
          class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <NuxtLink to='/faculty/mentor-assignments'>Mentor Assignment</NuxtLink>
          </li> -->
          <!-- <li
          class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <NuxtLink to='/faculty/my-advisees'>My Advisees</NuxtLink>
          </li>  -->
          <li
            class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <NuxtLink to='/faculty/consent-of-instructor'>Consent of Instructor</NuxtLink>
          </li>
          <li
            class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <NuxtLink to='/faculty/prerogative-enrollment'>Prerogative Enrollment</NuxtLink>
          </li>
          <!-- remove if pcw is ready -->
          <!-- <li
            class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <NuxtLink to='/faculty/ge-coursework'>GE Coursework</NuxtLink>
          </li> -->
        </ul>
      <!-- END FACULTY -->
      <!-- STUDENT PORTAL -->
      <span
        @click="isStudentOpen = !isStudentOpen"
        v-show="isStudent"
        class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700 cursor-pointer"
        >
        <span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </span>
        <span>Student Portal</span>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          class="w-3 h-3 ml-auto transform"
          :class="isStudentOpen ? 'rotate-0' : '-rotate-90'"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
        </svg>
      </span>
       <ul id="dropdown-student" class=" py-2 space-y-2" v-show="isStudentOpen">
          <!-- <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <NuxtLink
              to='/student/specialization'
              >Spezialization</NuxtLink>
          </li>

          <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <NuxtLink
              to='/student/mentor-assignments'
              >Mentor Assignment</NuxtLink>
          </li> -->
          <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <NuxtLink
              to='/student/consent-of-instructor'
              >Consent of Instructor</NuxtLink>
          </li>
          <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <NuxtLink
              to='/student/prerogative-enrollment'
              >Prerogative Enrollment</NuxtLink>
          </li>
          <!-- remove if pcw is ready -->
          <!-- <li class="items-center p-2 pr-4 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <span @click="isPlanOfCourseworkOpen = !isPlanOfCourseworkOpen" class="flex items-center cursor-pointer">
              <span>Plan of Coursework</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                class="w-3 h-3 ml-auto transform"
                :class="isPlanOfCourseworkOpen ? 'rotate-0' : '-rotate-90'"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <path
                  fill="currentColor"
                  d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
              </svg>
            </span>
          </li>
          <ul id="dropdown-student" class="py-2 m-0 space-y-2" v-show="isPlanOfCourseworkOpen">
            <li class="flex items-center p-2 pl-16 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
              <NuxtLink
                to='/student/ge-coursework'
                >GE Coursework</NuxtLink>
            </li>
            <li class="flex items-center p-2 pl-16 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
              <NuxtLink
                to='/student/major-coursework'
                >Major Coursework</NuxtLink>
            </li>
          </ul> -->
        </ul>
      <!-- END STUDENT -->
      <!-- ADMIN PORTAL -->
      <span
        @click="isAdminOpen = !isAdminOpen"
        v-show="isAdmin"
        class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700 cursor-pointer"
        >
        <span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </span>
        <span>Admin Portal</span>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          class="w-3 h-3 ml-auto transform"
          :class="isAdminOpen ? 'rotate-0' : '-rotate-90'"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
        </svg>
      </span>
       <ul id="dropdown-student" class=" py-2 space-y-2" v-show="isAdminOpen">
          <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <NuxtLink
              to='/admin/mentor-assignment-unit'
              >Mentor Assignments (Unit) </NuxtLink>
          </li> -->

          <li v-if="adminTags[0].college != ''" class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <NuxtLink
              to='/admin/mentor-assignment-college'
              >Mentor Assignments (College) </NuxtLink>
          </li>
        </div>

          <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <NuxtLink
              to='/admin/prerogative-enrollment'
              >Prerogative Enrollment</NuxtLink>
          </li>
          <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <NuxtLink
              to='/admin/consent-of-instructor'
              >Consent of Instructor</NuxtLink>
          </li>
          
        </ul>
      <!-- END ADMIN PORTAL -->
      <!-- SUPER ADMIN PORTAL -->
      <span
        @click="isSuperAdminOpen = !isSuperAdminOpen"
        v-show="isSuperAdmin"
        class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700 cursor-pointer"
        >
        <span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </span>
        <span>Super Admin Portal</span>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          class="w-3 h-3 ml-auto transform"
          :class="isSuperAdminOpen ? 'rotate-0' : '-rotate-90'"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
        </svg>
      </span>
      <ul id="dropdown-student" class=" py-2 space-y-2" v-show="isSuperAdminOpen">
        <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <NuxtLink
            to='/super-admin/download-data'
            >Export Module Data</NuxtLink>
        </li>
        <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <NuxtLink
            to='/super-admin/permissions-module'
            >Permissions Module</NuxtLink>
        </li>
        <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <NuxtLink
            to='/super-admin/tags-module'
            >Tags Module</NuxtLink>
        </li>
        <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <NuxtLink
            to='/super-admin/users-module'
            >Users Module</NuxtLink>
        </li>
        <li class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <NuxtLink
            to='/super-admin/course-offerings-module'
            >Course Offerings Module</NuxtLink>
        </li>
      </ul>
      <!-- END SUPER ADMIN PORTAL -->
      <span
        @click="isAcademicCatalogOpen = !isAcademicCatalogOpen"
        class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700 cursor-pointer"
        >
        <span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </span>
        <span>Academic Catalog</span>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          class="w-3 h-3 ml-auto transform"
          :class="isAcademicCatalogOpen ? 'rotate-0' : '-rotate-90'"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path
            fill="currentColor"
            d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
        </svg>
      </span>
      <ul id="dropdown-student" class=" py-2 space-y-2" v-show="isAcademicCatalogOpen">
        <NuxtLink to='/courses-management'>
          <li class="flex items-center p-2 pl-11 py-3 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            Courses Management
          </li>
        </NuxtLink>
        <NuxtLink to='/programs-management'>
          <li class="flex items-center p-2 pl-11 py-3 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            Programs Management
          </li>
        </NuxtLink>
        <NuxtLink to='/curriculums-management'>
          <li class="flex items-center p-2 pl-11 py-3 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            Curriculums Management
          </li>
        </NuxtLink>
      </ul>
    </aside>
      <Alert/>
  </nav>
</div>

</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import Alert from './Alert.vue';
export default {
    data() {
        return {
            isOpen: false,
            isSettingOpen: false,
            isFacultyOpen: false,
            isStudentOpen: false,
            isAdminOpen: false,
            isSuperAdminOpen: false,
            isAcademicCatalogOpen: false,
            isPlanOfCourseworkOpen: false
        };
    },
    async fetch() {
      if(this.isAdmin) {this.getAdminTag()}
    },
    methods: {
        ...mapActions({
            getAdminTag: "maTable/checkTags"
        }),
        drawer() {
            this.isOpen = !this.isOpen;
        },
        async logout() {
            await this.$auth.logout();
            await this.$router.push("/auth/login");
        },
    },
    watch: {
        isOpen: {
            immediate: true,
            handler(isOpen) {
                if (process.client) {
                    if (isOpen)
                        document.body.style.setProperty("overflow", "hidden");
                    else
                        document.body.style.removeProperty("overflow");
                }
            },
        },
    },
    computed: {
        ...mapState({
            adminTags: state => state.maTable.adminTags
        }),
        isFaculty() {
          if(this.$auth.user.roles) {
            const roles = this.$auth.user.roles;
            return roles.find(el => el.name === "faculty") ? true : false;
          } else {
            return false
          }
        },
        isStudent() {
          if(this.$auth.user.roles) {
            const roles = this.$auth.user.roles;
            return roles.find(el => el.name === "student") ? true : false;
          } else {
            return false
          }
        },
        isAdmin() {
          if(this.$auth.user.roles) {
            const roles = this.$auth.user.roles;
            return roles.find(el => el.name === "admin") ? true : false;
          } else {
            return false
          }
        },
        isSuperAdmin() {
          if(this.$auth.user.roles) {
            const roles = this.$auth.user.roles;
            return roles.find(el => el.name === "super_admin") ? true : false;
          } else {
            return false
          }
        },
    },
    mounted() {
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 27 && this.isOpen)
                this.isOpen = false;
        });
    },
    components: { Alert }
};
</script>
