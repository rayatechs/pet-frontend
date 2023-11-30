import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useValidationStore } from '@/stores/validation'
import { useToasterStore } from '@/stores/toaster'

const instance = axios.create({
  baseURL: 'https://ropet.ir',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
})

export function setupInterceptors() {
  const toaster = useToasterStore()
  // Add a request interceptor
  instance.interceptors.request.use(
    (config: any) => {
      const { token } = useAuthStore()
      const specificString = 'login'
      // Do something before request is sent
      // config.withCredentials = true
      if (!config.url.includes(specificString)) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error: any) => {
      toaster.show('لطفا اینترنت خود را بررسی کنید!', 'warning')
      // Do something with request error
      Promise.reject(error)
    }
  )

  // Add a response interceptor
  instance.interceptors.response.use(
    (response: any) => {
      return response
    },
    (error: any) => {
      if (error.response?.status == 422) {
        const validation = useValidationStore()
        validation.errors = error.response.data.errors
        toaster.show('لطفا تمامی فیلد ها را پر کنید!', 'warning')
      } else if (error.response?.status == 500) {
        toaster.show('مشکلی پیش آمده! مجددا تلاش کنید.', 'error')
      }

      return Promise.reject(error.response)
    }
  )
}

export default instance
