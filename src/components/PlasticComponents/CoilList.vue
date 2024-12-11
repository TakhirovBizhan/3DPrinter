<script setup lang="ts">
import { onMounted } from 'vue';
import CoilCard from '../PlasticComponents/CoilCard.vue';
import { usePlasticStore } from '@/store/PlasticStore';

const plasticStore = usePlasticStore();


onMounted(async () => {
    await plasticStore.fetchPlastics();
});
</script>

<template>
    <div>
        <ul class="list" v-if="plasticStore.totalPlastics > 0">
            <li v-for="coil in plasticStore.plastics" :key="coil.id">
                <CoilCard :id="coil.id" :material="coil.material" :color="coil.color"
                    :thread-length="coil.threadLength" />
            </li>
        </ul>
        <p v-else class="no_data">
            No data
        </p>
    </div>
</template>

<style scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 830px;
    padding: 0;
    justify-content: center;
}
</style>