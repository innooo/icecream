import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Nav1 from './../components/nav1/containers/nav1CON';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Indexpage extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              {/* 顶部导航栏按钮 */}
              <Menu.Item key="1"><Link to="/nav1">nav 1</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/nav2">nav 2</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/nav3">nav 3</Link></Menu.Item>
            </Menu>
          </Header>
          <Route path="/nav1" component={Nav1}>{this.props.children}</Route>
          <Route path="/nav2" render={() => <div>nav2</div>} />
          <Route path="/nav3" render={() => <div>nav3</div>} />
        </Layout>
      </Router>
    );
  };
}