import { Component } from '@angular/core'

import { SocketService } from '../../socket/socket.service'

import { RestResource, RestService } from '../../rest'

interface ApplicationSettingResponseEntry {
  _id: string
  name: string
  text: string
}

@Component({
  selector: 'news-card',
  templateUrl: './news-card.component.html'
})
export class NewsCardComponent {
  private applicationSettingsResource: RestResource<ApplicationSettingResponseEntry>
  newsText: string = 'Loading...'

  constructor(private socket: SocketService, private rest: RestService) {
    this.applicationSettingsResource = this.rest.createResource('/api/rest/applicationsetting')
    this.fetchNewsText()
  }

  ngOnInit(): void {
    this.socket.on('ApplicationSetting updated', this.checkApplicationSettingChange)
  }

  ngOnDestroy(): void {
    this.socket.off('ApplicationSetting updated', this.checkApplicationSettingChange)
  }

  private fetchNewsText(): void {
    this.applicationSettingsResource.query({name: 'newsText'}).subscribe(response => {
      this.newsText = response[0].text
    })
  }

  private checkApplicationSettingChange = (change: ApplicationSettingResponseEntry) => {
    if(change.name === 'newsText') this.newsText = change.text
  }
}
