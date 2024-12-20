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
    loading.value = true;
    error.value = null;

    try {
      const printer = printers.value.find((p) => p.id === printerId);
      if (!printer || !printer.printQueue.length) {
        throw new PrintingError('StartPrinting', 'Принтер не найден или очередь пуста');
      }

      // Установка статуса
      printer.isPrintStarted = true;
      const figureId = printer.printQueue[0];
      const { data: figure, error: figureError } = await figureRep.getById(figureId);

      if (!figure || figureError) {
        throw new PrintingError('StartPrinting', 'Фигура не найдена');
      }

      await printerRep.update(printerId, printer);
      await figureRep.updateStatus(figureId, 'in proccess');
      await fetchPrinters();

      // Проверка и инициализация пластика
      const plasticId = printer.plasticId;
      if (!plasticId) {
        throw new PrintingError('StartPrinting', 'Пластик для принтера не выбран');
      }

      let plasticRemaining = plasticStore.plasticLength(plasticId).value;
      if (plasticRemaining === undefined) {
        throw new PrintingError('StartPrinting', 'Невозможно получить длину пластика');
      }

      const totalPerimeter = figure.perimetr;
      const printSpeed = printer.printingSpeed;
      let progress = 0;

      // Запуск печати
      const printInterval = setInterval(async () => {
        // Случайная ошибка
        if (Math.random() < 0.05) { // 5% вероятность ошибки
          clearInterval(printInterval);
          printer.isPrintStarted = false;

          const errorTypes = ['Обрыв нити пластика', 'Перегрев принтера', 'Отклеилась модель от основания'];
          const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];

          ElNotification({
            message: `Ошибка печати: ${randomError}`,
            type: 'error',
            customClass: 'message-error',
            duration: 3000,
          });

          await figureRep.updateStatus(figureId, 'created');
          await printerRep.update(printerId, printer);
          return;
        }

        // Обновление прогресса
        plasticRemaining! -= printSpeed;
        progress += (printSpeed / totalPerimeter) * 100;

        if (progress >= 100 || plasticRemaining! <= 0) {
          clearInterval(printInterval);
          printer.isPrintStarted = false;

          if (progress >= 100) {
            ElNotification({
              message: `Печать завершена для фигуры ${figure.modelName}`,
              type: 'success',
              duration: 2000,
            });

            await figureRep.updateStatus(figureId, 'ready');
            printer.completedModels.push(figureId);
          } else {
            ElNotification({
              message: 'Недостаточно пластика для завершения печати!',
              type: 'error',
              duration: 3000,
            });

            await figureRep.updateStatus(figureId, 'created');
          }

          printer.printQueue.shift(); // Удалить из очереди
          await printerRep.update(printerId, printer);
          return;
        }

        // Обновление данных принтера
        printer.progress = progress;
        plasticStore.cutThread(plasticId, printSpeed);
        await printerRep.update(printerId, printer);
      }, 1000);
    } catch (err) {
      if (err instanceof PrintingError) {
        ElNotification({
          message: `Ошибка: ${err.message}`,
          type: 'error',
          duration: 3000,
        });
      } else {
        ElNotification({
          message: 'Неизвестная ошибка!',
          type: 'error',
          duration: 3000,
        });
      }
    } finally {
      loading.value = false;
    }
  }


  async function stopPrinting(printerId: string) {
    loading.value = true;
    error.value = null;

    try {
      const printer = printers.value.find((p) => p.id === printerId);
      if (!printer) {
        throw new PrintingError('StopPrinting', 'Принтер не найден');
      }

      printer.setPrintStopped();
      const figureId = printer.printQueue[0];
      await printerRep.update(printerId, printer);
      await figureRep.updateStatus(figureId, 'created');
      await fetchPrinters();


    } catch (err) {
      if (err instanceof PrintingError) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
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

