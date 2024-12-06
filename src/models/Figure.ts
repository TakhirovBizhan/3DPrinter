
import { v4 as uuidv4 } from 'uuid';


export class Figure {
    private readonly id: string = uuidv4();
    constructor(
        public modelName: string,
        public perimetr: number,
        public creatingTime: number
    ) { }
}