<script setup lang="ts">
import CoilForm from '@/components/PlasticComponents/CoilForm.vue';
import CoilList from '@/components/PlasticComponents/CoilList.vue';

</script>

<template>
  <main class="main">
    <div class="wrapper">
      <h2>Plastic</h2>
      <div class="container">
        <CoilList />
        <div class="container__form">
          <CoilForm />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="css">
.wrapper {
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  align-items: center;
}

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
