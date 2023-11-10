<script setup lang="ts">
import TheInput from '@/components/form/TheInput.vue';
import { useAuthStore, type RegisterForm } from '@/stores/auth';
import { reactive } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter()
const auth = useAuthStore()
const form: RegisterForm = reactive({
    name: '',
    email: '',
    mobile: '',
    password: ''
})

function send() {
    auth.register(form).then(() => router.push('/'))
}
</script>

<template>
    <div class="bg-gray-100 h-full flex flex-col items-center overflow-hidden">
        <header class="h-1/3 flex flex-col bg-gradient-to-t from-red-500 to-red-400 rounded-b-full w-[150%] text-center">
            <h1 class="mt-36 font-semibold text-2xl text-white">ساخت حساب کاربری</h1>
        </header>

        <main class="flex flex-col items-center justify-center mt-10 w-full px-20">
            <the-input v-model="form.name" name="name" title="نام" type="text" placeholder="علی" />
            <the-input v-model="form.email" name="email" title="پست الکترونیک" type="text" placeholder="ali@gmai.com" />
            <the-input v-model="form.mobile" name="mobile" title="شماره تلفن همراه" type="text" placeholder="09123456789" />
            <the-input v-model="form.password" name="password" title="رمز عبور" type="password" placeholder="*********" />
            <button 
                @click.prevent="send" 
                class="bg-red-500 rounded-full text-white w-full py-2 hover:bg-red-700 mt-20">
                ثبت نام
            </button>
            <p class="text-gray-400 text-sm mt-2">
                حساب کاربری دارید؟ 
                <router-link to="/login" class="text-gray-600">وارد شوید</router-link>
            </p>
        </main>
    </div>
</template>
