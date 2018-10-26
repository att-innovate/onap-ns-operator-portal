import React from 'react'
import { connect } from 'react-redux'

import { Card, Row, Col } from 'antd';

import Location from '../Components/Location'
import Resource from '../Components/Resource'

const gridStyle = {
  width: '20%',
  textAlign: 'center',
};

const StatCell = (props) => (
  <div>
    <span style={{ color: "lightgrey" }}>{props.title}</span>
    <br />
    <span>{props.value}</span>
  </div>
)

const Service = (props) => {
  const { service } = props

  return (
    <div>
      <Card>
        <Card.Grid style={gridStyle}>
          <StatCell title={"Name"} value={service.name} />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <StatCell title={"Latency"} value={service.latency} />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <StatCell title={"Mac Throughput"} value={service.maxThroughput} />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <StatCell title={"Max Bitrate"} value={service.maxBitrate} />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <StatCell title={"GTD Bitrate"} value={service.gtdBitrate} />
        </Card.Grid>
      </Card>
      <br />
      <span>
        {service.description}
      </span>
      <Row style={{marginTop: 10 }} gutter={16}>
        <Location 
          name="Customer Site" 
          color="grey"
          latency="0.5 - 20 ms"
          resources={service.resources.customerSite} 
        />
        <Location 
          name="Edge DC" 
          color="orange"
          latency="20 - 100 ms"
          resources={service.resources.edgeDC} 
        />
        <Location 
          name="Regional DC" 
          color="blue"
          latency="100 - 500 ms"
          resources={service.resources.regionalDC} 
        />
        <Location 
          name="National DC" 
          color="purple"
          latency="500 ms - 1 s"
          resources={service.resources.nationalDC} 
        />
      </Row>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    service: state.services.items.byId[ownProps.id || ownProps.match.params.id],
  }
}

export default connect(mapStateToProps)(Service)