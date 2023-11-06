<script setup lang="ts">
import TheInput from '@/components/form/TheInput.vue';
</script>

<template>
    <div class="bg-gray-100 h-full flex flex-col items-center overflow-hidden">
        <header class="h-1/3 flex flex-col bg-gradient-to-t from-red-500 to-red-400 rounded-b-full w-[150%] text-center">
            <h1 class="mt-36 font-semibold text-2xl text-white">ورود به حساب کاربری</h1>
        </header>

        <main class="flex flex-col items-center justify-center mt-10 w-full space-y-4 px-20">
            <the-input title="شماره تلفن همراه" type="text" placeholder="09123456789" />
            <the-input title="رمز عبور" type="password" placeholder="*********" />
            <button class="bg-red-500 rounded-full text-white w-full py-2 hover:bg-red-700">ورود</button>
        </main>
    </div>
</template>
