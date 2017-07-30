import { Component, Input } from '@angular/core'

import { MenuEntry } from './MenuEntry.type'

@Component({
  selector: 'sidenav-menu',
  templateUrl: './sidenav-menu.component.html'
})
export class SidenavMenuComponent {
  @Input() menu: MenuEntry[]
}
