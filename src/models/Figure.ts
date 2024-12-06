import type { IFigure } from "./dataInterfaces";

export class Figure implements IFigure {
    constructor(
        public modelName: string,
        public perimetr: number,
        public creatingTime: number
    ) { }
}