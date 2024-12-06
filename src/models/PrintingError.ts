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
