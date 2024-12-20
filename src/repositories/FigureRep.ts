import { useFetch } from "@/hooks/useFetch";
import type { FigureProps } from "@/models/dataProps";
import { Figure } from "@/models/Figure";

class FigureRep {
  async post(figure: FigureProps) {
    const newFigure = new Figure(figure.modelName, figure.perimetr, figure.color);
    const { data, error, loading, fetchData } = useFetch<Figure>('figures', 'post', newFigure);

    await fetchData();
    return { data: data.value, error: error.value, loading: loading.value };
  }

  async get() {
    const { data, error, loading, fetchData } = useFetch<Figure[]>('figures', 'get');
    await fetchData();

    return { data: data.value, error: error.value, loading: loading.value };
  }

  async getById(id: string) {
    const {data, error, fetchData } = useFetch<Figure>(`figures/${id}`, 'get')

    await fetchData();

    return { data: data.value, error: error.value };

  }

  async delete(id: string) {
    const { error, loading, fetchData } = useFetch<null>(`figures/${id}`, 'delete');
    await fetchData();
    return { error: error.value, loading: loading.value };
  }

  async updateStatus(id: string, value: 'created' | 'in proccess' | 'ready') {
    const body = { status: value };
    const { error, loading, fetchData } = useFetch<Figure>(`figures/${id}`, 'patch', body);
    await fetchData();
    return { error: error.value, loading: loading.value };
  }

  async updatePrintStatus(id: string, value: boolean) {
    const body = { inPrintQueue: value };
    const { error, loading, fetchData } = useFetch<Figure>(`figures/${id}`, 'patch', body);
    await fetchData();
    return { error: error.value, loading: loading.value };
  }


  async fetchAllToPinia(figureStore: { setError: (error: string | null) => void; setFigures: (figures: Figure[]) => void }) {
    const { data, error } = await this.get();
    if (error) {
      figureStore.setError(error);
    } else if (data) {
      figureStore.setFigures(data);
    }
  }
}

export const figureRep = new FigureRep();
