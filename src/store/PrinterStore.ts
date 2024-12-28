import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { printerRep } from '@/repositories/PrinterRep';
import { PrintingError, type PrinterProps } from '@/models/dataProps';
import type { Printer } from '@/models/Printer';
import { usePlasticStore } from '@/store/PlasticStore';
import { figureRep } from '@/repositories/FigureRep';
import { ElNotification } from 'element-plus';

export const usePrinterStore = defineStore('printerStore', () => {
  const printers = ref<Printer[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const plasticStore = usePlasticStore();


  const totalPrinters = computed(() => printers.value.length);

  const printer = (id: string) => computed(() => printers.value.find((p) => p.id === id))


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


  //printing proccess

  async function startPrinting(printerId: string) {
    const printer = printers.value.find((p) => p.id === printerId);
    if (!printer) {
      ElNotification({
        message: 'Принтер не найден!',
        type: 'error',
        customClass: 'message-error',
        duration: 3000,
      });
      return;
    }

    printer.loading = true;
    printer.error = null;

    try {
      if (!printer.printQueue.length) {
        throw new PrintingError(printer.articule, 'Очередь печати пуста');
      }

      printer.isPrintStarted = true;
      const figureId = printer.printQueue[0];
      const { data: figure, error: figureError } = await figureRep.getById(figureId);

      if (!figure || figureError) {
        throw new PrintingError(printer.articule, 'Фигура не найдена');
      }

      await printerRep.update(printerId, printer);
      await figureRep.updateStatus(figureId, 'in proccess');

      const plasticId = printer.plasticId;
      if (!plasticId) {
        throw new PrintingError(printer.articule, 'Пластик для принтера не выбран');
      }

      const plasticColor = plasticStore.plasticColor(plasticId).value;
      let plasticRemaining = plasticStore.plasticLength(plasticId).value;
      if (plasticRemaining === undefined) {
        throw new PrintingError(printer.articule, 'Невозможно получить длину пластика');
      }

      const totalPerimeter = figure.perimetr;
      const printSpeed = printer.printingSpeed;
      const progress = ref(0);

      const printInterval = setInterval(async () => {
        // Случайная ошибка (5%)
        if (Math.random() < 0.05) {
          clearInterval(printInterval);
          printer.isPrintStarted = false;
          progress.value = 0;
          printer.progress = progress.value;

          const errorTypes = ['Обрыв нити', 'Перегрев', 'Отклеилась модель'];
          const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];

          printer.error = `Ошибка печати: ${randomError}`;
          ElNotification({
            message: printer.error,
            type: 'error',
            customClass: 'message-error',
            duration: 2000,
            position: 'bottom-right'
          });

          await figureRep.updateStatus(figureId, 'created');
          await printerRep.update(printerId, printer);
          return;
        }

        // Обновляем прогресс и расход пластика
        plasticRemaining! -= printSpeed;
        progress.value += (printSpeed / totalPerimeter) * 100;
        printer.progress = progress.value;

        // Условия завершения печати
        if (progress.value >= 100 || plasticRemaining! <= 0) {
          clearInterval(printInterval);
          printer.isPrintStarted = false;

          if (progress.value >= 100) {
            ElNotification({
              message: `Печать завершена: ${figure.modelName}`,
              customClass: 'message-success',
              type: 'success',
              position: 'bottom-right',
              duration: 2000,
            });
            printer.progress = 0;
            printer.error = null;
            figure.color = plasticColor!;
            await figureRep.updateStatus(figureId, 'ready');
            printer.completedModels.push(figureId);
          } else {
            ElNotification({
              message: 'Недостаточно пластика для завершения печати!',
              type: 'error',
              customClass: 'message-error',
              duration: 2000,
              position: 'bottom-right'
            });
            await figureRep.updateStatus(figureId, 'created');
          }

          // Удаляем фигуру из очереди
          printer.printQueue.shift();
          await printerRep.update(printerId, printer);
          return;
        }

        // Визуальное обновление (разрезаем пластик)
        plasticStore.cutThread(plasticId, printSpeed);
        await printerRep.update(printerId, printer);
      }, 1000);
    } catch (err) {
      printer.error = err instanceof PrintingError ? err.message : 'Неизвестная ошибка';
      ElNotification({
        message: printer.error,
        customClass: 'message-error',
        type: 'error',
        duration: 2000,
        position: 'bottom-right'
      });
    } finally {
      printer.loading = false;
    }
  }

  async function stopPrinting(printerId: string) {
    const printer = printers.value.find((p) => p.id === printerId);
    if (!printer) {
      ElNotification({
        message: 'Принтер не найден!',
        type: 'error',
        customClass: 'message-error',
        duration: 2000,
        position: 'bottom-right'
      });
      return;
    }

    printer.loading = true;
    printer.error = null;

    try {
      if (!printer.isPrintStarted) {
        throw new PrintingError('StopPrinting', 'Принтер не в процессе печати');
      }

      printer.isPrintStarted = false;
      printer.progress = 0;
      printer.error = null;
      printer.loading = false;
      const figureId = printer.printQueue[0];
      await printerRep.update(printerId, printer);
      await figureRep.updateStatus(figureId, 'created');
      printer.printQueue.shift();

      ElNotification({
        message: 'Печать остановлена',
        type: 'warning',
        duration: 2000,
        customClass: 'message-error',
        position: 'bottom-right'
      });
    } catch (err) {
      printer.error = err instanceof PrintingError ? err.message : 'Неизвестная ошибка';
      ElNotification({
        message: printer.error,
        type: 'error',
        customClass: 'message-error',
        duration: 2000,
        position: 'bottom-right'
      });
    } finally {
      printer.loading = false;
    }
  }

    return {
      printers,
      loading,
      error,
      totalPrinters,

      printer,
      updatePrinterPlastic,
      stopPrinting,
      startPrinting,
      removeFromPrintQueue,
      updatePrintQueue,
      fetchPrinters,
      addPrinter,
      deletePrinter,
    };
  });

