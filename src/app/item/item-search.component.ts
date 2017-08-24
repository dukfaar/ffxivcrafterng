import { Component, Output, OnInit, EventEmitter } from '@angular/core'

import { RestService, RestResource } from '../rest'

import { BehaviorSubject } from 'rxjs'
import { Item } from './item.type'
import { Debounce } from '../debounce'

import { HttpClient } from '@angular/common/http'

class SearchResult {
  count: number
  list: Item[]
}

@Component({
  selector: 'item-search',
  templateUrl: 'item-search.component.html'
})
export class ItemSearchComponent implements OnInit {
  @Output() itemSelected: EventEmitter<Item> = new EventEmitter<Item>()

  searchTerm: string = ''
  items: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([])

  itemCount: number = 0
  pageSize: number = 10
  pageIndex: number = 0

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  @Debounce(300)
  searchTermChanged() {
    if(this.searchTerm && this.searchTerm.length > 0) this.fetchItemList()
  }

  fetchItemList() {
    this.http.get<SearchResult>('/api/item/filteredList/' + this.searchTerm + `?limit=${this.pageSize}&page=${this.pageIndex}`)
    .subscribe(result => {
      this.itemCount = result.count
      this.items.next(result.list)
    })
  }
}
