import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { printerRep } from '@/repositories/PrinterRep';
import type { PrinterProps } from '@/models/dataProps';
import type { Printer } from '@/models/Printer';
import { usePlasticStore } from '@/store/PlasticStore';

export const usePrinterStore = defineStore('printerStore', () => {
  const printers = ref<Printer[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const plasticStore = usePlasticStore();

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

  async function updatePrintQueue(printerId: string, figureId: string, requiredLength: number) {
    loading.value = true;
    error.value = null;

    const printerIndex = printers.value.findIndex((p) => p.id === printerId);

    if (printerIndex === -1) {
      error.value = 'Printer not found';
      loading.value = false;
      return;
    }

    const printer = printers.value[printerIndex];
    const plastic = plasticStore.plastics.find((p) => p.id === printer.plasticId);

    if (!plastic || plastic.threadLength < requiredLength) {
      error.value = 'Not enough plastic to add figure to print queue';
      loading.value = false;
      return;
    }

    if (!printer.printQueue.includes(figureId)) {
      const updatedPrinter = {
        ...printer,
        printQueue: [...printer.printQueue, figureId],
      };

      const { error: updateError } = await printerRep.update(printerId, updatedPrinter);

      if (updateError) {
        error.value = updateError;
      } else {
        printers.value.splice(printerIndex, 1, updatedPrinter);
      }
    }

    loading.value = false;
  }

  async function removeFromPrintQueue(printerId: string, figureId: string) {
    loading.value = true;
    error.value = null;

    const printerIndex = printers.value.findIndex((p) => p.id === printerId);

    if (printerIndex === -1) {
      error.value = 'Printer not found';
      loading.value = false;
      return;
    }

    const printer = printers.value[printerIndex];

    if (printer.printQueue.includes(figureId)) {
      const updatedPrinter = {
        ...printer,
        printQueue: printer.printQueue.filter((id) => id !== figureId),
      };

      const { error: updateError } = await printerRep.update(printerId, updatedPrinter);

      if (updateError) {
        error.value = updateError;
      } else {
        printers.value.splice(printerIndex, 1, updatedPrinter);
      }
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

  async function updatePrinterPlastic(printerId: string, plasticId: string) {
    loading.value = true;
    error.value = null;

    const printerIndex = printers.value.findIndex((p) => p.id === printerId);

    if (printerIndex === -1) {
      error.value = 'Printer not found';
      loading.value = false;
      return;
    }

    const printer = printers.value[printerIndex];

    const updatedPrinter = {
      ...printer,
      plasticId,
    };

    const { error: updateError } = await printerRep.update(printerId, updatedPrinter);

    if (updateError) {
      error.value = updateError;
    } else {
      printers.value.splice(printerIndex, 1, updatedPrinter);
    }

    loading.value = false;
  }

  return {
    printers,
    loading,
    error,
    totalPrinters,

    removeFromPrintQueue,
    updatePrintQueue,
    fetchPrinters,
    addPrinter,
    deletePrinter,
    updatePrinterPlastic,
  };
});

