import { reactive } from 'vue';
import { ElNotification } from 'element-plus';
import { figureRep } from '@/repositories/FigureRep';
import { printerRep } from '@/repositories/PrinterRep';
import { PrintingError } from '@/models/PrintingError';
import { usePlasticStore } from '@/store/PlasticStore';
import { usePrinterStore } from '@/store/PrinterStore';
import type { Printer } from '@/models/Printer';

interface PrinterState {
  loading: boolean;
  error: string | null;
  progress: number;
  isPrintStarted: boolean;
}

export function usePrinter() {
  const printerStore = usePrinterStore();
  const printerStateMap = reactive<Record<string, PrinterState>>({});
  const plasticStore = usePlasticStore();

  function initializePrinterState(printerId: string) {
    if (!printerStateMap[printerId]) {
      printerStateMap[printerId] = {
        loading: false,
        error: null,
        progress: 0,
        isPrintStarted: false,
      };
    }
  }

  async function startPrinting(printerId: string) {
    initializePrinterState(printerId);
    const printer = printerStore.printers.find((p: Printer) => p.id === printerId);
    const state = printerStateMap[printerId];

    if (!printer) {
      ElNotification({
        message: 'Принтер не найден!',
        type: 'error',
        duration: 3000,
        customClass: 'message-error'
      });
      return;
    }

    state.loading = true;
    state.error = null;

    try {
      if (!printer.printQueue.length) {
        throw new PrintingError(printer.articule, 'Очередь печати пуста');
      }

      state.isPrintStarted = true;
      const figureId = printer.printQueue[0];
      const { data: figure, error: figureError } = await figureRep.getById(figureId);

      if (!figure || figureError) {
        throw new PrintingError(printer.articule, 'Фигура не найдена');
      }

      // Устанавливаем текущую печатаемую модель
      state.currentFigure = figure.modelName;

      if (!printer.plasticId) {
        throw new PrintingError(printer.articule, 'Пластик для принтера не выбран');
      }

      let plasticRemaining = plasticStore.plasticLength(printer.plasticId).value ?? 0;

      if (plasticRemaining <= 0) {
        throw new PrintingError(printer.articule, 'Невозможно получить длину пластика');
      }

      await printerRep.update(printerId, { ...printer, isPrintStarted: true });
      await figureRep.updateStatus(figureId, 'in proccess');

      const totalPerimeter = figure.perimetr;
      const printSpeed = printer.printingSpeed;
      state.progress = 0;

      const printInterval = setInterval(async () => {
        if (Math.random() < 0.05) {
          clearInterval(printInterval);
          state.isPrintStarted = false;
          state.error = 'Ошибка печати: ' + randomPrintError();

          ElNotification({
            message: state.error,
            type: 'error',
            duration: 3000,
            customClass: 'message-error'
          });

          printer.isPrintStarted = false;
          state.progress = 0;
          state.currentFigure = null;  // Сбрасываем текущую фигуру при ошибке
          await figureRep.updateStatus(figureId, 'created');
          await printerRep.update(printerId, printer);
          return;
        }

        plasticRemaining -= printSpeed;
        state.progress += (printSpeed / totalPerimeter) * 100;

        if (state.progress >= 100 || plasticRemaining <= 0) {
          clearInterval(printInterval);
          state.isPrintStarted = false;

          if (state.progress >= 100) {
            ElNotification({
              message: `Печать завершена: ${figure.modelName}`,
              type: 'success',
              duration: 2000,
              customClass: 'message-success'
            });

            printer.completedModels.push(figureId);
            await figureRep.updateStatus(figureId, 'ready');
          } else {
            ElNotification({
              message: 'Недостаточно пластика для завершения печати!',
              type: 'error',
              duration: 3000,
              customClass: 'message-error'
            });

            await figureRep.updateStatus(figureId, 'created');
          }

          printer.printQueue.shift();
          state.progress = 0;
          state.currentFigure = null;  // Сбрасываем после завершения
          printer.isPrintStarted = false;
          await printerRep.update(printerId, printer);

          if (printer.printQueue.length > 0) {
            startPrinting(printerId);
          }
          return;
        }

        plasticStore.cutThread(printer.plasticId!, printSpeed);
        await printerRep.update(printerId, printer);
      }, 1000);
    } catch (err) {
      state.error = err instanceof PrintingError ? err.message : 'Неизвестная ошибка';
      ElNotification({
        message: state.error,
        type: 'error',
        duration: 3000,
        customClass: 'message-error'
      });
    } finally {
      state.loading = false;
    }
  }

  async function stopPrinting(printerId: string) {
    initializePrinterState(printerId);
    const printer = printerStore.printers.find((p) => p.id === printerId);
    const state = printerStateMap[printerId];

    if (!printer) {
      ElNotification({ message: 'Принтер не найден!', type: 'error', duration: 3000, customClass: 'message-error' });
      return;
    }

    state.loading = true;
    try {
      if (!state.isPrintStarted) {
        throw new PrintingError('StopPrinting', 'Принтер не в процессе печати');
      }

      state.isPrintStarted = false;
      printer.isPrintStarted = false;
      state.progress = 0;
      const figureId = printer.printQueue[0];
      await figureRep.updateStatus(figureId, 'created');
      printer.printQueue.shift();

      await printerRep.update(printerId, printer);
      ElNotification({ message: 'Печать остановлена', type: 'warning', duration: 2000, customClass: 'message-success' });
    } catch (err) {
      state.error = err instanceof PrintingError ? err.message : 'Неизвестная ошибка';
      ElNotification({ message: state.error, type: 'error', duration: 3000, customClass: 'message-error' });
    } finally {
      state.loading = false;
    }
  }

  function randomPrintError() {
    const errors = ['Обрыв нити', 'Перегрев', 'Отклеилась модель'];
    return errors[Math.floor(Math.random() * errors.length)];
  }

  return {
    printerStateMap,
    startPrinting,
    stopPrinting
  };
}
