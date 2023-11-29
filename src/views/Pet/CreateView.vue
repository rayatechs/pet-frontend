<script setup lang="ts">
import { computed, ref, type ComputedRef } from 'vue'
import { usePetStore } from '@/stores/pet'
import { useToasterStore } from '@/stores/toaster'
import { useRouter, useRoute } from 'vue-router'
import { IconArrowRight, IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-vue'
import BackButton from '@/components/BackButton.vue'

const router = useRouter()
const route = useRoute()
const pet = usePetStore()
const toaster = useToasterStore()

const firstStepValidation = computed(() => pet.type != '')
const SecondStepValidation = computed(() => pet.form.sex != '')
const ThirdStepValidation = computed(
  () => pet.form.name != '' && pet.form.breed_id != 0 && pet.form.birthdate != ''
)

const currentStep: ComputedRef<number> = computed(() => Number(route.path.slice(-1)))
const steps = ref([
  {
    title: 'نوع حیوان خانگی',
    is_valid: firstStepValidation
  },
  {
    title: 'جنسیت حیوان خانگی',
    is_valid: SecondStepValidation
  },
  {
    title: 'اطلاعات حیوان خانگی',
    is_valid: ThirdStepValidation
  }
])

function nextStep() {
  router.replace(`step-${currentStep.value + 1}`)
}

function previousStep() {
  router.replace(`step-${currentStep.value - 1}`)
}

function send() {
  pet.store().then((res) => {
    toaster.show('اطلاعات با موفقیت ذخیره شد.', 'success')
    router.push({ name: 'pet.show', params: { id: res.data.data.id } })
    pet.resetForm()
  })
}
</script>

<template>
  <div class="relative flex flex-col items-center h-full overflow-x-scroll">
    <header
      class="flex flex-col items-center justify-center bg-gradient-to-t from-primary to-red-400 rounded-b-[60%] w-full text-center"
    >
      <div class="flex flex-row items-center justify-start w-full p-4">
        <back-button @onBack="pet.resetForm" />
      </div>

      <div class="mb-20">
        <h1 class="text-2xl text-white">{{ steps[currentStep - 1].title }}</h1>
        <span
          class="inline-block px-4 py-1 mt-2 text-xs text-white bg-red-300 rounded-full bg-opacity-60"
        >
          {{ currentStep }} از {{ steps.length }}
        </span>
      </div>
    </header>

    <main class="flex flex-col items-center justify-center w-full px-20">
      <router-view></router-view>
    </main>

    <footer class="flex flex-row items-center justify-between w-full p-10 mt-auto">
      <button
        v-if="currentStep != 1"
        @click="previousStep"
        class="flex flex-row items-center justify-between py-2 pl-5 pr-3 text-sm border-2 rounded-full text-primary border-primary"
      >
        <icon-arrow-right />
        قبلی
      </button>

      <button
        v-if="steps.length == currentStep"
        @click="send"
        :disabled="!steps[currentStep - 1].is_valid"
        :class="[!steps[currentStep - 1].is_valid ? 'bg-gray-500' : 'bg-primary']"
        class="flex flex-row items-center justify-between px-4 py-2 text-sm text-white rounded-full"
      >
        <icon-device-floppy class="ml-1" />
        ذخیره
      </button>

      <button
        v-if="steps.length != currentStep"
        @click="nextStep"
        :disabled="!steps[currentStep - 1].is_valid"
        :class="[!steps[currentStep - 1].is_valid ? 'bg-gray-500' : 'bg-primary']"
        class="flex flex-row items-center justify-between py-2 pl-3 pr-5 mr-auto text-sm text-white rounded-full"
      >
        بعدی
        <icon-arrow-left />
      </button>
    </footer>
  </div>
</template>
