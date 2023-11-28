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
  let image: File = new File([''], '')
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
    image = new File([''], '')
  }

  function store() {
    return axios.post('/api/pet', form)
  }

  function getAll() {
    return axios.get('/api/pet').then((res) => (all.value = res.data.data))
  }

  function get(id: number) {
    return axios.get(`/api/pet/${id}`)
  }

  function storeAvatar(petId: number) {
    return axios.post(`/api/pet/${petId}/upload-avatar`, { avatar: image })
  }

  return { all, image, type, form, resetForm, store, getAll, get, storeAvatar }
})
