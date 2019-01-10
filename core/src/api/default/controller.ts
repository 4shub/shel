/*
 * Functions that this API relies on
 */

import { Response, Request } from 'express';
import path from 'path';
import fs from 'fs';

export class Getters {
    /**
     * Returns a website content by opening the page in a Phantomjs Instance
     * @param {Request} req - Request Object
     * @param {Response} res - Response Object
     * @return {string} An html object
     */
    async all(req: Request, res: Response) {
        const fileRoot = path.join(__dirname, '../../app');
        const filePath = path.join(fileRoot, req.url);
        const fileToSend = fs.existsSync(filePath) ? filePath : path.join(fileRoot, 'index.html');

        return res.sendFile(fileToSend);
    }
}


export default class Controller {
    get: Getters;

    constructor(...data: any[]) {
        this.get = new Getters();
    }
}
