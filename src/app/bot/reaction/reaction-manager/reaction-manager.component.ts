import { Component, OnInit } from '@angular/core'

import { RestService, RestResource } from '../../../rest'
import { SocketService, SocketComponent } from '../../../socket'
import { Reaction } from '../reaction.type'

import { Debounce } from '../../../debounce'

@Component({
  selector: 'app-reaction-manager',
  templateUrl: './reaction-manager.component.html',
  styleUrls: ['./reaction-manager.component.css']
})
export class ReactionManagerComponent extends SocketComponent implements OnInit {
  private reactionResource: RestResource<Reaction>
  private reactions: Reaction[] = []

  constructor(private rest: RestService, socket: SocketService) {
    super(socket)
    this.reactionResource = rest.createResource('/api/rest/botreaction')
  }

  trackBy(index, reaction) { return reaction._id }

  ngOnInit() {
    this.fetchReactions()

    this.onSocket('BotReaction created', () => this.debouncedFetchReactions())
    this.onSocket('BotReaction deleted', () => this.debouncedFetchReactions())
  }

  addReaction() {
    this.reactionResource.post({}).subscribe(() => {})
  }

  deleteReaction(reaction: Reaction) {
    this.reactionResource.delete(reaction._id).subscribe(() => {})
  }

  @Debounce(300) debouncedFetchReactions() { this.fetchReactions() }

  reactionQuery = undefined

  fetchReactions() {
    if(!this.reactionQuery) this.reactionQuery = this.reactionResource.query({})

    this.reactionQuery.subscribe(facts => {
      this.reactions = facts
    })
  }
}
