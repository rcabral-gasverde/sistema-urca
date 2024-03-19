<template>
  <h2>{{ texto }}</h2>
  <v-divider class="mt-2 mb-6" :thickness="2"></v-divider>
</template>

<script setup>
const { texto } = defineProps(['texto'])
</script>

<style>

</style>