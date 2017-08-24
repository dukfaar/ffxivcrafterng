import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { MdDialogRef } from '@angular/material'

import { Item } from '../../item/item.type'

import * as _ from 'lodash'

class CartEntry {
  item: Item
  amount: number
  hq: boolean
}

@Component({
  selector: 'project-creation-dialog',
  templateUrl: 'project-creation-dialog.component.html'
})
export class ProjectCreationDialogComponent {
  selectedItem: Item
  numberOfItems: number
  projectName: string = 'New Project'

  cart: CartEntry[] = []

  constructor(private http: HttpClient, private dialogRef: MdDialogRef<ProjectCreationDialogComponent>) {
  }

  itemSelected(item: Item) {
    this.addToCart(item, 1)
  }

  addToCart(item, amount) {
    this.cart.push({item: item, amount: amount, hq: false})
  }

  deleteCartEntry(cartEntry: CartEntry, i) {
    _.pullAt(this.cart, [i])
  }

  createOrderFromCart() {
    let templateCart = _.map(this.cart,e => {return {item: e.item._id, amount: e.amount, hq: e.hq}})
    this.http.post('/api/project/fromTemplate', {template: JSON.stringify(templateCart), name: this.projectName})
    .subscribe(() => {
      this.dialogRef.close()
    })
  }
}
