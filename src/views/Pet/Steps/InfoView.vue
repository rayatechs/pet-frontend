<script setup lang="ts">
import { usePetStore } from '@/stores/pet'
import { useBreedStore } from '@/stores/breed'
import BaseInput from '@/components/form/BaseInput.vue'
import BaseDatePicker from '@/components/form/BaseDatePicker.vue'
import BaseSelect from '@/components/form/BaseSelect.vue'
import { computed, type ComputedRef, onMounted } from 'vue'

const pet = usePetStore()
const breed = useBreedStore()

onMounted(() => {
  breed.getAll()
})

const options: ComputedRef = computed(() => {
  if (pet.type == 'dog') {
    return breed.dogs.map((breed) => {
      return { key: breed.id, value: breed.name }
    })
  } else {
    return breed.cats.map((breed) => {
      return { key: breed.id, value: breed.name }
    })
  }
})
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div class="flex flex-col items-center justify-between w-full mt-4">
      <base-input v-model="pet.form.name" name="name" title="اسم" type="text" />
      <base-date-picker
        v-model="pet.form.birthdate"
        name="birthdate"
        title="تاریخ تولد"
        type="date"
      />
      <base-select v-model="pet.form.breed_id" :options="options" name="breed" title="نژاد" />
    </div>
  </div>
</template>
