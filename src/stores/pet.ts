import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface PetForm {
    name: string,
    image: File,
    birthdate: string,
    sex: string,
    breed: string,
    type: string,
}

export const usePetStore = defineStore('pet', () => {
  const initial: PetForm = {
    name: '',
    image: new File([""], ""),
    birthdate: '',
    sex: '',
    breed: '',
    type: '',
  }

  const form: PetForm = reactive({...initial})

  function resetForm() {
    Object.assign(form, initial)
  }

  return { form, resetForm }
})
