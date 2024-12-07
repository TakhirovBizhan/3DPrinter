import { useFetch } from "@/hooks/useFetch";
import { PlasticCoil } from "@/models/PlasticCoil";

type PlasticFormProp = {
  material: string;
  color: string;
  threadLength: number;
};

export class PlasticRep {
  async post(plastic: PlasticFormProp) {
    const newPlastic = new PlasticCoil(plastic.material, plastic.color, plastic.threadLength);
    const { data, error, loading, fetchData } = useFetch<PlasticCoil>('plastics', 'post', newPlastic);

    await fetchData();  
    return { data: data.value, error: error.value, loading: loading.value }; 
  }

  async get() {
    const { data, error, loading, fetchData } = useFetch<PlasticCoil>('plastics', 'get');
    
    await fetchData();  
    return { data: data.value, error: error.value, loading: loading.value }; 
  }
}