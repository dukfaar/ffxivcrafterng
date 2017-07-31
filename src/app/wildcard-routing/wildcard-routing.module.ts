import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PageNotFoundComponent } from './page-not-found.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    RouterModule
  ]
})
export class WildcardRoutingModule {

}
