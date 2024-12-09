<script setup lang="ts">
import coilCarousel from '@/components/PlasticComponents/CoilCarousel.vue';
import PrinterCarousel from '@/components/PrintersComponents/PrinterCarousel.vue';
import ModelCarousel from '@/components/FigureComponents/FigureCarousel.vue';
</script>

<template>
  <main>
    <PrinterCarousel />
    <coilCarousel />
    <ModelCarousel />
  </main>
</template>

<style>
main {
  min-height: 81.5vh;
  margin: auto;
  max-width: 1440px;
  padding-left: 8px;
  padding-right: 8px;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  gap: 50px;
}

.no_data {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #ca1111;
}
</style>
