import { Component, OnInit } from '@angular/core';

import { RestService, RestResource } from '../../../rest'
import { SocketService } from '../../../socket/socket.service'
import { Reaction } from '../reaction.type'

import { Debounce, DebounceForId } from '../../../debounce'

@Component({
  selector: 'app-reaction-manager',
  templateUrl: './reaction-manager.component.html',
  styleUrls: ['./reaction-manager.component.css']
})
export class ReactionManagerComponent implements OnInit {
  private reactionResource: RestResource<Reaction>
  private reactions: Reaction[] = []

  constructor(private rest: RestService, private socket: SocketService) {
    this.reactionResource = rest.createResource('/api/rest/botreaction')
  }

  trackBy(index, reaction) { return reaction._id }

  ngOnInit() {
    this.fetchReactions()

    this.socket.on('BotReaction created', () => this.fetchReactions())
    this.socket.on('BotReaction deleted', () => this.fetchReactions())
    this.socket.on('BotReaction updated', () => this.fetchReactions())
  }

  addReaction() {
    this.reactionResource.post({}).subscribe(() => {})
  }

  @DebounceForId(300)
  updateReaction(reaction: Reaction) {
    this.reactionResource.update(reaction._id, reaction).subscribe(() => {})
  }

  deleteReaction(reaction: Reaction) {
    this.reactionResource.delete(reaction._id).subscribe(() => {})
  }

  reactionQuery = undefined

  @Debounce(300)
  fetchReactions() {
    if(!this.reactionQuery) this.reactionQuery = this.reactionResource.query({})

    this.reactionQuery.subscribe(facts => {
      this.reactions = facts
    })
  }
}
