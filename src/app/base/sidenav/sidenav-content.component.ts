import { Component } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { UserService } from '../user/user.service'

import { MenuEntry } from './MenuEntry.type'

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

  queryMainMenu() {
    this.http.get<MenuEntry[]>('https://localhost:3001/api/admin/menu/main')
    .subscribe(response => {
      this.mainMenuList = response
    })
  }

  queryAccountMenu() {
    this.http.get<MenuEntry[]>('https://localhost:3001/api/admin/menu/account')
    .subscribe(response => {
      this.accountMenuList = response
    })
  }
}
