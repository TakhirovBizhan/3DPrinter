import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { printerRep } from '@/repositories/PrinterRep';
import type { PrinterProps } from '@/models/dataProps';
import type { Printer } from '@/models/Printer';

export const usePrinterStore = defineStore('printerStore', () => {
  const printers = ref<Printer[]>([]); 
  const loading = ref(false); 
  const error = ref<string | null>(null); 


  const totalPrinters = computed(() => printers.value.length);

  async function fetchPrinters() {
    loading.value = true;
    error.value = null;

    const { data, error: fetchError } = await printerRep.get();
    if (fetchError) {
      error.value = fetchError;
    } else if (data) {
      printers.value = data;
    }

    loading.value = false;
  }

  async function addPrinter(printer: PrinterProps) {
    loading.value = true;
    error.value = null;

    const { data, error: addError } = await printerRep.post(printer);
    if (addError) {
      error.value = addError;
    } else if (data) {
      printers.value.push(data);
    }

    loading.value = false;
  }

  async function deletePrinter(id: string) {
    loading.value = true;
    error.value = null;

    const { error: deleteError } = await printerRep.delete(id);
    if (deleteError) {
      error.value = deleteError;
    } else {
      printers.value = printers.value.filter((printer) => printer.id !== id);
    }

    loading.value = false;
  }

  return {
    printers,
    loading,
    error,
    totalPrinters,

    fetchPrinters,
    addPrinter,
    deletePrinter,
  };
});