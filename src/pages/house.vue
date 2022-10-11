<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useFetchData } from '../composables/useFetchData';
import House from '../types/IHouse';
import SpinnerComponent from '../components/spinnerComponent.vue';

const route = useRoute();
const router = useRouter();
const GoTHouse: Ref<House> = ref({}) as Ref<House>;
const pending = ref(false);
const error = ref(false);
onMounted(async () => {
  try {
    pending.value = true;
    GoTHouse.value = (await useFetchData(
      `https://anapioficeandfire.com/api/houses/${route.params.id}`
    )) as House;
    console.log(GoTHouse.value);

    await setNameOfCurrentLord(GoTHouse.value);

    pending.value = false;
  } catch (e) {
    error.value = true;
  }
});

/**
 * Set the name of current lords in a given array of houses.
 * @param houses
 */
const setNameOfCurrentLord = async (house: House): Promise<void> => {
  try {
    if (!house.currentLord) return; // continue if currentLord is empty
    const { name } = await useFetchData(house.currentLord);
    house.currentLord = name;
  } catch (err) {
    error.value = true;
    if (import.meta.env.MODE === 'development') {
      console.error(err);
    }
  }
};
</script>
<template>
  <SpinnerComponent v-if="pending" />
  <button @click="router.push('/')">back</button>
  <div
    v-if="!pending"
    class="overflow-hidden bg-white shadow sm:rounded-lg max-w-3xl mx-auto"
  >
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ GoTHouse.name }}
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Detailed house information
      </p>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">Lord</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {{ GoTHouse.currentLord || '-' }}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Region</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {{ GoTHouse.region || '-' }}
          </dd>
        </div>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">Coat of Arms</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {{ GoTHouse.coatOfArms || '-' }}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Words</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {{ GoTHouse.words || '-' }}
          </dd>
        </div>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">Titles</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul>
              <li v-for="value in GoTHouse.titles">{{ value || '-' }}</li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
