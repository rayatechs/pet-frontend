import { defineStore } from 'pinia'
import { reactive } from 'vue'

export interface AlarmForm {
    event_id: string,
    name: string,
    due: Date
}

export const useAlarmStore = defineStore('alarm', () => {
    const initial: AlarmForm = {
        event_id: '',
        name: '',
        due: new Date,
      }
    
      const form: AlarmForm = reactive({...initial})
    
      function resetForm() {
        Object.assign(form, initial)
      }
    
      return { form, resetForm }
})
