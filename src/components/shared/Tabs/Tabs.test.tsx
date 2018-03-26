import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Tabs } from './Tabs';
import { Tab } from '../../common';
import { TabContentContainer, TabNavElement } from './TabStyled';

Enzyme.configure({ adapter: new Adapter() });

const tabsArray: Tab[] = [
    {id: 1, name: 'Tab 1', content: 'Content 1'},
    {id: 2, name: 'Tab 2', content: 'Content 2'},
    {id: 3, name: 'Tab 3', content: 'Content 3'}
];

const tabsInitialState = {
    activeTab: 0
};

interface Props {
    tabs: Tab[];
}

interface State {
    activeTab: number;
}

let TabsComponent: ShallowWrapper<Props, State>;
let TabsInstance: any;

describe('Tabs', () => {
    beforeEach(() => {
        TabsComponent = shallow(<Tabs tabs={tabsArray}/>);
        TabsInstance = TabsComponent.instance() as Tabs;
    });

    it('Tabs render', () => {
        expect(TabsComponent).toHaveLength(1);
    });

    it('Tabs initial state', () => {
        const state = TabsComponent.state();
        expect(state).toEqual(tabsInitialState);
    });

    it('Change active tab by setActiveTab call', () => {
        TabsInstance.setActiveTab(1);
        const state = TabsComponent.state();
        expect(state.activeTab).toEqual(1);
    });

    it('Content should be changed', () => {
        const tabContent1 = TabsComponent.find(TabContentContainer);
        expect(tabContent1.html().includes(tabsArray[0].content)).toBeTruthy();
        TabsInstance.setActiveTab(1);
        TabsComponent.update();
        const tabContent2 = TabsComponent.find(TabContentContainer);
        expect(tabContent2.html().includes(tabsArray[1].content)).toBeTruthy();
    });

    it('Tab should be changed after click', () => {
        const tabNavElements = TabsComponent.find(TabNavElement);
        const secondTab = tabNavElements.at(1).simulate('click');
        TabsComponent.update();
        const tabContent2 = TabsComponent.find(TabContentContainer);
        expect(tabContent2.html().includes(tabsArray[1].content)).toBeTruthy();
    });
});
