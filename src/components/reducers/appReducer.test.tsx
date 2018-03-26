import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { appReducer } from './appReducer';
import { AppActions } from '../actions';
import { Db } from '../common';

Enzyme.configure({ adapter: new Adapter() });

describe('appReducer test', () => {
    const initialState = { users: Db.users };
    let store = configureStore();

    beforeEach(() => {
        store = store(initialState);
    });

    it('updateUserMapping test', () => {
        const mapping = {projectId: 1, roleId: 1};
        store.dispatch(AppActions.updateUserMapping(1, mapping));
        const action = store.getActions();
        expect(action[0].type).toBe(AppActions.UPDATE_USER_MAPPING);
        expect(action[0].payload).toEqual({userId: 1, mapping});
    });
});
