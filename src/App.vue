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


main {
  max-width: 1440px;
  margin: auto;
  margin-top: 30px;
  min-height: 80vh;
}

* {
  box-sizing: border-box;
}

</style>
