import { NgModule } from '@angular/core'

import { FlexLayoutModule } from '@angular/flex-layout'

import {
  MdCardModule,
  MdSidenavModule,
  MdButtonModule,
  MdMenuModule,
  MdTooltipModule,
  MdToolbarModule,
  MdIconModule,
  MdGridListModule,
  MdInputModule,
  MdPaginatorModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdDialogModule
} from '@angular/material'

const modulesToExport = [
  MdCardModule,
  MdSidenavModule,
  MdButtonModule,
  MdMenuModule,
  MdTooltipModule,
  MdIconModule,
  MdGridListModule,
  FlexLayoutModule,
  MdToolbarModule,
  MdInputModule,
  MdPaginatorModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdDialogModule
]

@NgModule({
  imports: modulesToExport,
  exports: modulesToExport
})
export class MaterialModule {}
