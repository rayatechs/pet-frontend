<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'
import { ref } from 'vue'

const emit = defineEmits(['onOpen', 'onClose'])

const visibility = ref(false)

function open() {
  visibility.value = true

  emit('onOpen')
}

function close() {
  visibility.value = false

  emit('onClose')
}
</script>

<template>
  <slot name="trigger" :open="open" />

  <Teleport to="#layout">
    <Transition name="slide-fade">
      <div
        v-if="visibility"
        class="absolute bottom-0 z-50 flex flex-col items-center justify-center w-full max-w-lg mt-auto bg-white rounded-t-3xl"
      >
        <header class="flex flex-row items-center justify-between w-full p-4">
          <slot name="header" />

          <button @click="close">
            <icon-x />
          </button>
        </header>

        <main class="w-full p-4">
          <slot name="body" />
        </main>

        <footer class="w-full p-4">
          <slot name="footer" :close="close" />
        </footer>
      </div>
    </Transition>

    <div
      @click="close"
      v-if="visibility"
      class="absolute top-0 bottom-0 left-0 right-0 z-40 w-full h-full bg-black bg-opacity-25"
    ></div>
  </Teleport>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100%);
}
</style>
