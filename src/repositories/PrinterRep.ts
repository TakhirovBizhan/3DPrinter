import { useFetch } from "@/hooks/useFetch";
import type { PrinterProps } from "@/models/dataProps";
import { Printer } from "@/models/Printer";

class PrinterRep {
  async post(printer: PrinterProps) {
    const newPrinter = new Printer(printer.mark, printer.articule, printer.printingSpeed)
    const { data, error, loading, fetchData } = useFetch<Printer>('printers', 'post', newPrinter);
    
    await fetchData();  
    return { data: data.value, error: error.value, loading: loading.value }; 
  }

  async get() {
    const { data, error, loading, fetchData } = useFetch<Printer>('printers', 'get');
    
    await fetchData();  
    return { data: data.value, error: error.value, loading: loading.value }; 
  }
}

export const printerRep = new PrinterRep();
