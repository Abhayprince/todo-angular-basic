export class TodoModel {
    id: number;
    text: string;
    pending: boolean;
    addedOn: Date;
    constructor(text: string, pending: boolean, addedOn: Date) {
        this.id = Math.random();
        this.text = text;
        this.pending = pending;
        this.addedOn = addedOn;
    }
}