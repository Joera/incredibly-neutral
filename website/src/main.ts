import { LitService } from './lit/lit.service.js';

export class MainController {

    lit: any;

    constructor() {

        this.init()
    }

    init() {

        this.lit = new LitService(this);
        this.lit.init();
    }
}