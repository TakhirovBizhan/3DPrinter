export type PlasticProps = {
    material: string,
    color: string,
    threadLength: number;
}

export type PrinterProps = {
    mark: string;
    articule: string;
    printingSpeed: number;
  };
  

export type FigureProps = {
    modelName: string,
    perimetr: number,
    color?: 'red' | 'blue' | 'green' | 'yellow' | 'black'
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
