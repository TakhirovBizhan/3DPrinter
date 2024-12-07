import { useFetch } from "@/hooks/useFetch";
import { Printer } from "@/models/Printer";

type PrinterFormProps = {
  mark: string;
  articule: string;
  printingSpeed: number;
};

class PrinterRep {
  async post(printer: PrinterFormProps) {
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
