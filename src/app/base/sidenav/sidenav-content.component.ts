import { Component } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { UserService } from '../user/user.service'

import { MenuEntry } from './MenuEntry.type'

import * as _ from 'lodash'

@Component({
  selector: 'sidenav-content',
  templateUrl: './sidenav-content.component.html'
})
export class SidenavContentComponent {
  private mainMenuList: MenuEntry[] = []
  private accountMenuList: MenuEntry[] = []

  constructor(private http: HttpClient, private user: UserService) {
    this.queryMainMenu()
    this.queryAccountMenu()

    this.user.onLoginStatusChanged.subscribe(value => {
      this.queryMainMenu()
      this.queryAccountMenu()
    })
  }

  sortMenu(menu): MenuEntry[] {
    if(!menu || menu.length === 0) return []

    let sorted:MenuEntry[] = _.sortBy(menu, (e:MenuEntry) => e.weight?e.weight:9999) as MenuEntry[]
    _.each(sorted, (menu:MenuEntry) => {
      menu.submenus = this.sortMenu(menu.submenus)
    })
    return sorted
  }

  queryMainMenu() {
    this.http.get<MenuEntry[]>('https://localhost:3001/api/admin/menu/main')
    .subscribe(response => {
      this.mainMenuList = response
      this.mainMenuList = this.sortMenu(this.mainMenuList)
    })
  }

  queryAccountMenu() {
    this.http.get<MenuEntry[]>('https://localhost:3001/api/admin/menu/account')
    .subscribe(response => {
      this.accountMenuList = response
      this.accountMenuList = this.sortMenu(this.accountMenuList)
    })
  }
}
