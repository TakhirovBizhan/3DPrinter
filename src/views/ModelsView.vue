<script setup lang="ts">
import FigureForm from '@/components/FigureComponents/FigureForm.vue';
import FigureList from '@/components/FigureComponents/FigureList.vue';

</script>

<template>
  <main>
    <div class="wrapper">
      <h2>Models</h2>
      <div class="container">
        <FigureList />
        <div class="container__form">
          <FigureForm />
        </div>
      </div>
    </div>
  </main>
</template>