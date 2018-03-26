import { getRequest, ServerApi, postRequest } from '../common';

export class AppThunks {
    static getUsers() {
        return (dispatch, getState) => {
            return getRequest(ServerApi.USERS);
        };
    }

    static getRoles() {
        return (dispatch, getState) => {
            return getRequest(ServerApi.ROLES);
        };
    }

    static getProjects() {
        return (dispatch, getState) => {
            return getRequest(ServerApi.PROJECTS);
        };
    }

    static saveUsersToDb(body: any) {
        return (dispatch, getState) => {
            return postRequest(ServerApi.USERS, body);
        };
    }
}
