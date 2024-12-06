<script setup lang="ts">
import CoilList from '@/components/PlasticComponents/CoilList.vue';
import PrinterList from '@/components/PrintersComponents/PrinterList.vue';
import ModelList from '@/components/FigureComponents/FigureList.vue';
</script>

<template>
  <main>
      <PrinterList />
        <CoilList />
        <ModelList />
  </main>
</template>

<style>

main {
  min-height: 81.5vh;
  max-width: 1440px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  gap: 50px;
}


body {
  background-color: rgb(43, 43, 43);
}


</style>
