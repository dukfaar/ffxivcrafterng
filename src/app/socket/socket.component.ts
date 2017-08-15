import { SocketService } from './socket.service'

import * as _ from 'lodash'

class EventCallback {
  constructor(public event:string, public callback:any) {}
}

export class SocketComponent {
  private events: EventCallback[] = []

  constructor(private socket: SocketService) {
  }

  public onSocket(event: string, callback: any) {
    let newEvent: EventCallback = new EventCallback(event, callback)
    this.events.push(newEvent)
    this.socket.on(newEvent.event, newEvent.callback)
  }

  ngOnDestroy() {
    _.each(this.events, e => this.socket.off(e.event, e.callback))
  }
}
