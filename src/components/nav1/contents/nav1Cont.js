import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Indexpage extends Component {
  render() {
    return (
      <Layout>
        {/* nav1 侧边栏按钮 */}
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" title={<span><Icon type="user" />动画</span>}>
              <Menu.Item key="1"><Link to="animation_show">动画演示</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/animation_eg">动画实例</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />表格</span>}>
              <Menu.Item key="5"><Link to="/forms_base">基础表格</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/forms_pro">高级表格</Link></Menu.Item>
              <Menu.Item key="7"><Link to="/forms_async">异步表格</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/forms_eg">表格实例</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="notification" />图表</span>}>
              <Menu.Item key="9"><Link to="/charts_show">图表演示</Link></Menu.Item>
              <Menu.Item key="10"><Link to="/charts_eg">图表实例</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            Content
          </Content>
        </Layout>
      </Layout>
    );
  };
}