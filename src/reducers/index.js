import demoConfServices from '../demoConf/services.json'
import demoConfInstantiate from '../demoConf/instantiate.json'
import demoConfMonitor from '../demoConf/monitor.json'
import { combineReducers } from 'redux';
import { REQUEST_SERVICES, RECEIVE_SERVICES } from '../actions'

// const initialState = {
//   services: [],
// }

const services = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: {
      byId: {
        'cmtc': {
          name: 'Critical MTC',
          latency: '0.5 - 10 ms',
          maxThroughput: '1 Gbit/s',
          maxBitrate: '1 Gbit/s',
          gtdBitrate: '100 Mbit/s',
          description: "For critical applications such as industrial internet, smart grids, infrastructure protection, remote surgery and intelligent transportation systems.",
          // FIXME: rendering code is coupled to the 4 different locations.
          // FIXME: resources should be there own enetity, and we should use a join
          resources: {
            customerSite: ['vRan'],
            edgeDC: ['vEPG', 'vAPP'],
            nationalDC: ['vHSS', 'vMME']
          }
        },
        'mmtc': {
          name: 'Massive MTC',
          latency: '0.5 - 10 ms',
          maxThroughput: '1 Gbit/s',
          maxBitrate: '1 Gbit/s',
          gtdBitrate: '100 Mbit/s',
          description: 'For IoT use cases with tens of billions of connected devices and sensors.',
          resources: {
            customerSite: ['vRan'],
            regionalDC: ['vEPG'],
            nationalDC: ['vHSS', 'vMME', 'vAPP']
          }
        },
        'embb': {
          name: 'Enterprise MBB',
          latency: '0.5 - 10 ms',
          maxThroughput: '1 Gbit/s',
          maxBitrate: '1 Gbit/s',
          gtdBitrate: '100 Mbit/s',
          description: 'Extended support of conventional MBB through improved peak/average/cell-edge data rates, capacity and coverage.',
          resources: {
            regionalDC: ['vRAN', 'vEPG', 'vAPP'],
            nationalDC: ['vHSS', 'vMME']
          }
        }
      },
      allIds: ['cmtc', 'mmtc', 'embb']
    }
  },
  action
) => {
  switch (action.type) {
    case REQUEST_SERVICES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_SERVICES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.services,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const templates = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: {
      byId: {
        'frc': {
          name: "Factory Robotics Control",
          description: "Controlling and managing factory robotics using on-site radio access and network functions to minimize latency, and locally running applications.",
          serviceId: "cmtc"
        },
        'vtx': {
          name: "Vehicle-to-X",
          description: "Intra- and Inter-vehicle communications for entertainment, information and other non-critical functions.",
          serviceId: "cmtc"
        },
        'ac': {
          name: "Autonomous Control",
          description: "Low-latency control communications between autonomous agents and central applications.",
          serviceId: "cmtc"
        },
        'rh': {
          name: "Remote Healthcare",
          description: "Specifically designed to support the requirements of remote healthcare applications, for example, time-critical video and monitoring.",
          serviceId: "cmtc"
        },
        'rm': {
          name: "Remote Mining",
          description: "Control and management applications for typically remote mining scenarios.",
          serviceId: "cmtc"
        },
        'sm': {
          name: "Smart Metering",
          description: "Massive terminal numbers, non-time-critical, consumer device reading applications.",
          serviceId: "mmtc"
        },
        'lvs': {
          name: "Live Video Streaming",
          description: "Providing continuous, low-jitter video traffic for near-real-time video applications.",
          serviceId: "embb"
        },
      },
      allIds: ['frc', 'vtx', 'ac', 'rh', 'rm', 'sm', 'lvs']
    }
  },
  action
) => {
  switch (action.type) {
    default: 
      return state
  }
}

const rootReducer = combineReducers({
  services,
  templates
})

export default rootReducer