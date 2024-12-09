
import { v4 as uuidv4 } from 'uuid';


export class Figure {
    readonly id: string = uuidv4();
    constructor(
        public modelName: string,
        public perimetr: number,
        public creatingTime: number,
        public color:  'red' | 'blue' | 'green' | 'yellow' | 'black' = 'black',
    ) { }
}