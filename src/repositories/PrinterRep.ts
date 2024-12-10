import { useFetch } from "@/hooks/useFetch";
import type { PrinterProps } from "@/models/dataProps";

class PrinterRep {
  async post(printer: PrinterProps) {
    const { data, error, loading, fetchData } = useFetch<PrinterProps>('printers', 'post', printer);
    
    await fetchData();  
    return { data: data.value, error: error.value, loading: loading.value }; 
  }

  async get() {
    const { data, error, loading, fetchData } = useFetch<PrinterProps>('printers', 'get');
    
    await fetchData();  
    return { data: data.value, error: error.value, loading: loading.value }; 
  }
}

export const printerRep = new PrinterRep();
