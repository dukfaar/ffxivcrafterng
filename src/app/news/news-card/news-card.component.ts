import { Component } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { SocketService } from '../../socket/socket.service'

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
  private newsTextQuery = this.http.get<ApplicationSettingResponseEntry[]>('/api/rest/applicationsetting?name=newsText')
  newsText: string = 'Loading...'

  constructor(private http: HttpClient, private socket: SocketService) {
    this.fetchNewsText()
  }

  ngOnInit(): void {
    this.socket.on('ApplicationSetting updated', this.checkApplicationSettingChange)
  }

  ngOnDestroy(): void {
    this.socket.off('ApplicationSetting updated', this.checkApplicationSettingChange)
  }

  private fetchNewsText(): void {
    this.newsTextQuery.subscribe(response => {
      this.newsText = response[0].text
    })
  }

  private checkApplicationSettingChange = (change: ApplicationSettingResponseEntry) => {
    if(change.name === 'newsText') this.newsText = change.text
  }
}
