/*
 * Functions that this API relies on
 */

import { Response, Request } from 'express';
import errorResponder from '../../shared/util/error-responder';
import { PluginBody } from '../../shared/interfaces/plugin';
import { pluginManager } from '../../shared/classes/plugin-manager';
import pluginErrors from './plugin.errors';

export const pluginController = {
    /**
     * Gets info about a particular plugin
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    get: async (req: Request, res: Response) => {
        try {
            return res.status(200).send({ data: false });
        } catch (error) {
            errorResponder(res, error, pluginErrors);
        }
    },

    /**
     * Passes a command to a particular plugin
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    post: async (req: Request, res: Response) => {
        try {
            const { command, isFromCommandLine = false, sessionId }: PluginBody = req.body;

            const { id: pluginId, step = 0 } = req.params;

            const [pluginCommand, ...args] = command.split(' ');

            const { useAPI, ...data } = await pluginManager.run(pluginId, pluginCommand, parseInt(step), isFromCommandLine, sessionId, args);

            if (useAPI) {
                return useAPI(req, res, data.nextStep);
            }

            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            errorResponder(res, error, pluginErrors);
        }
    }
}
