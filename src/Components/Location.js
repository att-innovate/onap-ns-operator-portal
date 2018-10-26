import React from 'react'
import { Col } from 'antd'

import Resource from './Resource'

export default (props) => (
  <Col xs={24} md={12} lg={6}>
    <div style={{ 
      textAlign: 'center', 
      marginTop: 15,
      borderWidth: '1px 1px 5px 1px',
      borderStyle: 'solid',
      borderColor: props.color,
      borderRadius: '5px',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 25,
      paddingRight: 25
    }}>
      <span style={{ fontSize: '1.25em' }}>{props.name}</span>
      <br />
      <span style={{ fontSize: '0.85em', fontColor: 'lightgrey' }}>Latency {props.latency}</span>
      <br />
      {props.resources && props.resources.map((elem, idx) => (
        <Resource key={idx} name={elem} />
      ))}
    </div>
  </Col>
) 