<script setup lang="ts">
import { IconLogout2, IconPlus, IconGenderFemale, IconGenderMale } from '@tabler/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <div>
    <header class="flex flex-row items-center justify-between p-2 bg-red-500 rounded-b-2xl">
      <img src="https://placehold.co/40x40" class="w-10 rounded-xl">
      <h2 class="text-xl font-medium text-white">اپلیکیشن پت</h2>
      <button class="text-sm text-white">
        <icon-logout-2 />
      </button>
    </header>

    <main class="px-4 space-y-10">
      <section class="mt-10">
        <h2 class="text-2xl">سلام حسین!</h2>
        <p class="mt-2 text-sm text-gray-500">اینجا بهت کمک می کنیم بهتر به حیوون های خونگیت برسی!</p>
      </section>

      <section class="p-10 bg-red-500 shadow-lg rounded-xl shadow-red-300">
        <img src="/img/welcome.svg">
      </section>

      <section>
        <div class="flex flex-row items-center justify-between pb-4">
          <h3 class="text-xl">پت های من</h3>
          <button @click="router.push('/pet/create/step-1')" class="p-1 bg-red-500 rounded-full shadow-lg shadow-red-300">
            <Icon-plus class="text-white" />
          </button>
        </div>
        
        <ul class="flex flex-row items-center justify-start pb-4 overflow-x-scroll whitespace-nowrap flex-nowrap hide-scroll-bar">
          <li class="flex-none p-2 bg-white rounded-xl">
            <a class="flex flex-col justify-center" href="">
              <img src="https://placehold.co/150x150" class="rounded-xl">
              
              <div class="flex flex-row items-center justify-between mt-2">
                <h4 class="text-lg font-semibold">رکسی</h4>
                <span class="bg-red-200 rounded-full px-0.5">
                  <Icon-gender-male class="w-5 text-red-500" />
                </span>
              </div>
              <span class="text-xs text-gray-400">2 سال و 3 ماه</span>
            </a>
          </li>
          
          <li class="flex-none p-2 mr-4 bg-white rounded-xl">
            <a class="flex flex-col justify-center" href="">
              <img src="https://placehold.co/150x150" class="rounded-xl">
              <div class="flex flex-row items-center justify-between mt-2">
                <h4 class="text-lg font-semibold">رکسی</h4>
                <span class="bg-red-200 rounded-full px-0.5">
                  <Icon-gender-female class="w-5 text-red-500" />
                </span>
              </div>
              <span class="text-xs text-gray-400">2 سال و 3 ماه</span>
            </a>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>