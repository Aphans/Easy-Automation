<template>
  <main>
    {{ id }}
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
const id = route.params.id;
</script>