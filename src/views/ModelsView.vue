<script setup lang="ts">
import FigureForm from '@/components/FigureComponents/FigureForm.vue';
import FigureList from '@/components/FigureComponents/FigureList.vue';

</script>

<template>
  <main>
    <h2>Models</h2>
    <div class="container">
      <FigureList />
    <div class="container__form">
      <FigureForm />
    </div>
    </div>
  </main>
</template>

<style lang="css" scoped>

.container {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.container__form {
  padding: 20px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 20px;
  height: fit-content;
}

</style>