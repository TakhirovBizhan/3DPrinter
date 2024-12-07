import { useFetch } from "@/hooks/useFetch";

type PrinterFormProps = {
    mark: string,
    articule: string,
    printingSpeed: number
  }

export class PrinterRep {
  post(printer: PrinterFormProps) {
    const { data, error, loading } = useFetch<PrinterFormProps>('printers', 'post', printer);
    return { data, error, loading };
  }

  get() {
    const { data, error, loading } = useFetch<PrinterFormProps>('printers', 'get');
    return { data, error, loading };
  }
}