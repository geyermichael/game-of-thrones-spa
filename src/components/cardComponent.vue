<script setup lang="ts">
import CaretRight from './Icons/caretRight.vue';
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
  <div class="p-4 cursor-pointer h-full">
    <div
      class="flex flex-col h-full p-8 border-2 rounded-lg border-gray-200 hover:bg-slate-100"
    >
      <div>
        <h2 class="text-lg font-extrabold mb-3">
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
          class="inline-flex justify-center items-center mt-3 text-red-800 cursor-pointer group"
        >
          <span class="group-hover:mr-1 transition-all ease-out"
            >More About</span
          >
          <CaretRight class="w-5 h-5" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
