<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { figureRep } from '@/repositories/FigureRep';
import FigureCard from './FigureCard.vue';
import type { Figure } from '@/models/Figure';

const figures = ref<Figure[]>([]);

onMounted(async () => {
    const { data, error } = await figureRep.get();
    if (!error && Array.isArray(data)) {
        figures.value = data;
    }
});
</script>

<template>
    <div>
        <ul class="list" v-if="figures.length > 0">
            <li v-for="figure in figures" :key="figure.id">
                <FigureCard :status="figure.status" :id="figure.id" :modelName="figure.modelName"
                    :perimetr="figure.perimetr" :creatingDate="figure.creatingDate" :color="figure.color" />
            </li>
        </ul>

        <p v-else class="no_data">
            No data
        </p>
    </div>
</template>