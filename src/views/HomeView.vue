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

<style scoped>
main {
  margin-top: 30px;
}
</style>
