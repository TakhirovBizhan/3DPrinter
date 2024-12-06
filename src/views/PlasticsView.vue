<script setup lang="ts">
import CoilForm from '@/components/Organisms/CoilForm.vue';
import CoilList from '@/components/Organisms/CoilList.vue';

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
  background-color: rgb(118, 210, 118);
  height: fit-content;
}

</style>
