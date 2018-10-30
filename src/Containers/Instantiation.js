import React from 'react';
import {
  Icon, 
  Card, Row, Col,
  Input, Checkbox, Button
} from 'antd'

import { Switch, Route, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { Line } from 'react-chartjs-2';

const { Meta } = Card;

const Search = Input.Search

class Instantiation extends React.Component {
  state = {
    pollEndpoint: null,
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
    this.initializeCounters()
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.pollEndpoint !== this.state.pollEndpoint)
        this.initializeCounters()
  }

  componentWillUnmount() {
    clearInterval(this.state.pollIntervalId)
  }

  async initializeCounters() {
    if (this.state.pollIntervalId)
        clearInterval(this.state.pollIntervalId)

    if (this.state.pollEndpoint !== null) {
        await this.updateCounters()

        const intervalId = setInterval(this.updateCounters.bind(this), 5000)

        this.setState({
            pollIntervalId: intervalId
        })
    }
  }

  /*
    Andrew, please wrap the call to fetch MME, RBS, and EPG
    counters into a single call that returns three numeric values.

    Right now, they are stubbed out with random number generators.

    NOTE: The polling interval is 5s or 5000ms (see the 
    componentDidMount() method above).

    NOTE: I have allowed the user to manually enter the polling endpoint, in case it varies per
    instantiation and you can't uniformly hard code it. You can access this value in your
    function with `this.state.pollEndpoint`.

    NOTE: I have not made any sanity checks on the URI, I am only checking if it's empty or not,
    so please implement error handling on broken URLs as you see fit in the function 
    `pollEndpointSanityCheck = (value) => { return bool }` below.
  */
 fetchCounters = async () => {
    console.log(this.state.pollEndpoint)
    
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

  stringIsEmpty = (value) => !value.trim().length

  // Value is a string, you must return a bool, false if insane, true if sane (i.e. poll endpoint is valid).
  pollEndpointSanityCheck = (value) => {
    if (value === null) {
        return false
    } else if (this.stringIsEmpty(value)) {
        return false
    } // Add some more checks as else ifs here, as need be

    return true
  }

  onSearch = (value) => {
    if (this.pollEndpointSanityCheck(value))
        this.setState({ pollEndpoint: value })
  }

  render() {
    const { instantiation } = this.props

    return (
        <div>
            <div>
                <Button type="dashed">{instantiation.name}</Button>
            </div>
            <br />
            <Search
                placeholder="PoC limitation: please manually enter the monitoring endpoint to activate monitoring."
                enterButton="Activate Monitoring"
                size="large"
                onSearch={value => this.onSearch(value)}
            />
            {this.state.pollEndpoint !== null &&
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
            }
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    instantiation: state.instantiations.items.byId[ownProps.id || ownProps.match.params.id],
  }
}
  
export default connect(mapStateToProps)(Instantiation)