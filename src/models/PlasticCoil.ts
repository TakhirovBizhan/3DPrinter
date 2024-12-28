import { v4 as uuidv4 } from 'uuid';
import { PrintingError } from './dataProps';


export class PlasticCoil {
    readonly id: string;
    material: string;
    color: 'red' | 'blue' | 'green' | 'yellow' | 'black' = 'black';
    threadLength: number;
    inUse: boolean = false;

    constructor(material: string, color: string, threadLength: number) {
        this.id = uuidv4()
        this.material = material;
        this.threadLength = threadLength;
    }

    cutThread (length: number) {
      if(length > this.threadLength) {
        throw new PrintingError(this.material, 'не хватает длины!', this.threadLength)
      }
      this.threadLength -= length;
    }
}
