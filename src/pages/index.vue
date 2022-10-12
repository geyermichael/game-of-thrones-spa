<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import House from '../types/IHouse';
import { useFetchData } from '../composables/useFetchData';
import { useGetHouses } from '../composables/useGetHouses';
import { useLogError } from '../composables/useLogError';
import CardComponent from '../components/cardComponent.vue';
import SpinnerComponent from '../components/spinnerComponent.vue';

const router = useRouter();
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
  } catch (e: any) {
    useLogError(e);
    pending.value = false;
    error.value = true;
  }
});

/**
 * Set the name of current lords in a given array of houses
 *
 * @param houses
 */
const setNameOfCurrentLords = async (houses: House[]): Promise<void> => {
  try {
    for (let house of houses) {
      if (!house.currentLord) continue; // continue if currentLord is empty
      const { name } = await useFetchData(house.currentLord);
      house.currentLord = name;
    }
  } catch (e: any) {
    error.value = true;
    useLogError(e);
  }
};

let currentPage = 1;
/**
 * Get more houses from the api by next page
 */
const loadMoreHouses = async () => {
  try {
    isLoadingMore.value = true;
    currentPage++;
    const moreHouses = await useGetHouses(currentPage);
    await setNameOfCurrentLords(moreHouses);
    GoTHouses.value = GoTHouses.value.concat(moreHouses);
    isLoadingMore.value = false;
  } catch (e: any) {
    useLogError(e);
    isLoadingMore.value = false;
    error.value = true;
  }
};

/**
 * Navigate to house/:id
 * Using the got api url to extract the id
 *
 * @param url
 */
const navigateToHouse = (url: string) => {
  const id = url.split('/').pop();
  router.push(`/house/${id}`);
};
</script>

<template>
  <section>
    <SpinnerComponent v-if="pending" class="block mx-auto" />
    <div v-if="!pending" class="grid md:grid-cols-2 xl:grid-cols-3">
      <CardComponent
        v-for="house in GoTHouses"
        tabindex="1"
        :name="house.name"
        :current-lord="house.currentLord"
        :region="house.region"
        :words="house.words"
        @click="navigateToHouse(house.url)"
        @keyup.enter="navigateToHouse(house.url)"
      />
    </div>
    <button
      v-if="!pending && !error"
      @click="loadMoreHouses"
      id="load-more-btn"
    >
      <SpinnerComponent v-if="isLoadingMore" class="text-white h-4 w-4" />
      <span>Load More</span>
    </button>
    <div v-if="error" class="text-center">Sorry, something went wrong!</div>
  </section>
</template>

<style scoped lang="postcss">
#load-more-btn {
  @apply flex items-center py-2 px-8 gap-2 mx-auto mt-12 text-white bg-red-800 border-0 hover:bg-red-700 rounded-lg;
}
</style>
