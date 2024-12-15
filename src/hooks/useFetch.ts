import { ref } from 'vue';
import axios from 'axios';

type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete';
const BASE_URL = "http://localhost:3000";

export function useFetch<T>(
  url: string,
  method: Methods,
  body?: Partial<T> | Record<string, unknown>
) {
    const data = ref<T | null>(null);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);

    const fetchData = async () => {
        loading.value = true;
        error.value = null;

        try {
            let response;

            switch (method) {
                case 'get':
                    response = await axios.get(`${BASE_URL}/${url}`);
                    break;
                case 'post':
                    response = await axios.post(`${BASE_URL}/${url}`, body);
                    break;
                case 'put':
                    response = await axios.put(`${BASE_URL}/${url}`, body);
                    break;
                case 'patch':
                    response = await axios.patch(`${BASE_URL}/${url}`, body);
                    break;
                case 'delete':
                    response = await axios.delete(`${BASE_URL}/${url}`);
                    break;
                default:
                    throw new Error('Unsupported method');
            }

            data.value = response.data;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
        } finally {
            loading.value = false;
        }
    };

    return { data, error, loading, fetchData };
}
