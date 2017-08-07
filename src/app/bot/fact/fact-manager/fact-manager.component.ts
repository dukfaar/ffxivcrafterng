import { Component, OnInit } from '@angular/core';

import { RestService, RestResource } from '../../../rest'
import { Fact } from '../fact.type'

@Component({
  selector: 'app-fact-manager',
  templateUrl: './fact-manager.component.html',
  styleUrls: ['./fact-manager.component.css']
})
export class FactManagerComponent implements OnInit {
  private factResource: RestResource<Fact>
  private facts: Fact[] = []

  constructor(private rest: RestService) {
    this.factResource = rest.createResource('/api/rest/uselessfact')

    this.fetchFacts()
  }

  ngOnInit() {
  }

  fetchFacts() {
    this.factResource.query({}).subscribe(facts => {
      this.facts = facts
    })
  }
}
