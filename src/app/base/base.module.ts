import { NgModule } from '@angular/core'

import { NewsCardComponent } from './news/news-card.component'
import { SidenavContentComponent } from './sidenav/sidenav-content.component'
import { TextFormatter } from './text-formatter/text-formatter.pipe'

import { MaterialModule } from '../material/material.module'

@NgModule({
  declarations: [
    //Components
    NewsCardComponent,
    SidenavContentComponent,

    //Pipes
    TextFormatter
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    NewsCardComponent,
    SidenavContentComponent
  ],
  providers: []
})
export class BaseModule {}
