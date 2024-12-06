<script setup lang="ts">
import CoilList from '@/components/PlasticComponents/CoilList.vue';
import PrinterList from '@/components/PrintersComponents/PrinterList.vue';
import ModelList from '@/components/ModelsComponents/ModelList.vue';
</script>

<template>
  <main>
    <div class="wrapper">
      <PrinterList />
        <CoilList />
        <ModelList />
  </div>
  </main>
</template>

<style>

.wrapper {
  max-width: 1440px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  gap: 50px;
}

body {
  background-color: rgb(255, 255, 255);
}


</style>
