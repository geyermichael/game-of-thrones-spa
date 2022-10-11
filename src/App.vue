<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <main class="container mx-auto py-12 px-4">
    <RouterView />
  </main>
  <footer></footer>
</template>
