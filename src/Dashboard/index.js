import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Layout, Menu, Icon } from 'antd';

import './index.css'

import Services from './Services'
import Instantiate from './Instantiate'
import Monitor from './Monitor'

const { Header, Sider, Content } = Layout;

class Dashboard extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
            <Menu.Item key="1">
              <Link to='/dashboard/services'>
                <Icon type="table" />
                <span>Service Designs</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/dashboard/instantiate'>
                <Icon type="plus-square" />
                <span>Instantiate</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/dashboard/monitor'>
                <Icon type="line-chart" />
                <span>Monitor & Manage</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          {/* TODO: Fix this overflow on the content card! */}
          <Content style={{ padding: 24, overflowY: 'scroll', background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route exact path='/dashboard' component={() => "Please select a tab from the side menu."}/>
              <Route path='/dashboard/services' component={Services}/>
              <Route path='/dashboard/instantiate' component={Instantiate}/>
              <Route path='/dashboard/monitor' component={Monitor}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard