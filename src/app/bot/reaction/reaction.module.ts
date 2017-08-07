import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactionManagerComponent } from './reaction-manager/reaction-manager.component';
import { MaterialModule } from '../../material/material.module'
import { FormsModule } from '@angular/forms'

import { RouterModule, Routes } from '@angular/router'

const moduleRoutes: Routes = [
  { path: 'botreaction/index', component: ReactionManagerComponent },
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    
    RouterModule.forChild(moduleRoutes)
  ],
  declarations: [ReactionManagerComponent]
})
export class ReactionModule { }
