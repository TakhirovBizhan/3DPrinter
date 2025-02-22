<script setup lang="ts">
import { usePlasticStore } from '@/store/PlasticStore';
import { Delete } from '@element-plus/icons-vue';

defineProps({
  id: { type: String, required: true },
  material: String,
  color: String,
  threadLength: Number,
  inUse: { type: Boolean, required: true }
})

const plasticStore = usePlasticStore();

const deletePlastic = async (id: string) => {
  plasticStore.deletePlastic(id);
}

</script>

<template>
  <el-card class="card">
    <template #header>
      <div class="card__header">
        <h4>Material: {{ material }}</h4>
        <el-button class="button__busy" v-if="inUse" type="danger" plain>In use</el-button>
        <el-button class="button__not_busy" v-else type="success" plain>Not in use</el-button>
      </div>
    </template>
    <svg width="200" height="200" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M46.1667 69.9999C43.1667 69.9999 40.6389 68.9721 38.5833 66.9166C36.5278 64.861 35.5 62.3888 35.5 59.4999C35.5 55.2777 37.2089 51.4577 40.6267 48.0399C44.0444 44.6221 48.3078 42.4977 53.4167 41.6666C53.25 39.6666 52.75 38.1532 51.9167 37.1266C51.0833 36.0999 49.9444 35.5855 48.5 35.5833C46.8333 35.5833 45.0278 36.2777 43.0833 37.6666C41.1389 39.0555 38.8333 41.3333 36.1667 44.4999C31.8333 49.6666 28.6533 53.0277 26.6267 54.5833C24.6 56.1388 22.4189 56.9166 20.0833 56.9166C17.25 56.9166 14.8611 55.861 12.9167 53.7499C10.9722 51.6388 10 49.0833 10 46.0833C10 43.0833 10.6533 40.0144 11.96 36.8766C13.2667 33.7388 15.4744 29.9744 18.5833 25.5833C19.6389 24.1388 20.4167 22.9166 20.9167 21.9166C21.4167 20.9166 21.6667 20.111 21.6667 19.4999C21.6667 19.111 21.5978 18.8199 21.46 18.6266C21.3222 18.4333 21.1133 18.3355 20.8333 18.3333C20.2778 18.3333 19.5833 18.681 18.75 19.3766C17.9167 20.0721 16.9444 21.141 15.8333 22.5833L10 16.6666C11.7778 14.4999 13.5833 12.8477 15.4167 11.7099C17.25 10.5721 19.0556 10.0021 20.8333 9.99992C23.3889 9.99992 25.5556 10.8888 27.3333 12.6666C29.1111 14.4444 30 16.6666 30 19.3333C30 20.9444 29.5833 22.7221 28.75 24.6666C27.9167 26.611 26.5278 28.9444 24.5833 31.6666C22.4722 34.6666 20.9033 37.3055 19.8767 39.5833C18.85 41.861 18.3356 43.861 18.3333 45.5833C18.3333 46.5277 18.4867 47.2644 18.7933 47.7933C19.1 48.3221 19.53 48.5855 20.0833 48.5833C20.6367 48.581 21.1233 48.4288 21.5433 48.1266C21.9633 47.8244 22.7267 47.0877 23.8333 45.9166C24.5556 45.1388 25.4167 44.181 26.4167 43.0433C27.4167 41.9055 28.6389 40.5021 30.0833 38.8332C33.5833 34.6666 36.75 31.6944 39.5833 29.9166C42.4167 28.1388 45.3889 27.2499 48.5 27.2499C52.2222 27.2499 55.2778 28.4999 57.6667 30.9999C60.0556 33.4999 61.4167 36.9166 61.75 41.2499H70V49.5833H61.75C61.3056 55.8055 59.6811 60.7633 56.8767 64.4566C54.0722 68.1499 50.5022 69.9977 46.1667 69.9999ZM46.3333 61.6666C48.1111 61.6666 49.6111 60.6521 50.8333 58.6233C52.0556 56.5944 52.8889 53.7755 53.3333 50.1666C50.7778 50.7777 48.5556 51.9866 46.6667 53.7933C44.7778 55.5999 43.8333 57.391 43.8333 59.1666C43.8333 59.9444 44.0556 60.5555 44.5 60.9999C44.9444 61.4444 45.5556 61.6666 46.3333 61.6666ZM66.6667 23.3333C63.8889 23.3333 61.5278 22.361 59.5833 20.4166C57.6389 18.4721 56.6667 16.111 56.6667 13.3333C56.6667 10.5555 57.6389 8.19436 59.5833 6.24992C61.5278 4.30547 63.8889 3.33325 66.6667 3.33325C69.4444 3.33325 71.8056 4.30547 73.75 6.24992C75.6944 8.19436 76.6667 10.5555 76.6667 13.3333C76.6667 16.111 75.6944 18.4721 73.75 20.4166C71.8056 22.361 69.4444 23.3333 66.6667 23.3333Z"
        :fill="color ? color : 'black'" />
    </svg>
    <p class="text item">thread length: {{ threadLength }}</p>
    <p class="text item">Color: {{ color }}</p>
    <template #footer>
      <el-button v-if="!inUse" :loading="plasticStore.loading" @click="() => deletePlastic(id)" type="danger"
        :icon="Delete" circle />
      <el-popover v-else placement="top-start" title="Warning!" :width="200" trigger="hover"
        content="If you want to delete this plastic you have to remove it from printer!">
        <template #reference>
          <el-button disabled type="danger" :icon="Delete" circle />
        </template>
      </el-popover>

    </template>
  </el-card>
</template>

<style lang="css" scoped>
.card__header {
  display: flex;
  justify-content: space-between;
}

.card {
  max-width: 250px;
}

h4 {
  margin-bottom: 3px;
  margin-top: 3px;
}

.spool__img {
  width: 100%;
}

.button__busy:hover {
  color: var(--el-color-danger);
  background-color: var(--el-color-danger-light-9);
}

.button__not_busy:hover {
  color: var(--el-color-success);
  background-color: var(--el-color-success-light-9);
}
</style>
