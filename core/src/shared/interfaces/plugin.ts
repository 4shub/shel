export type PluginId = string;
export type CommandId = string;

export interface PluginCommand {
    description: string;
    timeout?: number;
    operations: Function[];
}

export type PluginCommandObject = Record<CommandId, PluginCommand>;

export interface Plugin {
    name: string;
    id: PluginId;
    description: string;
    readmeURL: string;
    commands: PluginCommandObject;
}

export type PluginObject = Record<PluginId, Plugin>;

export interface PluginBody {
    command: string;
    isFromCommandLine?: boolean;
    sessionId?: string;
}
