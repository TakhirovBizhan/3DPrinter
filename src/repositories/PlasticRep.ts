import { useFetch } from "@/hooks/useFetch";
import type { PlasticProps } from "@/models/dataProps";
import { PlasticCoil } from "@/models/PlasticCoil";


export class PlasticRep {
  async post(plastic: PlasticProps) {
    const newPlastic = new PlasticCoil(plastic.material, plastic.color, plastic.threadLength);
    const { data, error, loading, fetchData } = useFetch<PlasticCoil>('plastics', 'post', newPlastic);

    await fetchData();  
    return { data: data.value, error: error.value, loading: loading.value }; 
  }

  async get() {
    const { data, error, loading, fetchData } = useFetch<PlasticCoil[]>('plastics', 'get');
    await fetchData();  
    return { data: data.value, error: error.value, loading: loading.value }; 
  }

  async delete(id: string) {
    const { error, loading, fetchData } = useFetch<null>(`plastics/${id}`, 'delete');
    await fetchData();
    return { error: error.value, loading: loading.value };
  }
}

export const plasticRep = new PlasticRep();
