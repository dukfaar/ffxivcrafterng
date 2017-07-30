export interface MenuEntry {
  link: string
  name: string
  roles: string[]
  submenus: MenuEntry[]
  title: string
  weight: number
}
