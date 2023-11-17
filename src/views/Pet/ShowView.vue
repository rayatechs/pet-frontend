<script setup lang="ts">
import { usePetStore } from '@/stores/pet';
import { useAlarmStore } from '@/stores/alarm'
import { IconGenderFemale, IconGenderMale, IconPencil, IconPlus, IconDogBowl, IconClock, IconCalendarCog } from '@tabler/icons-vue';
import BackButton from '@/components/BackButton.vue'
import BaseImageUploader from '@/components/form/BaseImageUploader.vue'
import BottomSheet from '@/components/BottomSheet.vue'
import BaseInput from '@/components/form/BaseInput.vue';

const pet = usePetStore()
const alarm = useAlarmStore()
</script>

<template>
    <div class="relative flex flex-col items-center h-full overflow-hidden">
        <header class="flex flex-col items-center justify-center bg-gradient-to-t from-red-500 to-red-400 rounded-bl-[50%] rounded-br-[120%] w-full">
            <div class="flex flex-row items-center justify-end w-full p-4">
                <Bottom-sheet>
                    <template #trigger="{ visible }">
                        <button @click="visible" class="mx-1 text-white border border-white rounded-full">
                            <Icon-pencil class="w-8 h-8 p-1" />
                        </button>
                    </template>

                    <template #header>
                        <h3 class="text-xl">اطلاعات رکسی</h3>
                    </template>

                    <template #body>
                        <div class="grid grid-cols-2 gap-4">
                            <the-input v-model="pet.form.name" name="name" title="اسم" type="text" />
                            <the-input v-model="pet.form.breed" name="breed" title="نژاد" type="text" />
                            <the-input v-model="pet.form.birthdate" name="birthdate" title="تاریخ تولد" type="date" />
                        </div>
                    </template>

                    <template #footer>
                        <div class="flex flex-row items-center">
                            <button class="flex-1 px-4 py-2 ml-1 text-center text-white bg-red-500 rounded-lg hover:bg-red-700">
                                ذخیره
                            </button>
                        </div>
                    </template>
                </Bottom-sheet>
                
                <back-button />
            </div>
                        
            <div class="flex flex-row items-center justify-center w-full p-4">
                <base-image-uploader />

                <div class="flex flex-col items-start justify-center mb-6 mr-6">
                    <h2 class="text-2xl font-bold text-white">رکسی</h2>

                    <span class="px-4 py-1 my-2 text-xs text-white border border-white rounded-full">
                        2 ساله
                    </span>

                    <span class="text-white">
                        ژرمن شپرد
                    </span>
                </div>

                <div class="mb-10 mr-auto text-white">
                    <Icon-gender-female v-if="true" class="w-8 h-8" />
                    <Icon-gender-male v-else class="w-8 h-8" />
                </div>
            </div>
        </header>

        <main class="flex flex-col items-center justify-start w-full px-4">
            <section class="w-full mt-6">
                <div class="flex flex-row items-center justify-between pb-4">
                    <h3 class="text-xl">یادآور ها</h3>
                    
                    <Bottom-sheet>
                        <template #trigger="{ visible }">
                            <button @click="visible" class="p-1 bg-red-500 rounded-full shadow-lg shadow-red-300">
                                <Icon-plus class="text-white" />
                            </button>
                        </template>

                        <template #header>
                            <h3 class="text-xl">تنظیمات یادآور</h3>
                        </template>

                        <template #body>
                            <base-input v-model="alarm.form.name" name="name" title="نام" type="text" />
                            <base-input v-model="alarm.form.name" name="name" title="زمان سر رسید" type="date" />
                        </template>

                        <template #footer>
                            <div class="flex flex-row items-center">
                                <button class="flex-1 px-4 py-2 ml-1 text-center text-white bg-red-500 rounded-lg hover:bg-red-700">
                                    ذخیره
                                </button>
                            </div>
                        </template>
                    </Bottom-sheet>
                </div>

                <div class="flex flex-col items-center justify-center w-full mt-2">
                    <article class="flex flex-row items-center w-full p-2 bg-white rounded-xl">
                        <span class="p-4 bg-red-100 rounded-lg">
                            <icon-dog-bowl class="w-10 h-10 text-red-900" />
                        </span>
                        
                        
                        <div class="flex flex-col items-start justify-center mr-4">
                            <h3 class="text-lg">گرفتن غذای رژیمی</h3>

                            <div class="flex flex-row items-center mt-1 text-sm">
                                <icon-clock class="w-5 h-5 text-red-900" />
                                <span class="font-bold">۱۱:۳۰ صبح</span>
                            </div>
                        </div>

                        <Bottom-sheet>
                            <template #trigger="{ visible }">
                                <button @click="visible" class="p-2 ml-4 mr-auto text-red-500 transition-all bg-white border border-red-500 rounded-xl hover:bg-red-500 hover:text-white">
                                    <icon-calendar-cog />
                                </button>
                            </template>

                            <template #header>
                                <h3 class="text-xl">تنظیمات یادآور</h3>
                            </template>

                            <template #body>
                                <the-input v-model="alarm.form.name" name="name" title="نام" type="text" />
                                <the-input v-model="alarm.form.name" name="name" title="زمان سر رسید" type="date" />
                            </template>

                            <template #footer>
                                <div class="flex flex-row items-center">
                                    <button class="flex-1 px-4 py-2 ml-1 text-center text-white bg-red-500 rounded-lg hover:bg-red-700">
                                        ذخیره
                                    </button>
                                </div>
                            </template>
                        </Bottom-sheet>
                    </article>
                </div>

                <h4 v-if="false" class="absolute text-center text-gray-400 left-1/3 top-1/2 right-1/3 bottom-1/2">هیچ یادآوری ندارید!</h4>
            </section>
        </main>
    </div>
</template>