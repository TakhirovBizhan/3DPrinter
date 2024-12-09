<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { PlasticCoil } from '@/models/PlasticCoil';
import { plasticRep } from '@/repositories/PlasticRep';
import CoilCard from '../PlasticComponents/CoilCard.vue';

const coils = ref<PlasticCoil[]>([]);

onMounted(async () => {
    const { data, error } = await plasticRep.get();
    if (!error && Array.isArray(data)) {
        coils.value = data;
    }
});
</script>

<template>
    <div>
        <ul class="list" v-if="coils.length > 0">
            <li v-for="coil in coils" :key="coil.id">
                <CoilCard :material="coil.material" :color="coil.color" :thread-length="coil.threadLength" />
            </li>
        </ul>
        <p v-else class="no_data">
            No data
        </p>
    </div>
</template>

<style>
.list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 830px;
    padding: 0;
    justify-content: center;
}
</style>