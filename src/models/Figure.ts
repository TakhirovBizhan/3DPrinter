import { v4 as uuidv4 } from 'uuid';

export class Figure {
    readonly id: string = uuidv4();
    creatingDate: string = new Date().toLocaleDateString('en-EN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
    status: 'created' | 'in proccess' | 'ready' = 'created'
    constructor(
        public modelName: string,
        public perimetr: number,
        public color: 'red' | 'blue' | 'green' | 'yellow' | 'black' = 'black',
    ) { }

    setStatusInProccess() {
        this.status = 'in proccess'
    }

    setStatusReady() {
        this.status = 'ready'
    }
}