import { Component, OnInit, Input } from '@angular/core'

import { RestService, RestResource } from '../../../rest'
import { SocketService, SocketComponent } from '../../../socket'

import { Fact } from '../fact.type'

import { Debounce, DebounceForId } from '../../../debounce'

import * as _ from 'lodash'

@Component({
  selector: 'fact-manager-fact',
  templateUrl: './fact-manager-fact.component.html'
})
export class FactManagerFactComponent extends SocketComponent implements OnInit {
  private factResource: RestResource<Fact>
  @Input() fact: Fact

  constructor(private rest: RestService, socket: SocketService) {
    super(socket)
    this.factResource = rest.createResource('/api/rest/uselessfact')
  }

  ngOnInit() {
    this.onSocket('UselessFact updated', (fact) => {
      if(fact._id === this.fact._id) {
        _.extend(this.fact, fact)
      }
    })
  }

  @DebounceForId(300)
  updateFact(fact: Fact) {
    this.factResource.update(fact._id, fact).subscribe(() => {})
  }

  deleteFact(fact: Fact) {
    this.factResource.delete(fact._id).subscribe(() => {})
  }
}
