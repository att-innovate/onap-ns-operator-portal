// src/App.js
import React, { Component } from 'react';
import { Button } from 'antd';
import Dashboard from './Dashboard'

class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex', height: '100vh', background: 'black' }}>
        <Dashboard style={{ flex: 1 }} />
      </div>
    );
  }
}

export default App;