<script setup lang="ts">
import CoilList from '@/components/Organisms/CoilList.vue';
import PrinterCard from '../components/Atoms/PrinterCard.vue';
import PrinterList from '@/components/Organisms/PrinterList.vue';
</script>

<template>
  <main>
    <div class="wrapper">
      <PrinterList />
      <div>
        <CoilList />
      </div>
      <div>
        <h2>Models</h2>
        <PrinterCard/>
      </div>
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
  background-color: rgb(204, 226, 205);
}


</style>
