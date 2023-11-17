<script setup lang="ts">
import { IconChevronLeft } from '@tabler/icons-vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['onBack'])

const router = useRouter()

function back() {
    emit('onBack')
    router.push('/'); 
}
</script>

<template>
    <button @click="back" class="mx-1 text-white border border-white rounded-full">
        <Icon-chevron-left class="w-8 h-8 p-1" />
    </button>
</template>