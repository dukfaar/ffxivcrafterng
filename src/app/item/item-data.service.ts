import { Injectable } from '@angular/core'

import { Item } from './item.type'

import { SocketService } from '../socket'
import { RestService, RestResource } from '../rest'

import { DataService } from '../data/data.service'

@Injectable()
export class ItemDataService extends DataService<Item> {
  constructor(private rest: RestService, private socket: SocketService) {
    super(rest.createResource('/api/item'))

    socket.on('price data changed',result => { this.replace(result.item._id, result.item) })
    socket.on('item data changed',result => { this.replace(result.item._id, result.item) })
  }
}
