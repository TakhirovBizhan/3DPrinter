<script setup lang="ts">
import CoilForm from '@/components/PlasticComponents/CoilForm.vue';
import CoilList from '@/components/PlasticComponents/CoilList.vue';

</script>

<template>
  <main>
    <h2>Plastic</h2>
    <div class="container">
      <CoilList />
    <div class="container__form">
      <CoilForm />
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
