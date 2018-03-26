import React from 'react';
import { Role } from '../../common';
import { Button } from '../Body/BodyStyled';
import { Modal, ModalHeader, ModalBody, ModalFooter, Select, SelectOption } from './RoleModalStyled';

interface State {
}

export interface Props {
    roles: Role[];
    selectUserRole: Function;
    selectedRoleId: number;
    close: Function;
    assign: Function;
}

export class RoleModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    selectUserRole = (e) => {
        this.props.selectUserRole(e);
    }

    render() {
        const { roles, selectedRoleId, close, assign, selectUserRole } = this.props;
        return (
            <Modal>
                <ModalHeader>
                    <h3>User Roles Assign</h3>
                </ModalHeader>

                <ModalBody>
                    <Select
                        onChange={(e) => selectUserRole(e)}
                    >
                        {roles.map((role, index) => (
                            <SelectOption
                                        selected={role.id === selectedRoleId}
                                        key={index}
                                        value={role.id}
                            >{role.name}
                            </SelectOption>)
                        )}
                    </Select>
                </ModalBody>

                <ModalFooter>
                    <Button color="#f44336" onClick={() => close()}>Close</Button>
                    <Button color="#008CBA" onClick={() => assign()}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
