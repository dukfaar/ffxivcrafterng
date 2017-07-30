import { Component } from '@angular/core'

import { HttpClient } from '@angular/common/http'

interface MenuEntry {
  link: string
  name: string
  roles: string[]
  submenus: MenuEntry[]
  title: string
  weight: number
}

@Component({
  selector: 'sidenav-content',
  templateUrl: './sidenav-content.component.html'
})
export class SidenavContentComponent {
  mainMenu: MenuEntry[]
  accountMenu: MenuEntry[]

  constructor(private http: HttpClient) {
    this.queryMainMenu()
    this.queryAccountMenu()
  }

  queryMainMenu() {
    this.http.get<MenuEntry[]>('https://localhost:3001/api/admin/menu/main')
    .subscribe(response => {
      this.mainMenu = response
    })
  }

  queryAccountMenu() {
    this.http.get<MenuEntry[]>('https://localhost:3001/api/admin/menu/account')
    .subscribe(response => {
      this.accountMenu = response
    })
  }
}
