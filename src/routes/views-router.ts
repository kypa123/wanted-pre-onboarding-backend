import express from 'express';
import * as path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const viewsRouter = express.Router();

viewsRouter.use('/', serveStatic('main'));
viewsRouter.use('/', serveStatic(''));

function serveStatic(resource: string) {
    const resourcePath = path.join(__dirname, `../views/${resource}`);
    const option = { index: `${resource}.html` };
    return express.static(resourcePath, option);
}

export default viewsRouter;
