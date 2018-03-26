import { User, Role, Project, Mapping } from '../common';

export class AppActions {
    static SET_USERS = 'SET_USERS';
    static SET_ROLES = 'SET_ROLES';
    static SET_PROJECTS = 'SET_PROJECTS';
    static UPDATE_USER_MAPPING = 'UPDATE_USER_MAPPING';

    static setUsers = (users: User[]) => ({ type: AppActions.SET_USERS, payload: users });
    static setRoles = (roles: Role[]) => ({ type: AppActions.SET_ROLES, payload: roles });
    static setProjects = (projects: Project[]) => ({ type: AppActions.SET_PROJECTS, payload: projects });
    static updateUserMapping = (userId: number, mapping: Mapping) => (
        { type: AppActions.UPDATE_USER_MAPPING, payload: {userId, mapping} }
    )
}
