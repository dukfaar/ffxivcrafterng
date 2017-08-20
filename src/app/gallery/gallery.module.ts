import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GalleryComponent } from './gallery.component'

import { MaterialModule } from '../material/material.module'

import { RouterModule, Routes } from '@angular/router'

import { FileUploadModule } from 'ng2-file-upload'

import { ImageDetailDialogComponent } from './image-detail-dialog.component'

const moduleRoutes: Routes = [
  { path: 'gallery/index', component: GalleryComponent },
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FileUploadModule,

    RouterModule.forChild(moduleRoutes)
  ],
  entryComponents: [ImageDetailDialogComponent],
  declarations: [GalleryComponent, ImageDetailDialogComponent]
})
export class GalleryModule { }
