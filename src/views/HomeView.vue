<script setup lang="ts">

import FigureList from '@/components/FigureComponents/FigureList.vue';
import coilList from '../components/PlasticComponents/CoilList.vue'
import PrinterList from '../components/PrintersComponents/PrinterList.vue'

</script>

<template>
  <main>
    <section>
      <h2>Printers</h2>
      <PrinterList />
    </section>
    <section>
      <h2>Plastics</h2>
      <coilList />
    </section>
    <section>
      <h2>Figures</h2>
      <FigureList />
    </section>
  </main>
</template>

<style scoped>
main {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

section h2 {
  text-align: center;
}
</style>
