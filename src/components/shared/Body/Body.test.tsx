import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../reducers';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Body, Props } from './Body';
import { Button } from './BodyStyled';
import { AppState, Db } from '../../common';

Enzyme.configure({ adapter: new Adapter() });

const initialState = {
};

interface State {
}

let BodyComponent: ShallowWrapper<Props, State>;
let BodyInstance: any;
const store = createStore(rootReducer, {});

const appState: AppState = {
    users: Db.users,
    roles: Db.roles,
    projects: Db.projects
};

describe('Body', () => {
    beforeEach(() => {
        BodyComponent = shallow(
                <Body store={store} app={appState} />
        );
        BodyInstance = BodyComponent.instance();
    });

    it('Body should render', () => {
        expect(BodyComponent).toHaveLength(1);
    });
});
