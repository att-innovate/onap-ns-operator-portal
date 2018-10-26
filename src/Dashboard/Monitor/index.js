import React from 'react';
import {Line} from 'react-chartjs-2';
import { Row, Col } from 'antd'

export default class Monitor extends React.Component {
  state = {
    pollIntervalId: null,
    mmeData: {
      labels: [],
      datasets: [
        {
          label: 'QCI',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    },
    rbsData: {
      labels: [],
      datasets: [
        {
          label: 'QCI',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    },
    epgData: {
      labels: [],
      datasets: [
        {
          label: 'QCI',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    }
  }

  async componentDidMount() {
    await this.updateCounters()

    const intervalId = setInterval(this.updateCounters.bind(this), 5000)

    this.setState({
      pollIntervalId: intervalId
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.pollIntervalId)
  }

  /*
    Andrew, please wrap the call to fetch MME, RBS, and EPG
    counters into a single call that returns three numeric values.

    Right now, they are stubbed out with random number generators.

    NOTE: The polling interval is 5s or 5000ms (see the 
    componentDidMount() method above).
  */
 fetchCounters = async () => {
    return {
      mme: Math.floor(Math.random() * Math.floor(10)),
      rbs: Math.floor(Math.random() * Math.floor(10)),
      epg: Math.floor(Math.random() * Math.floor(10)),
    }
  }

  async updateCounters() {
    const { 
      mme: mmeCounter, rbs: rbsCounter, epg: epgCounter 
    } = await this.fetchCounters()

    const oldMmeDataSet = this.state.mmeData.datasets[0]
    const newMmeDataSet = { ...oldMmeDataSet }

    newMmeDataSet.data.push(mmeCounter)

    const newMmeData = {
      ...this.state.mmeData,
      datasets: [newMmeDataSet],
      labels: this.state.mmeData.labels.concat(
        new Date().toLocaleTimeString()
      )
    }

    const oldRbsDataSet = this.state.rbsData.datasets[0]
    const newRbsDataSet = { ...oldRbsDataSet }

    newRbsDataSet.data.push(rbsCounter)

    const newRbsData = {
      ...this.state.rbsData,
      datasets: [newRbsDataSet],
      labels: this.state.rbsData.labels.concat(
        new Date().toLocaleTimeString()
      )
    }

    const oldEpgDataSet = this.state.epgData.datasets[0]
    const newEpgDataSet = { ...oldEpgDataSet }

    newEpgDataSet.data.push(epgCounter)

    const newEpgData = {
      ...this.state.epgData,
      datasets: [newEpgDataSet],
      labels: this.state.epgData.labels.concat(
        new Date().toLocaleTimeString()
      )
    }

    this.setState({ 
      mmeData: newMmeData,
      rbsData: newRbsData,
      epgData: newEpgData,
    });
  }

  render() {
    return (
      <Row gutter={16}>
        <Col style={{ marginTop: 35 }} sm={24} md={12}>
          <h2>MME</h2>
          <Line data={this.state.mmeData} />
        </Col>
        <Col style={{ marginTop: 35 }} sm={24} md={12}>
          <h2>RBS</h2>
          <Line data={this.state.rbsData} />
        </Col>
        <Col style={{ marginTop: 35 }} sm={24} md={12}>
          <h2>EPG</h2>
          <Line data={this.state.epgData} />
        </Col>
      </Row>
    );
  }
}