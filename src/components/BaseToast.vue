<script setup lang="ts">
import { IconX, IconAlertTriangleFilled, IconDiscountCheckFilled, IconAlertOctagonFilled } from '@tabler/icons-vue'
import { useToasterStore } from '@/stores/toaster'

const toaster = useToasterStore()
</script>

<template>
    <TransitionGroup name="toasts" tag="div">
        <div 
            v-for="toast, idx in toaster.toasts" 
            :key="idx" 
            class="absolute left-0 right-0 z-50 flex flex-row items-center justify-center w-2/3 max-w-lg p-4 mx-auto bg-white rounded-lg shadow-lg top-10">

            <icon-alert-triangle-filled v-if="toast.type == 'warning'" class="w-5 h-5 ml-2 text-orange-500" />
            <icon-discount-check-filled v-else-if="toast.type == 'success'" class="w-5 h-5 ml-2 text-emerald-500" />
            <icon-alert-octagon-filled v-else class="w-5 h-5 ml-2 text-red-500" />

            <p class="text-sm">{{ toast.message }}</p>
            <button @click="() => toaster.drop(toast.id)" class="mr-auto">
                <icon-x />
            </button>
        </div>
    </TransitionGroup>
</template>

<style scoped>
.toasts-enter-active,
.toasts-leave-active {
  transition: all 0.5s ease;
}
.toasts-enter-from,
.toasts-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>