import { defineStore } from 'pinia'
import { reactive, ref, type Ref } from 'vue'
import axios from '@/axios'

export interface Pet {
  id: number
  name: string
  sex: string
  birthdate: string
  created_at: string
  breed: {
    id: number
    parent_name: string
    name: string
  }
  avatar: string
}

interface Form {
  id: number
  name: string
  birthdate: string
  sex: string
  breed_id: number
}

export const usePetStore = defineStore('pet', () => {
  const all: Ref<Pet[]> = ref([])
  const type = ref('')
  const initial: Form = {
    id: 0,
    name: '',
    birthdate: '',
    sex: '',
    breed_id: 0
  }
  const form: Form = reactive({ ...initial })

  function resetForm() {
    Object.assign(form, initial)
    type.value = ''
  }

  function getAll() {
    return axios.get('/api/pet').then((res) => (all.value = res.data.data))
  }

  function get(id: number) {
    return axios.get(`/api/pet/${id}`)
  }

  function store() {
    return axios.post('/api/pet', form)
  }

  function storeAvatar(petId: number, avatar: File) {
    return axios.post(`/api/pet/${petId}/upload-avatar`, { avatar }, { 
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  
  function getPersianBirthdate(date: string) {
    return new Date(date).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return { all, type, form, resetForm, getAll, get, store, storeAvatar, getPersianBirthdate }
})
