import axios from '@/axios'
import { defineStore } from 'pinia'
import { ref, computed, type Ref, type ComputedRef } from 'vue'

export interface Breed {
  id: number
  name: string
  created_at: string
  children: Breed[]
}

export const useBreedStore = defineStore('breed', () => {
  const all: Ref<Breed[]> = ref([])

  const dogs: ComputedRef<Breed[]> = computed(() => {
    const dogs = all.value.filter((breed: Breed) => breed.name == 'سگ')

    if (dogs.length > 0) {
      return dogs[0].children
    }

    return []
  })

  const cats: ComputedRef<Breed[]> = computed(() => {
    const cats = all.value.filter((breed: Breed) => breed.name == 'گربه')

    if (cats.length > 0) {
      return cats[0].children
    }

    return []
  })

  function getAll() {
    return axios.get('/api/breed').then((res) => (all.value = res.data.data))
  }

  return { all, dogs, cats, getAll }
})
