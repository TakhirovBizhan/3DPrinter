<script setup lang="ts">

import TheFooter from './components/TheFooter.vue';
import TheHeader from './components/TheHeader.vue';

</script>

<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<style>
ul,
li {
  margin: 0;
  list-style-type: none;
}

a {
  text-decoration: none;
}

body {
  background-color: rgb(43, 43, 43);
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}
</style>
