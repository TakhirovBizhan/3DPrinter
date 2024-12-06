import { PrintingError, type IFigure, type IPlasticCoil, type IPrinter } from "./dataInterfaces";

export class Printer implements IPrinter {
    isPrintStarted = false;
    mark: string;
    articule: string;
    plasticCoil: IPlasticCoil | null;
    printingSpeed: number;
    printQueue: IFigure[];
    completedModels: IFigure[];

    constructor(
        mark: string,
        articule: string,
        printingSpeed: number,
    ) {
        this.mark = mark;
        this.articule = articule;
        this.plasticCoil = null;
        this.printingSpeed = printingSpeed;
        this.printQueue = [];
        this.completedModels = [];
    }

    putCoil(plasticCoil: IPlasticCoil): void {
        this.plasticCoil = plasticCoil;
    }

    removeCoil(): void {
        this.plasticCoil = null;
    }

    addModelToQueue(figure: IFigure): void {
        this.printQueue.push(figure);
    }

    removeFromPrintQueue(figure: IFigure): void {
        if (this.isPrintStarted && figure === this.printQueue[0]) {
            throw new Error('Cannot remove the current printing figure!');
        } else {
            const index = this.printQueue.indexOf(figure);
            if (index !== -1) {
                this.printQueue.splice(index, 1);
            }
        }
    }

    startPrinting(callback: (err: PrintingError | null, success: IFigure | null) => void): void {
        if (!this.plasticCoil) {
            callback(new PrintingError(this.printQueue[0]?.modelName || 'Unknown', 'There is no coil in the printer!'), null);
            return;
        }
        if (this.printQueue.length === 0) {
            callback(new PrintingError('No model', 'Print queue is empty!'), null);
            return;
        }

        this.isPrintStarted = true;

        let printed = 0;
        const currentModel = this.printQueue[0];
        const totalPerimeter = currentModel.perimetr;
        const coilLengthPerStep = totalPerimeter / currentModel.creatingTime;

        const interval = setInterval(() => {
            if (this.plasticCoil) {
                try {
                    this.plasticCoil.cutThread(coilLengthPerStep);
                } catch (e) {
                    if (e instanceof PrintingError) {
                        clearInterval(interval);
                        callback(new PrintingError(currentModel.modelName, 'Not enough filament!', this.plasticCoil.threadLength), null);
                        return;
                    } else {
                        throw e;
                    }
                }
            }
            const diceRoll = Math.random(); 
            if (diceRoll < 0.1) { 
                const problemTypeRoll = Math.random();
                let errorMessage: string;

                if (problemTypeRoll < 0.33) {
                    errorMessage = 'Filament broke!';
                } else if (problemTypeRoll < 0.66) {
                    errorMessage = 'Printer overheated!';
                } else {
                    errorMessage = 'Model detached from the base!';
                }

                clearInterval(interval);
                callback(new PrintingError(currentModel.modelName, errorMessage), null);
                return;
            }

            printed += coilLengthPerStep;

            const progressPercentage = Math.min((printed / totalPerimeter) * 100, 100).toFixed(2);
            console.log(`Model: ${currentModel.modelName} ${progressPercentage}%`);

            if (printed >= totalPerimeter) {
                clearInterval(interval);
                this.completedModels.push(this.printQueue.shift() as IFigure);
                callback(null, currentModel);

                if (this.printQueue.length > 0) {
                    this.startPrinting(callback);
                }
            }
        }, this.printingSpeed);
    }

    stopPrint(): void {
        this.isPrintStarted = false;
        console.log(`Printing of ${this.printQueue[0]?.modelName} cancelled.`);
    }
}
