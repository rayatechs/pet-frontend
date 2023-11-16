<script setup lang="ts">
import { IconChevronLeft } from '@tabler/icons-vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['onBack'])
const router = useRouter()

function back() {
    router.push('/'); 
    emit('onBack')
}
</script>

<template>
    <button @click="back" class="absolute text-white top-4 left-[20%] rounded-full border border-white z-10">
        <Icon-chevron-left class="w-8 h-8 pr-0.5" />
    </button>
</template>