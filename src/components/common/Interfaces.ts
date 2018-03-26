export interface Mapping {
    projectId: number;
    roleId: number;
}

export interface User {
    id: number;
    name: string;
    mapping: Mapping[];
}

export interface Role {
    id: number;
    name: string;
}

export interface Project {
    id: number;
    name: string;
}

export interface Tab {
    id: number;
    name: string;
    content: any;
}

export interface ServerResponse {
    success: boolean;
    error: string;
    data: any;
}

export interface Action {
    type: string;
    payload?: any;
}
