<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useFetchData } from '../composables/useFetchData';
import House from '../types/IHouse';
import CaretLeft from '../components/Icons/caretLeft.vue';
import CaretRight from '../components/Icons/caretRight.vue';
import SpinnerComponent from '../components/spinnerComponent.vue';

const route = useRoute();
const router = useRouter();
const GoTHouse: Ref<House> = ref({}) as Ref<House>;
const pending = ref(false);
const error = ref(false);

onMounted(async () => {
  try {
    await setGoTHouse(String(route.params.id));
  } catch (e) {
    error.value = true;
  }
});

const setGoTHouse = async (id: string) => {
  try {
    pending.value = true;
    GoTHouse.value = (await useFetchData(
      `https://anapioficeandfire.com/api/houses/${id}`
    )) as House;
    await setNameOfCurrentLord();
    pending.value = false;
  } catch (error) {}
};

/**
 * Set the name of current lords in a given array of houses.
 * @param houses
 */
const setNameOfCurrentLord = async (): Promise<void> => {
  try {
    if (!GoTHouse.value.currentLord) return; // continue if currentLord is empty
    const { name } = await useFetchData(GoTHouse.value.currentLord);
    GoTHouse.value.currentLord = name;
  } catch (err) {
    error.value = true;
    if (import.meta.env.MODE === 'development') {
      console.error(err);
    }
  }
};

const next = async () => {
  const nextId = Number(route.params.id) + 1;
  router.push(`/house/${String(nextId)}`);
  await setGoTHouse(String(nextId));
};

const previous = async () => {
  const nextId = Number(route.params.id) - 1;
  router.push(`/house/${String(nextId)}`);
  await setGoTHouse(String(nextId));
};
</script>
<template>
  <section>
    <div class="flex justify-between py-2 max-w-3xl mx-auto">
      <button
        @click="router.push('/')"
        class="py-2 px-4 border-2 rounded-lg hover:bg-slate-100 group"
      >
        <span class="text-gray-500 group-hover:text-black">Back</span>
      </button>
      <div class="flex gap-2">
        <button
          v-if="route.params.id != '1'"
          @click="previous"
          class="py-2 px-4 border-2 rounded-lg group hover:bg-slate-100"
          aria-label="previous"
        >
          <CaretLeft class="h-6 w-6 text-gray-500 group-hover:text-black" />
        </button>
        <button
          @click="next"
          class="py-2 px-4 border-2 rounded-lg group hover:bg-slate-100"
          aria-label="next"
        >
          <CaretRight class="h-6 w-6 text-gray-500 group-hover:text-black" />
        </button>
      </div>
    </div>
    <SpinnerComponent v-if="pending" class="block mx-auto" />
    <div
      v-if="!pending"
      class="max-w-3xl mx-auto rounded-lg border-2 border-gray-200"
    >
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-extrabold text-gray-900">
          {{ GoTHouse.name }}
        </h3>
        <p class="text-gray-500">Detailed information</p>
      </div>
      <div class="border-t-2 border-gray-200 rounded-b-lg">
        <dl>
          <div class="bg-gray-50 table-entry">
            <dt class="font-bold">Lord</dt>
            <dd class="mt-1 text-gray-900 sm:col-span-2">
              {{ GoTHouse.currentLord || '-' }}
            </dd>
          </div>
          <div class="bg-white table-entry">
            <dt class="font-bold">Region</dt>
            <dd class="mt-1 text-gray-900 sm:col-span-2">
              {{ GoTHouse.region || '-' }}
            </dd>
          </div>
          <div class="bg-gray-50 table-entry">
            <dt class="font-bold">Coat of Arms</dt>
            <dd class="mt-1 text-gray-900 sm:col-span-2">
              {{ GoTHouse.coatOfArms || '-' }}
            </dd>
          </div>
          <div class="bg-white table-entry">
            <dt class="font-bold">Words</dt>
            <dd class="mt-1 text-gray-900 sm:col-span-2">
              {{ GoTHouse.words || '-' }}
            </dd>
          </div>
          <div class="bg-gray-50 table-entry rounded-b-lg">
            <dt class="font-bold">Titles</dt>
            <dd class="mt-1 text-gray-900 sm:col-span-2">
              <ul>
                <li v-for="value in GoTHouse.titles">{{ value || '-' }}</li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.table-entry {
  @apply px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6;
}
</style>
