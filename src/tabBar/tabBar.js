import React from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { TabBar, Icon } from 'antd-mobile';
import './tabBar.less';

export default class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: props.initialSelectTab,
      hidden: false,
    };
  }

  render() {
    const me = this;
    const {
      unselectedTintColor,
      tintColor,
      barTintColor,
      renderTabBar
    } = this.props;
    let { hidden } = this.state;
    // 渲染tabBar 列表
    const TabBarItem = renderTabBar.map((item, index) => {
      return <TabBar.Item
        title={item.title}
        key={item.key}
        icon={item.icon()}
        selectedIcon={item.selectedIcon()}
        selected={me.state.selectedTab === item.key}
        badge={ item.badge }
        onPress={() => {
          window.history.pushState('path', '/' + item.key);
          me.setState({
            selectedTab: item.key,
          });
        }}
        data-seed="logId"
      >
        {me.props.children}
      </TabBar.Item>
    });
    return (
      <Router>
        <TabBar
          unselectedTintColor={ unselectedTintColor }
          tintColor={ tintColor }
          barTintColor={ barTintColor }
          hidden={ hidden }
        >
          { TabBarItem }
        </TabBar>
      </Router>
    );
  }
};