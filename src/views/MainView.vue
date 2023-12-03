<script setup lang="ts">
import { IconMenu, IconPaw, IconBooks, IconClipboard } from '@tabler/icons-vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col h-full min-h-0">
    <header class="flex flex-row items-center justify-between w-full max-w-lg p-4">
      <button class="text-sm">
        <icon-menu />
      </button>

      <div class="flex flex-row items-center justify-start">
        <h2 class="text-xl font-bold text-brownie">روپت</h2>
        <img src="/logo.png" class="h-10 ml-2" />
      </div>
    </header>

    <router-view v-slot="{ Component }" class="flex-grow min-h-0 overflow-y-scroll">
      <transition name="slide">
        <component :is="Component" />
      </transition>
    </router-view>

    <div class="absolute left-0 right-0 z-50 mx-auto w-fit bottom-4">
      <div class="flex items-center justify-between h-16 px-2 shadow rounded-2xl bg-milk-100">
        <router-link
          to="/home"
          class="flex flex-col items-center justify-center px-5 text-gray-400"
          active-class="text-primary"
        >
          <icon-paw />
          <span class="text-sm">خانه</span>
        </router-link>

        <router-link
          to="/tutorial"
          class="flex flex-col items-center justify-center px-5 text-gray-400"
          active-class="text-primary"
        >
          <icon-books />
          <span class="text-sm">آموزش</span>
        </router-link>

        <router-link
          to="/ad"
          class="flex flex-col items-center justify-center px-5 text-gray-400"
          active-class="text-primary"
        >
          <icon-clipboard />
          <span class="text-sm">آگهی</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  /* opacity: 0; */
}
</style>
