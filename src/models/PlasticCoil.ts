import { v4 as uuidv4 } from 'uuid';


export class PlasticCoil {
    readonly id: string;
    material: string;
    color: string;
    threadLength: number;

    constructor(material: string, color: string, threadLength: number) {
        this.id = uuidv4()
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