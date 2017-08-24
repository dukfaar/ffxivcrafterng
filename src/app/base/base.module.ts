import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SidenavContentComponent } from './sidenav/sidenav-content.component'
import { SidenavMenuComponent } from './sidenav/sidenav-menu.component'
import { TextFormatter } from './text-formatter/text-formatter.pipe'
import { MenuLinkPipe } from './sidenav/menulink.pipe'

import { MaterialModule } from '../material/material.module'

import { RouterModule, Routes } from '@angular/router'

const moduleRoutes: Routes = [
]

@NgModule({
  declarations: [
    //Components
    SidenavContentComponent,
    SidenavMenuComponent,

    //Pipes
    TextFormatter,
    MenuLinkPipe,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule.forChild(moduleRoutes)
  ],
  exports: [
    SidenavContentComponent,

    TextFormatter,
    MenuLinkPipe
  ],
  providers: [
  ]
})
export class BaseModule {}
