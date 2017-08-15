import { Component, OnInit } from '@angular/core';

import { RestService, RestResource } from '../../../rest'
import { SocketService } from '../../../socket/socket.service'

import { Fact } from '../fact.type'

@Component({
  selector: 'app-fact-manager',
  templateUrl: './fact-manager.component.html',
  styleUrls: ['./fact-manager.component.css']
})
export class FactManagerComponent implements OnInit {
  private factResource: RestResource<Fact>
  private facts: Fact[] = []

  constructor(private rest: RestService, private socket: SocketService) {
    this.factResource = rest.createResource('/api/rest/uselessfact')

    this.fetchFacts()
  }

  trackBy(index, fact) { return fact._id }

  addFact() {
    this.factResource.post({}).subscribe(() => {})
  }

  updateFact(fact: Fact) {
    this.factResource.update(fact._id, fact).subscribe(() => {})
  }

  deleteFact(fact: Fact) {
    this.factResource.delete(fact._id).subscribe(() => {})
  }

  ngOnInit() {
    this.socket.on('UselessFact created', () => this.fetchFacts())
    this.socket.on('UselessFact deleted', () => this.fetchFacts())
    this.socket.on('UselessFact updated', () => this.fetchFacts())
  }

  ngOnDestroy() {

  }

  fetchFacts() {
    this.factResource.query({}).subscribe(facts => {
      this.facts = facts
    })
  }
}
