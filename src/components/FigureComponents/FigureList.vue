<script setup lang="ts">
import { onMounted } from 'vue';
import FigureCard from './FigureCard.vue';
import { useFigureStore } from '@/store/FigureStore';

const figureStore = useFigureStore();

onMounted(async () => {
    await figureStore.fetchFigures();
});
</script>

<template>
    <div>
        <ul class="list" v-if="figureStore.figures.length > 0">
            <li v-for="figure in figureStore.figures" :key="figure.id">
                <FigureCard :status="figure.status" :id="figure.id" :modelName="figure.modelName"
                    :perimetr="figure.perimetr" :creatingDate="figure.creatingDate" :color="figure.color" />
            </li>
        </ul>

        <p v-else class="no_data">
            No data
        </p>
    </div>
</template>