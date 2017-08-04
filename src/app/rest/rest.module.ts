import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RestService } from './rest.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    RestService
  ]
})
export class RestModule { }
