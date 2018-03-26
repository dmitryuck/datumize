import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, ActionCreator } from 'react-redux';
import { AppRootState, AppState, ServerResponse } from '../../common';
import { AppActions } from '../../actions';
import { AppThunks } from '../../thunks';
import { User, Project, Role, Tab } from '../../common';
import { Tabs } from '../Tabs';
import { RoleModal } from '../RoleModal';
import { BodyWrap, Button } from './BodyStyled';
import { UserTable, TableRow, TableHead, TableDate, TableBody } from '../UserTable';

interface State {
    selectedUserId: number;
    selectedProjectId: number;
    selectedRoleId: number;
    assignTarget: any;
}

export interface Props {
    store?: any;
    app?: AppState;
    dispatch?: ActionCreator<any>;
    getUsers?: Function;
    getRoles?: Function;
    getProjects?: Function;
    setUsers?: Function;
    setRoles?: Function;
    setProjects?: Function;
    updateUserMapping?: Function;
    saveUsersToDb?: Function;
}

@connect((state: AppRootState) => ({
    app: state.appState
}), (dispatch: ActionCreator<any>) => bindActionCreators({
    dispatch: dispatch,
    getUsers: AppThunks.getUsers,
    getRoles: AppThunks.getRoles,
    getProjects: AppThunks.getProjects,
    setUsers: AppActions.setUsers,
    setRoles: AppActions.setRoles,
    setProjects: AppActions.setProjects,
    updateUserMapping: AppActions.updateUserMapping,
    saveUsersToDb: AppThunks.saveUsersToDb
}, dispatch))
export class Body extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedUserId: null,
            selectedRoleId: null,
            selectedProjectId: null,
            assignTarget: null
        };
    }

    componentDidMount() {
        this.props.getUsers().then((res: ServerResponse) => {
            if (res.success) {
                this.props.setUsers(res.data);
            }
        });

        this.props.getRoles().then((res: ServerResponse) => {
            if (res.success) {
                this.props.setRoles(res.data);
            }
        });

        this.props.getProjects().then((res: ServerResponse) => {
            if (res.success) {
                this.props.setProjects(res.data);
            }
        });
    }

    drawUsersForProject = (projectId: number) => {
        const { users, roles } = this.props.app;
        return (
            <UserTable>
                <TableBody>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Set</TableHead>
                    </TableRow>
                    {users.map((user, userIndex) => {
                        const roleMap = user.mapping.find((map) => map.projectId === projectId);
                        const role = roles.find((rl) => (roleMap && rl.id === roleMap.roleId));
                        return (
                            <TableRow key={userIndex}>
                                <TableDate>{userIndex + 1}</TableDate>
                                <TableDate>{user.name}</TableDate>
                                <TableDate>{role ? role.name : 'No'}</TableDate>
                                <TableDate>
                                    <Button
                                            color="green"
                                            onClick={this.setUserRole.bind(this, projectId, user.id)}
                                    >Set Role
                                    </Button>
                                </TableDate>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </UserTable>
        );
    }

    getTabs = (): Tab[] => {
        const { projects } = this.props.app;
        return projects.map((proj, projIndex) => {
            const content = this.drawUsersForProject(proj.id);
            return {
                id: projIndex,
                name: proj.name,
                content
            };
        });
    }

    setUserRole = (projectId, userId) => {
        const { users } = this.props.app;
        const user = users.find((usr) => (usr.id === userId));
        const mapping = user.mapping.find((map) => (map.projectId === projectId));
        const roleId = mapping ? mapping.roleId : null;
        this.setState({assignTarget: {projectId, userId, roleId}});
    }

    selectUserRole = (e) => {
        const { assignTarget } = this.state;
        const roleId = +e.target.value;
        this.setState((state) => ({
            assignTarget: {...state.assignTarget, roleId},
        }));
    }

    assignUserRole = () => {
        const { users } = this.props.app;
        const { assignTarget } = this.state;
        const user = users.find((usr) => (usr.id === assignTarget.userId));
        this.props.updateUserMapping(user.id, {
                projectId: assignTarget.projectId,
                roleId: assignTarget.roleId
        });
        this.setState({assignTarget: null});
    }

    closeAssignDialog = () => {
        this.setState({assignTarget: null});
    }

    onSaveUsers = () => {
        const body = {
            users: this.props.app.users
        };
        this.props.saveUsersToDb(body).then((res: ServerResponse) => {
            if (res.success) {
                console.log(res.data);
                alert('Users saved. See console for response.');
            }
        });
    }

    drawRoleModal = () => {
        let { roles } = this.props.app;
        const { assignTarget } = this.state;
        const selectedRoleId = this.state.assignTarget ? this.state.assignTarget.roleId : null;
        const selectedRole = roles.find((rl) => (rl.id === assignTarget.roleId));
        if (roles[0].id !== 0) {
            roles.unshift({id: 0, name: 'No'});
        }
        return (
            <RoleModal
                        roles={roles}
                        selectUserRole={this.selectUserRole}
                        selectedRoleId={selectedRoleId}
                        close={this.closeAssignDialog}
                        assign={this.assignUserRole}
            />
        );
    }

    render() {
        const { assignTarget } = this.state;
        return (
            <BodyWrap>
                <Tabs tabs={this.getTabs()}/>
                <Button onClick={this.onSaveUsers} color="blue">Save</Button>
                {assignTarget && this.drawRoleModal()}
            </BodyWrap>
        );
    }
}
