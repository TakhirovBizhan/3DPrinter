<script setup lang="ts">

import TheFooter from './components/Organisms/TheFooter.vue';
import TheHeader from './components/Organisms/TheHeader.vue';

</script>

<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<style>

a {
  text-decoration:none;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

</style>
