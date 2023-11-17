<script setup lang="ts">
import BaseInput from '@/components/form/BaseInput.vue';
import { useAuthStore, type LoginForm } from '@/stores/auth';
import { reactive } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter()
const auth = useAuthStore()
const form: LoginForm = reactive({
    email: '',
    password: ''
})

function send() {
    auth.login(form).then(() => router.push('/'))
}
</script>

<template>
    <div class="flex flex-col items-center h-full overflow-hidden bg-gray-100">
        <header class="h-1/3 flex flex-col justify-between items-center bg-gradient-to-t from-red-500 to-red-400 rounded-b-full w-[150%] text-center">
            <h1 class="self-center h-full text-2xl font-semibold text-white">ورود به حساب کاربری</h1>
        </header>

        <main class="flex flex-col items-center justify-center w-full px-20 mt-10">
            <base-input v-model="form.email" name="email" title="پست الکترونیک" type="text" placeholder="ali@gmai.com" />
            <base-input v-model="form.password" name="password" title="رمز عبور" type="password" placeholder="*********" />
            <button
                @click.prevent="send"
                class="w-full py-2 mt-20 text-white bg-red-500 rounded-full hover:bg-red-700">ورود</button>
            <p class="mt-2 text-sm text-gray-400">
                حساب کاربری ندارید؟ 
                <router-link to="/register" class="text-gray-600">ثبت نام کنید</router-link>
            </p>
        </main>
    </div>
</template>
