import { useFetch } from "@/hooks/useFetch";
import type { IFigure } from "@/models/dataInterfaces";
import { Figure } from "@/models/Figure";

 class FigureRep {
    async post(figure: IFigure) {
        const newFigure = new Figure(figure.modelName, figure.perimetr, figure.creatingTime);
        const { data, error, loading, fetchData } = useFetch<Figure>('figures', 'post', newFigure);

        await fetchData();  
        return { data: data.value, error: error.value, loading: loading.value }; 
    }

    async get() {
        const { data, error, loading, fetchData } = useFetch<Figure>('figures', 'get');
        
        await fetchData();

        return { data: data.value, error: error.value, loading: loading.value }; 
    }
}

export const figureRep = new FigureRep();
