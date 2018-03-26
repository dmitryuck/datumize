import { User, Role, Project } from './Interfaces';

export class Db {
    static users: User[] = [
        {id: 1, name: 'Vasiliy Petrov', mapping: []},
        {id: 2, name: 'Timofey Gromov', mapping: []},
        {id: 3, name: 'Ivan Ivanovich', mapping: []}
    ];

    static roles: Role[] = [
        {id: 1, name: 'Admin'},
        {id: 2, name: 'Editor'},
        {id: 3, name: 'Viewer'}
    ];

    static projects: Project[] = [
        {id: 1, name: 'Trip to space'},
        {id: 2, name: 'Assembly Ikea furniture'},
        {id: 3, name: 'Datumize central'}
    ];
}