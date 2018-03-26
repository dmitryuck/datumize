import React from 'react';
import { Tab } from '../../common';
import { TabsContainer, TabNavigation, TabNavElement, TabContentContainer, TabContent } from './TabStyled';

interface State {
    activeTab: number;
}

interface Props {
    tabs: Tab[];
}

export class Tabs extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            activeTab: 0
        };
    }

    setActiveTab = (index) => {
        this.setState({activeTab: index});
    }

    drawNavigation = () => {
        const { tabs } = this.props;
        const { activeTab } = this.state;
        return tabs.map((tab, tabIndex) => (
            <TabNavElement
                            key={tabIndex}
                            active={activeTab === tabIndex}
                            onClick={this.setActiveTab.bind(this, tabIndex)}
            >{tab.name}
            </TabNavElement>
        ));
    }

    drawContent = () => {
        const { tabs } = this.props;
        const { activeTab } = this.state;
        return tabs.map((tab, tabIndex) => (
            (tabIndex === activeTab) && <TabContent key={tabIndex}>{tab.content}</TabContent>
        ));
    }

    render() {
        return (
            <TabsContainer>
                <TabNavigation>{this.drawNavigation()}</TabNavigation>
                <TabContentContainer>{this.drawContent()}</TabContentContainer>
            </TabsContainer>
        );
    }
}
