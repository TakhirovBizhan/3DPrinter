import { v4 as uuidv4 } from 'uuid';

export class Printer {
    readonly id: string;
    isPrintStarted = false;
    mark: string;
    articule: string;
    plasticId: string | null;
    printingSpeed: number;
    printQueue: string[];
    completedModels: string[];
    currentFigure: string | null;
    progress: number = 0;
    loading: boolean = false;
    error: string | null = null;

    constructor(
        mark: string,
        articule: string,
        printingSpeed: number,
    ) {
        this.id = uuidv4();
        this.mark = mark;
        this.articule = articule;
        this.plasticId = null;
        this.printingSpeed = printingSpeed;
        this.printQueue = [];
        this.completedModels = [];
        this.currentFigure = null;
    }

    setPrintStarted () {
      this.isPrintStarted = true;
    }

    setPrintStopped () {
      this.isPrintStarted = false
    }

    updateProgress(step: number) {
      this.progress += step;
      if (this.progress > 100) this.progress = 100;
    }

    // putCoil(plasticCoil: PlasticCoil): string {
    //     this.plasticCoil = plasticCoil;
    //     return `Coil ${plasticCoil.id} loaded.`;
    // }

    // removeCoil(): string {
    //     this.plasticCoil = null;
    //     return 'Coil removed.';
    // }

    // addModelToQueue(figure: Figure): string {
    //     this.printQueue.push(figure);
    //     return `Model ${figure.modelName} added to the queue.`;
    // }

    // removeFromPrintQueue(figure: Figure): string {
    //     if (this.isPrintStarted && figure === this.printQueue[0]) {
    //         throw new Error('Cannot remove the current printing figure!');
    //     }
    //     const index = this.printQueue.indexOf(figure);
    //     if (index !== -1) {
    //         this.printQueue.splice(index, 1);
    //         return `Model ${figure.modelName} removed from the queue.`;
    //     }
    //     return `Model ${figure.modelName} not found in the queue.`;
    // }

    // async startPrinting(callback: (err: PrintingError | null, success: Figure | null) => void): Promise<string> {
    //     if (!this.plasticCoil) {
    //         callback(new PrintingError(this.printQueue[0]?.modelName || 'Unknown', 'There is no coil in the printer!'), null);
    //         return 'Error: No coil loaded.';
    //     }
    //     if (this.printQueue.length === 0) {
    //         callback(new PrintingError('No model', 'Print queue is empty!'), null);
    //         return 'Error: Print queue is empty.';
    //     }

    //     this.isPrintStarted = true;
    //     const currentModel = this.printQueue[0];
    //     currentModel.setStatusInProccess();

    //     let printed = 0;
    //     const totalPerimeter = currentModel.perimetr;
    //     const coilLengthPerStep = totalPerimeter / 100;

    //     return new Promise((resolve) => {
    //         const interval = setInterval(() => {
    //             try {
    //                 this.plasticCoil?.cutThread(coilLengthPerStep);
    //             } catch (e) {
    //                 if (e instanceof PrintingError) {
    //                     clearInterval(interval);
    //                     callback(e, null);
    //                     resolve(e.message);
    //                     return;
    //                 }
    //             }

    //             printed += coilLengthPerStep;
    //             //const progressPercentage = Math.min((printed / totalPerimeter) * 100, 100).toFixed(2);
    //             if (printed >= totalPerimeter) {
    //                 clearInterval(interval);
    //                 currentModel.setStatusReady();
    //                 this.completedModels.push(this.printQueue.shift() as Figure);
    //                 callback(null, currentModel);
    //                 resolve(`Model ${currentModel.modelName} is ready.`);
    //             }
    //         }, this.printingSpeed);
    //     });
    // }

    // stopPrint(): string {
    //     this.isPrintStarted = false;
    //     this.printQueue[0].status = 'created'
    //     return `Printing of ${this.printQueue[0]?.modelName || 'unknown model'} cancelled.`;
    // }
}
