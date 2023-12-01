import { defineStore } from 'pinia'
import { reactive, ref, type Ref } from 'vue'
import axios from '@/axios'
import { type User } from './user'

export interface Alarm {
  id: number
  event: string
  user: User
  name: string
  due: Date
  created_at : Date
}

export interface Form {
  id: number
  event_id: number
  name: string
  due: string
}

export const useAlarmStore = defineStore('alarm', () => {
  const all: Ref<Form[]> = ref([])
  const initial: Form = {
    id: 0,
    event_id: 0,
    name: '',
    due: ''
  }
  const form: Form = reactive({ ...initial })

  function resetForm() {
    Object.assign(form, initial)
  }

  function getAll() {
    return axios.get('/api/alarm').then((res) => all.value = res.data.data)
  }

  function get(id: number) {
    return axios.get(`/api/alarm/${id}`)
  }

  function store() {
    return axios.post('/api/alarm', form)
  }

  function update(id: number) {
    return axios.put(`/api/alarm/${id}`, form)
  }

  function getPersianDue(date: Date) {
    return new Date(date).toLocaleDateString('fa-IR', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return { all, form, resetForm, getAll, get, store, update, getPersianDue }
})
