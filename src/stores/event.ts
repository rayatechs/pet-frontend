import axios from '@/axios'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export interface Event {
  id: number
  name: string
}

export const useEventStore = defineStore('event', () => {
  const all: Ref<Event[]> = ref([])

  function getAll() {
    return axios.get('/api/event').then((res) => (all.value = res.data.data))
  }

  return { all, getAll }
})
