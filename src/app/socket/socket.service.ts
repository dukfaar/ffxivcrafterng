import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'

@Injectable()
export class SocketService {
  private socket = io('https://' + window.location.hostname + ':3001')

  constructor() {
    this.socket.on('connect', this.connectionHandler)
    this.socket.on('disconnect', this.disconnectionHandler)
  }

  on(event: string, callback) {
    this.socket.on(event, callback)
  }

  off(event: string, callback) {
    this.socket.removeListener(event, callback)
  }

  connectionHandler() {
    console.log('connected to websocket')
  }

  disconnectionHandler() {
    console.log('disconnected from websocket')
  }
}
