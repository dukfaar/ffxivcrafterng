import { Component } from '@angular/core'

import { SocketService, SocketComponent } from '../../socket'

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
export class NewsCardComponent extends SocketComponent {
  private applicationSettingsResource: RestResource<ApplicationSettingResponseEntry>
  newsText: string = 'Loading...'

  constructor(socket: SocketService, private rest: RestService) {
    super(socket)
    this.applicationSettingsResource = this.rest.createResource('/api/rest/applicationsetting')
    this.fetchNewsText()
  }

  ngOnInit(): void {
    this.onSocket('ApplicationSetting updated', (change: ApplicationSettingResponseEntry) => { if(change.name === 'newsText') this.newsText = change.text })
  }

  private fetchNewsText(): void {
    this.applicationSettingsResource.query({name: 'newsText'}).subscribe(response => {
      this.newsText = response[0].text
    })
  }
}
