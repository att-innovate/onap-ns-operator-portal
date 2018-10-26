// import fetch from 'cross-fetch'
import base64 from 'base-64'

export const REQUEST_SERVICES = 'REQUEST_SERVICES'
const requestServices = () => ({
  type: REQUEST_SERVICES
})

export const RECEIVE_SERVICES = 'RECEIVE_SERVICES'
const receiveServices = (json) => ({
  type: RECEIVE_SERVICES,
  services: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

export const fetchServices = () => {
  return dispatch => {
    dispatch(requestServices())

    // const request = new Request(`https://www.w3schools.com/xml/cd_catalog.xml`, {
    //   headers: new Headers({
    //     'Accept': 'application/xml',
    //     // 'Content-Type': 'application/json',
    //     'Authorization': 'Basic ' + base64.encode('VID' + ":" + 'VID'),
    //     'X-TransactionId': 'AFR',
    //     'X-FromAppId': 'AFR'
    //   }),
    //   mode: 'no-cors'
    // })

    // console.log(request)

    // return fetch(request).then((results) => {
    //   results
    //     .text()
    //     .then(( str ) => {
    //       console.log(str)
    //       let responseDoc = new DOMParser().parseFromString(str, 'application/xml')
    //       console.log(responseDoc)
    //     })
    //     .then(() => ({}))
    // })

    https://www.w3schools.com/xml/cd_catalog.xml

    return fetch("https://131.160.203.59:8080/aai/v13/service-design-and-creation/models?model-type=service", { 
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/xml',
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'Access-Control-Allow-Headers': 'Content-Type',  
      }),
      mode: 'no-cors'
    })
    .then(response => {
      console.log(response)
      console.log(response.text())
      return response.text()
    })
    .then(xml => {
      console.log("xml", xml)
    })

    // return fetch(request)
    //   .then(response => console.log(response))
    //   // .then(response => response.text())
    //   // .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    //   // .then(data => console.log(data))
    //   // .then(response => response.json())
    //   // .then(json => dispatch(receiveServices(json)))
  }
}

