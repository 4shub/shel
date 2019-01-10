import fs from 'fs';
import { PluginObject, PluginCommand, PluginCommandObject } from '../interfaces/plugin';
import * as path from 'path';
import DatabaseManager from './database-manager';
import DB from '../util/database';
import InteractivityManager from './interactivity-manager';
import SessionManager from './session-manager';

const bindInnerObjects = (obj: PluginCommandObject, that: any) => Object
    .entries(obj)
    .reduce((o: PluginCommandObject, [key, value]: [string, PluginCommand]) => {
        o[key] = {
            ...value,
            operations: value.operations.map(operation => operation.bind(that)),
        };

        return o;
    }, {});

interface PermissionMap {
    interactive: Function;
    database: Function;
    [key: string]: Function
};

export default class PluginManager {
    plugins: PluginObject;

    init() {
        const permissionMap: PermissionMap = {
            interactive: () => InteractivityManager.init(),
            database: (id: string) => DatabaseManager.init(id, DB.load()),
        };

        const PLUGIN_ROOT = path.join(__dirname, '../../../');
        const PLUGIN_PATH = `${PLUGIN_ROOT}plugins`;

        if (!fs.existsSync(PLUGIN_PATH)) {
            throw new Error('Plugins directory does not exist...exiting!');
        }


        const filterForDirectories = (dir: string) => fs.lstatSync(`${PLUGIN_PATH}/${dir}`).isDirectory();
        const directories = fs.readdirSync(PLUGIN_PATH).filter(filterForDirectories);

        const DEFAULT_API_SCOPE: string[] = ['interactive'];

        this.plugins = directories
            .filter(dirName => fs.existsSync(`${PLUGIN_PATH}/${dirName}/shel.config.js`))
            .reduce((pluginObj: PluginObject, dirName) => {
                const { registrationId: id, ...pluginData } = require(`${PLUGIN_PATH}/${dirName}/shel.config.js`);
                const pluginCommands = require(`${PLUGIN_PATH}/${dirName}/dist/interface/index.js`);

                pluginObj[id] = {
                    id,
                    ...pluginData,
                    api: [...pluginData.scope, ...DEFAULT_API_SCOPE]
                        .filter((permission: string) => permissionMap[permission])
                        .reduce((obj: Record<string, Function>, permission: string) => {
                            obj[permission] = permissionMap[permission](id);

                            return obj;
                        }, {}),
                };

                pluginObj[id].commands = bindInnerObjects(pluginCommands, { ...pluginObj[id] });

                return pluginObj;
            }, {});
    }

    async run(pluginId: string, command: string, step: number, isFromCommandLine: boolean, sessionId: string, args: any) {
        if (!this.plugins[pluginId]) {
            throw new Error('plugin-not-installed');
        }

        if (!this.plugins[pluginId].commands[command]) {
            throw new Error('command-does-not-exist');
        }

        const currentPlugin = this.plugins[pluginId];
        const currentCommand = currentPlugin.commands[command];

        const { timeout = 5000 } = currentCommand;
        const { length: commandSize } = currentCommand.operations;

        const currentStep = currentCommand.operations[step || 0];

        const session = SessionManager.connect(sessionId);

        const req = {
            arguments: args,
            isFromCommandLine,
            session,
        };

        const setDefaultPayload = (status: string | string[]) => ({ payload: { status } });
        const res = {
            send: (status: string | string[]) => Promise.resolve(setDefaultPayload(status)),
            nativeSend: (data: any) => Promise.resolve(data),
        };

        const timeoutFn = new Promise((resolve) =>
            setTimeout(
                () => resolve(setDefaultPayload('This command has timed out, please try again later.')),
                timeout
            ));

        let response;

        try {
            response = await Promise.race([
                timeoutFn,
                currentStep(req, res),
            ]);

        } catch (e) {
            console.log(e)
            response = setDefaultPayload('There was an error in this command! Please contact the developer about this!')
        }

        const isNextStepAvailable = commandSize > step + 1;

        if (isNextStepAvailable) {
            response.nextStep = step + 1;
        } else {
            session.destroy();
        }

        response.sessionId = session.sessionId;

        return response;
    }
}

export const pluginManager = new PluginManager();
