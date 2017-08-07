import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactModule } from './fact/fact.module'
import { ReactionModule } from './reaction/reaction.module'

@NgModule({
  imports: [
    CommonModule,
    FactModule,
    ReactionModule
  ],
  declarations: []
})
export class BotModule { }
