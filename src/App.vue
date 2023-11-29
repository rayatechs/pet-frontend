<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseToast from '@/components/BaseToast.vue'
</script>

<template>
  <div
    class="flex flex-col h-full max-w-lg min-h-screen m-auto bg-milk-200 font-vazir"
    dir="rtl"
    id="layout"
  >
    <base-toast />

    <RouterView />
  </div>
</template>

<style>
body {
  @apply bg-milk-200;
}
</style>
