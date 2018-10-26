import React from 'react'
import { connect } from 'react-redux'

import { 
  Tabs,
  Button,
  Form, Input, Select, Slider, DatePicker, Checkbox, InputNumber
 } from 'antd'

import Service from './Service'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

const Template = (props) => {
  const { template, service } = props

  const formItemLayout = {
    labelCol: {
      xs: { span: 20 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div>
      <div>
        <Button type="dashed">{template.name}</Button>
      </div>
      <br />
      <Tabs type={"card"} defaultActiveKey="1">
        <TabPane tab="Customer Requirements" key="1" style={{ padding: 20 }}>
          <FormItem
            // {...formItemLayout}
            label="Company Name"
          >
            <Input placeholder="Company X" />
          </FormItem>
          <FormItem
            // {...formItemLayout}
            label={"Use Case"}
          >
            <Input disabled value={template.name} />
          </FormItem>
          <FormItem
            // {...formItemLayout}
            label={"Traffic Type"}
          >
            <Select defaultValue="alltypes" style={{ width: 120 }}>
              <Option value="continuous">Continuous</Option>
              <Option value="bursty">Bursty</Option>
              <Option value="eventdriven">Event Driven</Option>
              <Option value="periodic">Periodic</Option>
              <Option value="alltypes">All Types</Option>
            </Select>
          </FormItem>
          <FormItem
            // {...formItemLayout}
            label={"Latency"}
          >
            <Slider
              min={5}
              max={10}
              defaultValue={7} 
              marks={{
                // 5: '5 ms',
                10: '10 ms'
              }}
            />
          </FormItem>
          <FormItem
            // {...formItemLayout}
            label={"Throughput"}
          >
            <Slider
              min={0}
              max={100}
              defaultValue={50} 
              marks={{
                // 0: '0 Mbps',
                100: '1 Gbps'
              }}
            />
          </FormItem>
          <FormItem
            // {...formItemLayout}
            label={"Availability"}
          >
            <Select defaultValue="99.99" style={{ width: 120 }}>
              <Option value="95">95</Option>
              <Option value="96">96</Option>
              <Option value="97">97</Option>
              <Option value="98">98</Option>
              <Option value="99">99</Option>
              <Option value="96">99.9</Option>
              <Option value="96">99.99</Option>
              <Option value="96">99.999</Option>
            </Select>
          </FormItem>
          <FormItem
            // {...formItemLayout}
            label={"Activation Interval"}
          >
            <RangePicker />
          </FormItem>
          <FormItem
            // {...formItemLayout}
            label={"Shared"}
          >
            <Checkbox />
          </FormItem>
          <FormItem
            // {...formItemLayout}
            label={"# of devices"}
          >
            <InputNumber min={1} defaultValue={1} />
          </FormItem>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Button style={{ width: '25%', maxWidth: 250 }} type="primary">Instantiate</Button>
          </div>
        </TabPane>
        <TabPane tab={`Service Design (${service.name})`} key="2">
          <Service id={template.serviceId} />
        </TabPane>
      </Tabs>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const template = state.templates.items.byId[ownProps.match.params.id]

  return {
    template,
    service: state.services.items.byId[template.serviceId],
  }
}

export default connect(mapStateToProps)(Template)