import React from 'react';
import {
  Icon, 
  Card, Row, Col,
  Checkbox
} from 'antd'

import { Switch, Route, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { Line } from 'react-chartjs-2';

import Instantiation from '../../Containers/Instantiation'

const { Meta } = Card;

const Instantiations = (props) => {
  const { instantiations, templates } = props

  const rows = []

  for (let i = 0; i < instantiations.items.allIds.length; i+=3) {
    const lower = i
    const upper = Math.min(i + 3, instantiations.items.allIds.length)

    rows.push(
      <Row gutter={16} key={i}>
        {instantiations.items.allIds.slice(lower, upper).map(instantiationId => {
          const instantiation = instantiations.items.byId[instantiationId]
          const template = templates.items.byId[instantiation.templateId]

            return (
              <Col span={8} style={{ paddingTop: 10, paddingBottom: 10 }} key={instantiationId}>
                <Link to={`/dashboard/monitor/${instantiationId}`}>
                  <Card
                    hoverable
                    // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <Meta
                      title={
                        <div style={{ display: 'flex' }}>
                          <div style={{ flex: 1, alignSelf: 'flex-start' }}>
                            {instantiation.name}
                          </div>
                          <div style={{ flex: 1, alignSelf: 'flex-end', textAlign: 'right' }}>
                            {instantiation.active 
                              ? <Icon type="check-circle" theme="outlined" theme="twoTone" twoToneColor="#52c41a" />
                              : <Icon type="close-circle" theme="outlined" theme="twoTone" twoToneColor="#e03b38"/>}
                          </div>
                        </div>
                      }
                      description={
                        <div>
                          <span>{template.description}</span>
                          <br />
                          <br />
                          <span><b>Use Case:</b></span> <span>{template.name}</span>
                          <br />
                          <span><b>Latency:</b></span> <span>{instantiation.latencyVal} {instantiation.latencyUnits}</span>
                          <br />
                          <span><b>Throughput:</b></span> <span>{instantiation.throughputVal} {instantiation.throughputUnits}</span>
                          <br />
                          <span><b>Availability:</b></span> <span>{instantiation.availability}</span>
                          <br />
                          <span><b>Shared:</b>&nbsp;&nbsp;<Checkbox checked={instantiation.shared} disabled={true} /></span>
                          <br />
                          <span><b>Number of Devices:</b></span> <span>{instantiation.numberOfDevices}</span>
                        </div>
                      }
                    />
                  </Card>
                </Link>
              </Col>
            )
        })}
      </Row>
    )
  }

  return (
    <div>
      {rows}
    </div>
  )
}

const Routes = (props) => (
  <Switch>
    <Route exact path='/dashboard/monitor' component={() => <Instantiations {...props} />}/>
    <Route path='/dashboard/monitor/:id' component={Instantiation} />
  </Switch>
)

const mapStateToProps = state => {
  return {
    templates: state.templates,
    instantiations: state.instantiations,
  }
}

export default connect(mapStateToProps)(Routes)