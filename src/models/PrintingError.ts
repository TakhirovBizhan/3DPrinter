export class PrintingError extends Error {
  modelName: string;
  remainingLength?: string;
  description: string;

  constructor(modelName: string, description: string, remainingLength?: number) {
    super(
      `Ошибка печати модели "${modelName}": ${description}${
        remainingLength !== undefined ? `. Остаток длины: ${remainingLength}` : ""
      }`
    );
    this.name = "PrintingError";
    this.modelName = modelName;
    this.description = description;
    this.remainingLength = remainingLength !== undefined ? `${remainingLength}` : "";
  }
}
