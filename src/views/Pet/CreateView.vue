<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePetStore } from '@/stores/pet'
import { useRouter } from 'vue-router'
import { IconArrowRight, IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-vue'
import BackHome from '@/components/BackHome.vue'

const router = useRouter()
const pet = usePetStore()

const firstStepValidation = computed(() => pet.form.type != '')
const SecondStepValidation = computed(() => pet.form.sex != '')
const ThirdStepValidation = computed(() => pet.form.type != '')

const currentStep = ref(1)
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
    },
])


function nextStep() {
    currentStep.value += 1
    router.replace(`step-${currentStep.value}`)
}

function previousStep() {
    currentStep.value -= 1
    router.replace(`step-${currentStep.value}`)
}
</script>

<template>
    <div class="relative flex flex-col items-center h-full overflow-hidden">
        <header class="flex flex-col items-center justify-center bg-gradient-to-t from-red-500 to-red-400 rounded-b-[150%] w-[150%] text-center relative overflow-hidden">
            <back-home @onBack="pet.resetForm" />
            
            <div class="my-20">
                <h1 class="text-2xl text-white">{{ steps[currentStep-1].title }}</h1>
                <span class="inline-block px-4 py-1 mt-2 text-xs text-white bg-red-300 rounded-full bg-opacity-60">
                    {{ currentStep }} از {{ steps.length }}
                </span>
            </div>
            
            <div class="absolute bg-red-300 rounded-full -top-5 left-20 w-60 h-60 opacity-20"></div>
            <div class="absolute w-40 h-40 bg-red-300 rounded-full -top-5 right-20 opacity-20"></div>
        </header>

        <main class="flex flex-col items-center justify-center w-full px-20">
            <router-view></router-view>
        </main>

        <footer class="absolute flex flex-row items-center justify-between w-full px-10 bottom-10">
            <button
                v-if="steps.length != currentStep"
                @click="nextStep" 
                :disabled="!steps[currentStep-1].is_valid"
                :class="[!steps[currentStep-1].is_valid ? 'bg-gray-500' : '']"
                class="flex flex-row items-center justify-between py-2 pl-5 pr-3 text-sm text-white bg-red-500 rounded-full">
                <icon-arrow-right />
                بعدی
            </button>
            
            <button
                v-if="steps.length == currentStep"
                :disabled="pet.form.sex == ''" 
                :class="[!steps[currentStep-1].is_valid ? 'bg-gray-500' : '']"
                class="flex flex-row items-center justify-between px-4 py-2 text-sm text-white bg-red-500 rounded-full">
                <icon-device-floppy class="ml-1" />
                ذخیره
            </button>
            
            <button
                v-if="currentStep != 1"
                @click="previousStep" 
                class="flex flex-row items-center justify-between py-2 pl-3 pr-5 text-sm text-white bg-red-500 rounded-full">
                قبلی
                <icon-arrow-left />
            </button>
        </footer>
    </div>
</template>