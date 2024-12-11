<script setup lang="ts">
import FigureForm from '@/components/FigureComponents/FigureForm.vue';
import FigureList from '@/components/FigureComponents/FigureList.vue';

</script>

<template>
  <main>
    <div class="wrapper">
      <div class="title__block">
        <h2>Figures</h2>
        <FigureForm />
      </div>
      <div class="container">
        <FigureList />
      </div>
    </div>
  </main>
</template>

<style>
.title__block {
  display: flex;
  gap: 20px;
  align-items: center;

}
</style>