import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactManagerComponent } from './fact-manager/fact-manager.component';
import { MaterialModule } from '../../material/material.module'
import { FormsModule } from '@angular/forms'

import { RouterModule, Routes } from '@angular/router'

const moduleRoutes: Routes = [
  { path: 'uselessfacts/index', component: FactManagerComponent },
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,

    RouterModule.forChild(moduleRoutes)
  ],
  declarations: [FactManagerComponent]
})
export class FactModule { }
