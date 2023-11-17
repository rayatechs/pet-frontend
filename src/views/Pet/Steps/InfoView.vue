<script setup lang="ts">
import { usePetStore } from '@/stores/pet';
import BaseInput from '@/components/form/BaseInput.vue';
import BaseImageUploader from '@/components/form/BaseImageUploader.vue'

const pet = usePetStore()
</script>

<template>
    <div class="flex flex-col items-center w-full">
        <base-image-uploader class="-mt-10" />

        <div class="flex flex-col items-center justify-between w-full mt-10">
            <base-input v-model="pet.form.name" name="name" title="اسم" type="text" />
            <base-input v-model="pet.form.breed" name="breed" title="نژاد" type="text" />
            <base-input v-model="pet.form.birthdate" name="birthdate" title="تاریخ تولد" type="date" />
        </div>
    </div>
</template>