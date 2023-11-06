import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/auth'

export function setupInterceptors() {
    // Add a request interceptor
    axios.interceptors.request.use((config: any) => {
        const { token } = useAuthStore()
        const specificString = 'login'
        // Do something before request is sent
        // config.withCredentials = true
        if (!config.url.includes(specificString)) {
            config.headers.Authorization = `Bearer ${token.value}`
        }

        return config
    }, (error: any) => {
        // Do something with request error
        Promise.reject(error)
    })

    // Add a response interceptor
    axios.interceptors.response.use((response: any) => response, (error: any) => Promise.reject(error.response))
}

export default axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
})