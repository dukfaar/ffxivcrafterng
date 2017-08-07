import { Component, OnInit } from '@angular/core';

import { RestService, RestResource } from '../../../rest'
import { Reaction } from '../reaction.type'

@Component({
  selector: 'app-reaction-manager',
  templateUrl: './reaction-manager.component.html',
  styleUrls: ['./reaction-manager.component.css']
})
export class ReactionManagerComponent implements OnInit {
  private reactionResource: RestResource<Reaction>
  private reactions: Reaction[] = []

  constructor(private rest: RestService) {
    this.reactionResource = rest.createResource('/api/rest/botreaction')

    this.fetchReactions()
  }

  ngOnInit() {
  }

  fetchReactions() {
    this.reactionResource.query({}).subscribe(facts => {
      this.reactions = facts
    })
  }
}
