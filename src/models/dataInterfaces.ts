export interface IPlasticCoil {
    material: string,
    color: string,
    threadLength: number;
    cutThread(newLength: number): void;
}

export interface IFigure {
    modelName: string,
    perimetr: number,
    creatingTime: number;
}

export interface IPrinter {
    isPrintStarted: boolean;
    mark: string;
    articule: string;
    plasticCoil: IPlasticCoil | null;
    printingSpeed: number;
    printQueue: IFigure[];
    completedModels: IFigure[];
    putCoil(plasticCoil: IPlasticCoil): void;
    removeCoil(): void;
    addModelToQueue(figure: IFigure): void;
    removeFromPrintQueue(figure: IFigure): void;
    startPrinting(callback: (err: PrintingError | null, success: IFigure | null) => void): void;
    stopPrint(): void;
}

export class PrintingError extends Error {
    modelName: string;
    remainingLength?: string;
    description: string;

    constructor(modelName: string, description: string, remainingLength?: number) {
        super(`Модель: ${modelName} Ошибка: ${description} ${remainingLength !== undefined ? `Остаток длины: ${remainingLength}` : ''}`);
        this.modelName = modelName;
        this.description = description;
        this.remainingLength = remainingLength !== undefined ? `Остаток длины: ${remainingLength}` : '';
    }
}
