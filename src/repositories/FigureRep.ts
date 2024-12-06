import { useFetch } from "@/hooks/useFetch";
import type { IFigure } from "@/models/dataInterfaces";
import { Figure } from "@/models/Figure"

export class FigureRep {

    post(figure: IFigure) {
        const newFigure = new Figure(figure.modelName, figure.perimetr, figure.creatingTime);
        const { data, error, loading } = useFetch<Figure>('figures', 'post', newFigure);

        return { data, error, loading };
    }

    get() {
        const { data, error, loading } = useFetch<Figure>('figures', 'get');
        return { data, error, loading };
    }

}