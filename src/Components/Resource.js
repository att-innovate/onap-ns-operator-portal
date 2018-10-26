import React from 'react'

export default (props) => (
  <div style={{ 
    textAlign: 'center', 
    marginTop: 15,
    borderWidth: '1px 1px 5px 1px',
    borderStyle: 'solid',
    borderColor: props.color || 'blue',
    borderRadius: '5px',
    padding: 10
  }}>
    <span style={{ fontSize: '1em' }}>{props.name}</span>
  </div>
) 