import { Component, OnInit, Input } from '@angular/core'

import { RestService, RestResource } from '../../../rest'
import { SocketService, SocketComponent } from '../../../socket'
import { Reaction } from '../reaction.type'

import { DebounceForId } from '../../../debounce'

import * as _ from 'lodash'

@Component({
  selector: 'reaction',
  templateUrl: './reaction.component.html'
})
export class ReactionComponent extends SocketComponent implements OnInit {
  private reactionResource: RestResource<Reaction>
  @Input() reaction: Reaction

  constructor(private rest: RestService, socket: SocketService) {
    super(socket)
    this.reactionResource = rest.createResource('/api/rest/botreaction')
  }

  ngOnInit() {
    this.onSocket('BotReaction updated', (reaction) => {
      if(reaction._id === this.reaction._id) {
        _.extend(this.reaction, reaction)
      }
    })
  }

  @DebounceForId(300)
  updateReaction(reaction: Reaction) {
    this.reactionResource.update(reaction._id, reaction).subscribe(() => {})
  }

  deleteReaction(reaction: Reaction) {
    this.reactionResource.delete(reaction._id).subscribe(() => {})
  }
}
