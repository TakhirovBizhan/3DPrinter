import type { IPlasticCoil } from "./dataInterfaces";


export class PlasticCoil implements IPlasticCoil {
    material: string;
    color: string;
    threadLength: number;

    constructor(material: string, color: string, threadLength: number) {
        this.material = material;
        this.color = color;
        this.threadLength = threadLength;
    }

    cutThread(cutLength: number): void {
        if (this.threadLength < cutLength) {
            throw new Error('Not enough filament');
        } else {
            this.threadLength -= cutLength;
        }
    }
}