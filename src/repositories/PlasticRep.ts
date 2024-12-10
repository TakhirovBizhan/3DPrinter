import { useFetch } from "@/hooks/useFetch";
import type { PlasticProps } from "@/models/dataProps";
import type { PlasticCoil } from "@/models/PlasticCoil";


export class PlasticRep {
  async post(plastic: PlasticProps) {

    const { data, error, loading, fetchData } = useFetch<PlasticProps>('plastics', 'post', plastic);

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
