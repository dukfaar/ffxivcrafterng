import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GalleryComponent } from './gallery/gallery.component'

import { MaterialModule } from '../material/material.module'

import { RouterModule, Routes } from '@angular/router'

const moduleRoutes: Routes = [
  { path: 'gallery/index', component: GalleryComponent },
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    RouterModule.forChild(moduleRoutes)
  ],
  declarations: [GalleryComponent]
})
export class GalleryModule { }
