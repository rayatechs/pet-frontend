import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useValidationStore } from '@/stores/validation'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' },
})

export function setupInterceptors() {
    // Add a request interceptor
    instance.interceptors.request.use((config: any) => {
        const { token } = useAuthStore()
        const specificString = 'login'
        // Do something before request is sent
        // config.withCredentials = true
        if (!config.url.includes(specificString)) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }, (error: any) => {
        // Do something with request error
        Promise.reject(error)
    })

    // Add a response interceptor
    instance.interceptors.response.use(
        (response: any) => {
            return response
        }, 
        (error: any) => {
            if (error.response?.status == 422) {
                const validation = useValidationStore()
                validation.errors = error.response.data.errors
            }
            
            return Promise.reject(error.response)
        })
}

export default instance