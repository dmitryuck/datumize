import { AppActions } from '../actions';
import { Action, AppState } from '../common';

const initialState: AppState = {
    users: [],
    roles: [],
    projects: []
};

export function appReducer(state: AppState = initialState, action: Action) {
    switch (action.type) {
        case AppActions.SET_USERS: {
            return Object.assign({}, state, {users: action.payload});
        }
        case AppActions.SET_ROLES: {
            return Object.assign({}, state, {roles: action.payload});
        }
        case AppActions.SET_PROJECTS: {
            return Object.assign({}, state, {projects: action.payload});
        }
        case AppActions.UPDATE_USER_MAPPING: {
            const user = state.users.find((usr) => (usr.id === action.payload.userId));
            let set = false;
            let mapping = user.mapping.map((m) => {
                if (m.projectId === action.payload.mapping.projectId) {
                    m.roleId = action.payload.mapping.roleId;
                    set = true;
                }
                return m;
            });
            if (!set) {
                mapping = [...mapping, action.payload.mapping];
            }
            const users = state.users.map((usr) => {
                if (usr.id === action.payload.userId) {
                    usr.mapping = mapping;
                }
                return usr;
            });
            return Object.assign({}, state, {users});
        }
        default: {
            return state;
        }
    }
}
