import { ServerResponse } from './Interfaces';
import { ServerApi } from './ServerApi';
import { Db } from './Db';

class ServerResponseObject {
    static makeSuccess(data: any): Promise<ServerResponse> {
        return Promise.resolve({success: true, error: null, data});
    }
}

export function getRequest(route: string): Promise<ServerResponse> {
    switch (route) {
        case ServerApi.USERS: {
            return ServerResponseObject.makeSuccess(Db.users);
        }
        case ServerApi.ROLES: {
            return ServerResponseObject.makeSuccess(Db.roles);
        }
        case ServerApi.PROJECTS: {
            return ServerResponseObject.makeSuccess(Db.projects);
        }
        default: {
            return ServerResponseObject.makeSuccess([]);
        }
    }
}

export function postRequest(route: string, body: any): Promise<ServerResponse> {
    switch (route) {
        case ServerApi.USERS: {
            return ServerResponseObject.makeSuccess(body.users);
        }
        default: {
            return ServerResponseObject.makeSuccess([]);
        }
    }
}
