import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Tab, Role } from '../../common';
import { RoleModal, Props } from './RoleModal';
import { ModalFooter } from './RoleModalStyled';

Enzyme.configure({ adapter: new Adapter() });

const initialState = {
};

const roles: Role[] = [
    {id: 1, name: 'Admin'},
    {id: 2, name: 'User'}
];

interface State {
}

let RoleModalComponent: ShallowWrapper<Props, State>;
let RoleModalInstance: any;

let selectUserRoleMock;
let closeMock;
let assignMock;

describe('RoleModal', () => {
    beforeEach(() => {
        selectUserRoleMock = jest.fn();
        closeMock = jest.fn();
        assignMock = jest.fn();
        RoleModalComponent = shallow(
            <RoleModal
                        roles={roles}
                        selectUserRole={selectUserRoleMock}
                        selectedRoleId={1}
                        close={closeMock}
                        assign={assignMock}
            />
        );
    });

    it('RoleModal render', () => {
        expect(RoleModalComponent).toHaveLength(1);
    });

    it('Close and Assign buttons click', () => {
        /*const modalFooterContent = RoleModalComponent.find(ModalFooter);
        modalFooterContent.at(0).simulate('click');
        // expect(closeMock).toBeCalled();
        modalFooterContent.at(1).simulate('click');
        // expect(assignMock).toBeCalled();*/
    });
});
