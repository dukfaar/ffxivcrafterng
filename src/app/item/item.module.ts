import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { ItemSearchComponent } from './item-search.component'
import { ItemDataService } from './item-data.service'

import { SocketModule } from '../socket'
import { RestModule } from '../rest'

import { MaterialModule } from '../material/material.module'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SocketModule,
    RestModule
  ],
  declarations: [
    ItemSearchComponent
  ],
  providers: [
    ItemDataService
  ],
  exports: [
    ItemSearchComponent
  ]
})
export class ItemModule { }
