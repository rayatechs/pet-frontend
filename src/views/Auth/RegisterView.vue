<script setup lang="ts">
import BaseInput from '@/components/form/BaseInput.vue'
import { useAuthStore, type RegisterForm } from '@/stores/auth'
import { reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

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
  <div class="flex flex-col items-center h-full overflow-hidden bg-gray-100">
    <header
      class="flex flex-col items-center justify-center bg-gradient-to-t from-primary to-red-400 rounded-b-[60%] w-full text-center"
    >
      <div class="my-20">
        <h1 class="self-center h-full text-2xl font-semibold text-white">ساخت حساب کاربری</h1>
      </div>
    </header>

    <main class="flex flex-col items-center justify-center w-full px-20 py-10 overflow-x-scroll">
      <base-input v-model="form.name" name="name" title="نام" type="text" placeholder="علی" />
      <base-input
        v-model="form.email"
        name="email"
        title="پست الکترونیک"
        type="text"
        placeholder="ali@gmai.com"
      />
      <base-input
        v-model="form.mobile"
        name="mobile"
        title="شماره تلفن همراه"
        type="text"
        placeholder="09123456789"
      />
      <base-input
        v-model="form.password"
        name="password"
        title="رمز عبور"
        type="password"
        placeholder="*********"
      />
      <button
        @click.prevent="send"
        class="w-full py-2 mt-20 text-white bg-primary rounded-full hover:bg-red-700"
      >
        ثبت نام
      </button>
      <p class="mt-2 text-sm text-gray-400">
        حساب کاربری دارید؟
        <router-link to="/login" class="text-gray-600">وارد شوید</router-link>
      </p>
    </main>
  </div>
</template>
