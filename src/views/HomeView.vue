<script setup lang="ts">
import { IconPlus, IconGenderFemale, IconGenderMale } from '@tabler/icons-vue'
import { onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { usePetStore } from '@/stores/pet'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const pet = usePetStore()
const user = useUserStore()

onMounted(() => {
  pet.getAll()
  user.show()
})
</script>

<template>
  <main class="px-4 mt-2 mb-20 space-y-10">
    <section>
      <h2 class="text-2xl text-brownie">
        سلام <span class="font-bold text-primary">{{ user.data.name }}</span>
      </h2>
      <p class="mt-2 text-sm text-gray-500">اینجا بهت کمک می کنیم بهتر به حیوون های خونگیت برسی!</p>
    </section>

    <section class="p-10 bg-primary rounded-xl">
      <img src="/img/welcome.svg" />
    </section>

    <section>
      <div class="flex flex-row items-center justify-between pb-4">
        <h3 class="text-xl text-brownie">پت های من</h3>
        <button @click="router.push('/pet/create/step-1')" class="p-1 rounded-full bg-primary">
          <Icon-plus class="text-white" />
        </button>
      </div>

      <ul
        class="flex flex-row items-center justify-start pb-4 overflow-x-scroll whitespace-nowrap flex-nowrap hide-scroll-bar"
      >
        <li
          v-for="(p, idx) in pet.all"
          :key="idx"
          class="flex-none p-2 mx-1 bg-milk-100 rounded-2xl"
        >
          <router-link :to="`/pet/show/${p.id}`" class="flex flex-col justify-center">
            <img :src="p.avatar ?? '/img/placeholder.jpg'" class="rounded-xl" />

            <div class="flex flex-row items-center justify-between mt-2">
              <h4 class="text-lg font-semibold">{{ p.name }}</h4>
              <span class="bg-red-200 rounded-full px-0.5">
                <Icon-gender-male v-if="p.sex == 'male'" class="w-5 text-primary" />
                <Icon-gender-female v-else class="w-5 text-primary" />
              </span>
            </div>
            <span class="text-xs text-gray-400">{{ pet.getPersianBirthdate(p.birthdate) }}</span>
          </router-link>
        </li>
      </ul>
    </section>
  </main>
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
