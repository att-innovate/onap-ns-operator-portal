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

const timeout = ms => new Promise(res => setTimeout(res, ms))

const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

class Template extends React.Component {
  state = {
    submitting: false
  }

  /*
    Andrew: implement the instantiation POST to your back-end here, by replacing the
    `await timemout(5000) line. Be sure to still use the `await fetch ...` syntax, 
    so that the rest of the code can wait for your async call to complete.

    NOTE: the templateIds you will get will be either `demo1` or `demo2`, map to your

    NOTE: if you think it's important, implement error handling by CHAINING a global
    alert() function (a bit hacky, but good enough for now) to the `async fetch ...`.
    
    NOTE: iff you do implement error handling, be sure that the 
    `this.setState({ submitting })` is ALWAYS run, whether submission is successful 
    or not.

    NOTE: please see the README on how the whole flow shakes down, because of the current
    integration limitations, there is a very particular way one must interact with the
    front-end to orchestrate the back-end.
  */
  submitInstatiationRequest = async (templateId) => {
    console.log(templateId)

    await timeout(5000)

    this.setState({ submitting: false })
  }

  onClickInstantiate = async (templateId) => {
    if (this.state.submitting)
      return

    this.setState({ submitting: true }, this.submitInstatiationRequest.bind(this, templateId))
  }

  componentWillUnmount() {
    
  }

  render() {
    const { template, service } = this.props
    template.id = this.props.match.params.id

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
                <Option value="99.9">99.9</Option>
                <Option value="99.99">99.99</Option>
                <Option value="99.999">99.999</Option>
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
            {(!template.isDummy) &&
              <div style={{ width: '100%', textAlign: 'center' }}>
                {(this.state.submitting)
                  ? <Button type="primary" shape="circle" loading />
                  : <Button style={{ width: '25%', maxWidth: 250 }} type="primary" onClick={() => this.onClickInstantiate(template.id)}>Instantiate</Button>
                }
              </div>
            }
          </TabPane>
          <TabPane tab={`Service Design (${service.name})`} key="2">
            <Service id={template.serviceId} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const template = state.templates.items.byId[ownProps.match.params.id]

  return {
    template,
    service: state.services.items.byId[template.serviceId],
  }
}

export default connect(mapStateToProps)(Template)