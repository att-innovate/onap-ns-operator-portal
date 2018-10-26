import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'

import { 
  Table, Divider, Tag,
  Menu, Dropdown, Button, Icon, message
} from 'antd';

import Service from '../../Containers/Service'

function handleButtonClick(e) {
  // message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  // message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    {/* <Menu.Item key="1"><Icon type="user" />Insantiate</Menu.Item> */}
    {/* <Menu.Item key="1"><Icon type="edit" theme="outlined" />Edit</Menu.Item> */}
    <Menu.Item key="1"><Icon type="close" theme="outlined" />Retire</Menu.Item>
  </Menu>
);

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: (text, record) => <Link to={`/dashboard/services/${record.id}`}>{text}</Link>
}, {
  title: 'Latency',
  dataIndex: 'latency',
  key: 'latency',
}, {
  title: 'Max Throughput',
  dataIndex: 'maxThroughput',
  key: 'maxThroughput',
}, {
  title: 'Max Bitrate',
  dataIndex: 'maxBitrate',
  key: 'maxBitrate',
}, /* {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
  ),
}, */ {
  title: 'Gtd Bitrate',
  dataIndex: 'gtdBitrate',
  key: 'gtdBitrate',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      {/* <Button type="primary">Instantiate</Button>
      <Button>Edit</Button>
      <Button type="danger">Retire</Button> */}
      <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
        Edit
      </Dropdown.Button>
    </span>
  ),
}];

const Services = (props) => {
  const data = props.services.items.allIds.map(id => ({
    key: id,
    ...props.services.items.byId[id],
    id
  }))

  return (
    <Switch>
      <Route exact path='/dashboard/services' component={() => <Table columns={columns} dataSource={data} />}/>
      <Route path='/dashboard/services/:id' component={Service}/>
    </Switch>
  )
}

const mapStateToProps = state => {
  return {
    services: state.services,
  }
}

export default connect(mapStateToProps)(Services)