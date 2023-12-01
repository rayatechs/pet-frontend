<script setup lang="ts">
import { computed, type ComputedRef, onMounted, ref, type Ref } from 'vue'
import { usePetStore, type Pet } from '@/stores/pet'
import { useAlarmStore, type Alarm } from '@/stores/alarm'
import { useBreedStore } from '@/stores/breed'
import { useEventStore } from '@/stores/event'
import { useRoute } from 'vue-router'
import { LocalNotifications } from '@capacitor/local-notifications'
import {
  IconGenderFemale,
  IconGenderMale,
  IconPencil,
  IconPlus,
  IconDogBowl,
  IconClock,
  IconCalendarCog
} from '@tabler/icons-vue'
import BackButton from '@/components/BackButton.vue'
import BaseImageUploader from '@/components/form/BaseImageUploader.vue'
import BottomSheet from '@/components/BottomSheet.vue'
import BaseInput from '@/components/form/BaseInput.vue'
import BaseDatePicker from '@/components/form/BaseDatePicker.vue'
import BaseSelect from '@/components/form/BaseSelect.vue'
import BaseRadio from '@/components/form/BaseRadio.vue'

const route = useRoute()
const pet = usePetStore()
const alarm = useAlarmStore()
const breed = useBreedStore()
const event = useEventStore()

const petData: Ref<Pet> = ref({
  id: Number(route.path.slice(-1)),
  name: '',
  sex: '',
  birthdate: '',
  created_at: '',
  breed: {
    id: 0,
    parent_name: '',
    name: ''
  },
  avatar: ''
})

onMounted(() => {
  breed.getAll()
  alarm.getAll()
  event.getAll()

  pet.get(Number(route.params.id))
    .then((res) => {
      petData.value = res.data.data

      pet.form.id = petData.value.id
      pet.form.breed_id = petData.value.breed.id
      pet.form.name = petData.value.name
      pet.form.sex = petData.value.sex
      pet.form.birthdate = new Date(petData.value.birthdate).toLocaleDateString('fa-IR').replace(/\//g, "-")
    })
})

const breedOptions: ComputedRef = computed(() => {
  const dogs: Array<{ key: number; value: string }> = breed.dogs.map((breed) => {
    return { key: breed.id, value: breed.name }
  })

  const cats: Array<{ key: number; value: string }> = breed.cats.map((breed) => {
    return { key: breed.id, value: breed.name }
  })

  return [...dogs, ...cats]
})

const sexOptions = ref([
  { key: 'male', value: 'نر' },
  { key: 'female', value: 'ماده' }
])

const eventOptions = computed(() => {
  const events = event.all.map((e) => {
    return {key: e.id, value: e.name}
  })

  return [...events, {key: 0, value: 'سایر'}]
})

function loadAlarmSetting(id: number) {
  alarm.get(id)
    .then((res) => {
      const alarmData: Alarm = res.data.data

      alarm.form.event_id = alarmData.id
      alarm.form.due = alarmData.due.toString().replace(/\//g, "-")
      alarm.form.name = alarmData.name
    })
}

function storeAlarm(close: Function) {
  alarm.store()
    .then(async (res) => {
        await LocalNotifications.schedule({
          notifications: [
            {
              id: res.data.data.id,
              title: res.data.data.name,
              body: res.data.data.name
            }
          ]
        })

        alarm.resetForm()
        alarm.getAll()
        close()
    })
}

function updateAlarm(id: number, close: Function) {
  alarm.update(id)
    .then(async (res) => {
        await LocalNotifications.cancel({
          notifications: [
            { id: res.data.data.id }
          ]
        })
        
        await LocalNotifications.schedule({
          notifications: [
            {
              id: res.data.data.id,
              title: res.data.data.name,
              body: res.data.data.name
            }
          ]
        })

        alarm.resetForm()
        alarm.getAll()
        close()
    })
}
</script>

<template>
  <div class="relative flex flex-col items-center h-full overflow-hidden">
    <header
      class="flex flex-col items-center justify-center bg-gradient-to-t from-primary to-red-400 rounded-bl-[50%] rounded-br-[120%] w-full"
    >
      <div class="flex flex-row items-center justify-between w-full p-4">
        <back-button @onBack="pet.resetForm" />

        <bottom-sheet>
          <template #trigger="{ open }">
            <button @click="open" class="mx-1 text-white border border-white rounded-full">
              <Icon-pencil class="w-8 h-8 p-1" />
            </button>
          </template>

          <template #header>
            <h3 class="text-xl">اطلاعات {{ petData.name }}</h3>
          </template>

          <template #body>
            <div class="grid grid-cols-2 gap-4">
              <base-input v-model="pet.form.name" name="name" title="اسم" type="text" />
              <base-date-picker
                v-model="pet.form.birthdate"
                name="birthdate"
                title="تاریخ تولد"
                type="date"
              />
              <base-select
                v-model="pet.form.breed_id"
                :options="breedOptions"
                name="breed"
                title="نژاد"
              />
              <base-radio v-model="pet.form.sex" :options="sexOptions" name="sex" title="جنسیت" />
            </div>
          </template>

          <template #footer>
            <div class="flex flex-row items-center">
              <button
                class="flex-1 px-4 py-2 ml-1 text-center text-white rounded-lg bg-primary hover:bg-red-700"
              >
                بروزرسانی
              </button>
            </div>
          </template>
        </bottom-sheet>
      </div>

      <div class="flex flex-row items-center justify-center w-full p-4">
        <base-image-uploader :image="petData.avatar" />

        <div class="flex flex-col items-start justify-center mb-6 mr-6">
          <h2 class="text-2xl font-bold text-white">{{ petData.name }}</h2>

          <span class="px-4 py-1 my-2 text-xs text-white border border-white rounded-full">
            {{ new Date(petData.birthdate).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </span>

          <span class="text-white">
            {{ petData.breed.name }}
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

          <bottom-sheet @onClose="alarm.resetForm" @onOpen="event.getAll">
            <template #trigger="{ open }">
              <button @click="open" class="p-1 rounded-full bg-primary">
                <Icon-plus class="text-white" />
              </button>
            </template>

            <template #header>
              <h3 class="text-xl">تنظیمات یادآور</h3>
            </template>

            <template #body>
              <base-input v-model="alarm.form.name" name="name" title="نام" type="text" />
              <base-select v-model="alarm.form.event_id" :options="eventOptions" name="event" title="نوع رویداد" />
              <base-date-picker
                v-model="alarm.form.due"
                name="due"
                title="زمان سر رسید"
                type="datetime"
              />
            </template>

            <template #footer="{ close }">
              <div class="flex flex-row items-center">
                <button
                  @click="() => storeAlarm(close)"
                  class="flex-1 px-4 py-2 ml-1 text-center text-white rounded-lg bg-primary hover:bg-red-700"
                >
                  ذخیره
                </button>
              </div>
            </template>
          </bottom-sheet>
        </div>

        <div
          v-if="alarm.all.length > 0" 
          class="flex flex-col items-center justify-center w-full mt-2"
        >
          <article v-for="al, idx in alarm.all" :key="idx" class="flex flex-row items-center w-full p-2 mb-2 bg-white rounded-xl">
            <span class="p-4 bg-red-100 rounded-lg">
                <icon-dog-bowl class="w-10 h-10 text-red-900" />
            </span>

            <div class="flex flex-col items-start justify-center mr-4">
                <h3 class="text-lg">{{ al.name }}</h3>

                <div class="flex flex-row items-center mt-1 text-sm">
                <icon-clock class="w-5 h-5 text-red-900" />
                <span class="font-bold">{{ alarm.getPersianDue(new Date(al.due)) }}</span>
                </div>
            </div>

            <bottom-sheet @onClose="alarm.resetForm" @onOpen="() => loadAlarmSetting(al.id)">
              <template #trigger="{ open }">
                <button
                    @click="open"
                    class="p-2 ml-4 mr-auto transition-all bg-white border text-primary border-primary rounded-xl hover:bg-primary hover:text-white"
                >
                    <icon-calendar-cog />
                </button>
              </template>

              <template #header>
                <h3 class="text-xl">تنظیمات یادآور</h3>
              </template>

              <template #body>
                <base-input v-model="alarm.form.name" name="name" title="نام" type="text" />
                <base-select v-model="alarm.form.event_id" :options="eventOptions" name="event" title="نوع رویداد" />
                <base-date-picker
                    v-model="alarm.form.due"
                    name="due"
                    title="زمان سر رسید"
                    type="datetime"
                />
              </template>

              <template #footer="{ close }">
                <div class="flex flex-row items-center">
                    <button
                    @click="() => updateAlarm(al.id, close)"
                    class="flex-1 px-4 py-2 ml-1 text-center text-white rounded-lg bg-primary hover:bg-red-700"
                    >
                    بروزرسانی
                    </button>
                </div>
              </template>
            </bottom-sheet>
          </article>
        </div>

        <h4
          v-else
          class="absolute text-center text-gray-400 left-1/3 top-1/2 right-1/3 bottom-1/2"
        >
          هیچ یادآوری ندارید!
        </h4>
      </section>
    </main>
  </div>
</template>
