import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { ItemSearchComponent } from './item-search.component'

import { MaterialModule } from '../material/material.module'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    ItemSearchComponent
  ],
  exports: [
    ItemSearchComponent
  ]
})
export class ItemModule { }
