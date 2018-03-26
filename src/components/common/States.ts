import { User, Role, Project } from './Interfaces';

export interface AppRootState {
    appState: AppState;
}

export interface AppState {
    users: User[];
    roles: Role[];
    projects: Project[];
}