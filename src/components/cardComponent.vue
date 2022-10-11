<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  currentLord: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  words: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="p-4 lg:w-1/3 md:w-full cursor-pointer">
    <div
      class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col hover:bg-slate-100"
    >
      <div class="flex-grow">
        <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
          {{ name }}
        </h2>
        <dl>
          <div class="flex gap-2">
            <dt class="font-bold">Lord:</dt>
            <dd>{{ currentLord }}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="font-bold">Region:</dt>
            <dd>{{ region }}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="font-bold">Words:</dt>
            <dd>{{ words || '-' }}</dd>
          </div>
        </dl>

        <a
          class="inline-flex justify-center mt-3 text-red-800 items-center cursor-pointer group"
        >
          <span class="group-hover:mr-1 transition-all ease-out"
            >More About</span
          >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
