import { Component, OnInit } from '@angular/core'

import { RestService, RestResource } from '../../../rest'
import { SocketService, SocketComponent } from '../../../socket'

import { Fact } from '../fact.type'

import { Debounce } from '../../../debounce'

@Component({
  selector: 'app-fact-manager',
  templateUrl: './fact-manager.component.html',
  styleUrls: ['./fact-manager.component.css']
})
export class FactManagerComponent extends SocketComponent implements OnInit {
  private factResource: RestResource<Fact>
  private facts: Fact[] = []

  constructor(private rest: RestService, socket: SocketService) {
    super(socket)
    this.factResource = rest.createResource('/api/rest/uselessfact')

    this.fetchFacts()
  }

  trackBy(index, fact) { return fact._id }

  addFact() {
    this.factResource.post({}).subscribe(() => {})
  }

  ngOnInit() {
    this.onSocket('UselessFact created', () => this.debouncedFetchFacts())
    this.onSocket('UselessFact deleted', () => this.debouncedFetchFacts())
  }

  @Debounce(300) debouncedFetchFacts() { this.fetchFacts() }

  fetchFacts() {
    this.factResource.query({}).subscribe(facts => {
      this.facts = facts
    })
  }
}
