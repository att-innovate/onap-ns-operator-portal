import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'

import { Collapse, Card, Col, Row } from 'antd'

import Template from '../../Containers/Template'

const Panel = Collapse.Panel

const { Meta } = Card;

const Templates = (props) => {  
  const { services, templates } = props

  return (
    <Collapse bordered={false} defaultActiveKey={props.services.items.allIds}>
      {services.items.allIds.map(serviceId => {
        const service = services.items.byId[serviceId]

        const rows = []

        for (let i = 0; i < templates.items.allIds.length; i += 3) {
          const lower = i
          const upper = Math.min(i + 3, templates.items.allIds.length)

          rows.push(
            <Row gutter={16} key={i}>
              {templates.items.allIds.slice(lower, upper).map(templateId => {
                const template = templates.items.byId[templateId]

                if (serviceId === template.serviceId) {
                  return (
                    <Col span={8} style={{ paddingTop: 10, paddingBottom: 10 }} key={templateId}>
                      <Link to={`/dashboard/instantiate/${templateId}`}>
                        <Card
                          hoverable
                          // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                          <Meta
                            title={template.name}
                            description={template.description}
                          />
                        </Card>
                      </Link>
                    </Col>
                  )
                }
              })}
            </Row>
          )
        }

        return (
          <Panel header={<span style={{fontSize: '1.5em'}}>{service.name}</span>} key={serviceId}>
            {rows}
          </Panel>
        )
      })}
    </Collapse>
  )
}

const Routes = (props) => (
  <Switch>
    <Route exact path='/dashboard/instantiate' component={() => <Templates {...props} />}/>
    <Route path='/dashboard/instantiate/:id' component={Template} />
  </Switch>
)

const mapStateToProps = state => {
  return {
    services: state.services,
    templates: state.templates
  }
}

export default connect(mapStateToProps)(Routes)