export default {
  connect () {
    return new Promise((res) => {
      let ws = new WebSocket('ws:\\localhost:8081')
      ws.onopen = (ms) => {
          let WS = {}
          ws.onmessage = (ms) => {
            let data = JSON.parse(ms.data)
            WS.onmessage && WS.onmessage(data)
          }
          WS.send = (data) => {
            let wsData = JSON.stringify(data)
            ws.send(wsData)
          }
          res(WS)
      }
    })
  }
}