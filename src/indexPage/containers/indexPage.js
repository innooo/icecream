import React, { Component } from 'react';
import TabBar from './../../tabBar/tabBar'

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const tabBarProps = {
      initialSelectTab: 'homepage', // 默认选中的标签
      unselectedTintColor: "#949494", // 没有选中时的颜色
      tintColor: "#33A3F4", // 选中时的颜色
      barTintColor: "white", // bar的背景颜色
      renderTabBar: [
        {
          title: '首页',
          key: 'home',
          icon: () => (<span
              style={{fontFamily: 'iconfont', fontSize: '18px'}}
            >
              &#xe619;
          </span>),
          selectedIcon: () => (<span
            style={{fontFamily: 'iconfont', fontSize: '22px'}}
          >
            &#xe600;
          </span>),
          badge: '' // 标签右上角徽标
        },{
          title: '附近',
          key: 'near',
          icon: () => (<span
            style={{fontFamily: 'iconfont', fontSize: '20px'}}
          >
            &#xe60c;
          </span>),
          selectedIcon: () => (<span
            style={{fontFamily: 'iconfont', fontSize: '24px'}}
          >
            &#xe60f;
        </span>),
          badge: '' // 标签右上角徽标
        },{
          title: '发现',
          key: 'find',
          icon: () => (<span
            style={{fontFamily: 'iconfont', fontSize: '22px'}}
          >
            &#xe615;
          </span>),
          selectedIcon: () => (<span
            style={{fontFamily: 'iconfont', fontSize: '26px'}}
          >
            &#xe60d;
          </span>),
          badge: '' // 标签右上角徽标
        },{
          title: '订单',
          key: 'order',
          icon: () => (<span
            style={{fontFamily: 'iconfont', fontSize: '20px'}}
          >
            &#xe612;
          </span>),
          selectedIcon: () => (<span
            style={{fontFamily: 'iconfont', fontSize: '24px'}}
          >
            &#xe605;
          </span>),
          badge: '' // 标签右上角徽标
        },{
          title: '我的',
          key: 'self',
          icon: () => (<span
            style={{fontFamily: 'iconfont', fontSize: '18px'}}
          >
            &#xe61d;
          </span>),
          selectedIcon: () => (<span
            style={{fontFamily: 'iconfont', fontSize: '22px'}}
          >
            &#xe60b;
          </span>),
          badge: '' // 标签右上角徽标
        }
      ] // bar的每个item的配置内容
    }
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar {...tabBarProps}/>
      </div>
    );
  }
}