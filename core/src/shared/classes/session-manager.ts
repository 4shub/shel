import { randomTokenGenerator } from "../util/misc";

type SessionObj = Record<string, Session>;
const IN_MEMORY_SESSION_LIST: SessionObj = {};

class Session {
    store: Record<string, any> = {};
    sessionId: string;

    constructor(sessionId: string) {
        this.sessionId = sessionId;
    }

    setItem(key: string, value: any) {
        this.store[key] = value;
    }

    getItem(key: string, value: any) {
        return this.store[key];
    }

    destroy() {
        delete IN_MEMORY_SESSION_LIST[this.sessionId];
    }
}

const SessionManager = {
    connect(sessionId: string) {
        if (IN_MEMORY_SESSION_LIST[sessionId]) {
            return IN_MEMORY_SESSION_LIST[sessionId];
        }

        const nextSessionId = SessionManager.generateSessionToken();

        IN_MEMORY_SESSION_LIST[nextSessionId] = new Session(nextSessionId);

        return IN_MEMORY_SESSION_LIST[nextSessionId]
    },
    generateSessionToken: (): string => {
        const token = randomTokenGenerator(36);

        if (IN_MEMORY_SESSION_LIST[token]) {
            return SessionManager.generateSessionToken();
        }

        return token;
    },
};

export default SessionManager;