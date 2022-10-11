<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import House from './types/IHouse';
import { useFetchData } from './composables/useFetchData';
import { useGetHouses } from './composables/useGetHouses';
import CardComponent from './components/cardComponent.vue';
import SpinnerComponent from './components/spinnerComponent.vue';

const GoTHouses: Ref<House[]> = ref([]);
const pending = ref(false);
const isLoadingMore = ref(false);
const error = ref(false);

onMounted(async () => {
  try {
    pending.value = true;
    GoTHouses.value = await useGetHouses();
    await setNameOfCurrentLords(GoTHouses.value);
    pending.value = false;
  } catch (e) {
    error.value = true;
  }
});

/**
 * Set the name of current lords in a given array of houses.
 * @param houses
 */
const setNameOfCurrentLords = async (houses: House[]): Promise<void> => {
  try {
    for (let house of houses) {
      if (!house.currentLord) continue; // continue if currentLord is empty
      const { name } = await useFetchData(house.currentLord);
      house.currentLord = name;
    }
  } catch (err) {
    error.value = true;
    if (import.meta.env.MODE === 'development') {
      console.error(err);
    }
  }
};

/**
 * Get more houses from the api by next page
 */
let currentPage = 1;
const loadMoreHouses = async () => {
  isLoadingMore.value = true;
  const moreHouses = await useGetHouses(currentPage);
  currentPage++;
  await setNameOfCurrentLords(moreHouses);
  GoTHouses.value = GoTHouses.value.concat(moreHouses);
  isLoadingMore.value = false;
};
</script>

<template>
  <header></header>
  <main class="container mx-auto p-5">
    <h1 class="text-3xl text-center">Game of Thrones - Houses</h1>
    <section class="text-gray-600 body-font">
      <div class="py-24 mx-auto flex flex-wrap">
        <SpinnerComponent v-if="pending" class="block mx-auto" />
        <div v-if="!pending" class="flex flex-wrap -m-4">
          <CardComponent
            v-for="house in GoTHouses"
            :name="house.name"
            :current-lord="house.currentLord"
            :region="house.region"
            :words="house.words"
          />
          <button
            @click="loadMoreHouses"
            class="flex justify-center items-center gap-2 mx-auto mt-16 text-white bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
          >
            <SpinnerComponent
              v-if="isLoadingMore"
              class="!text-white !h-5 !w-5"
            />
            <span>Load More</span>
          </button>
        </div>
      </div>
    </section>
  </main>
  <footer></footer>
</template>
