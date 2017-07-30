import { Component } from '@angular/core'

import { HttpClient } from '@angular/common/http'

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
  private newsTextQuery = this.http.get<ApplicationSettingResponseEntry[]>('https://localhost:3001/api/rest/applicationsetting?name=newsText')

  newsText: string = 'Loading...'

  constructor(private http: HttpClient) {
    this.fetchNewsText()
  }

  fetchNewsText() {
    this.newsTextQuery.subscribe(response => {
      this.newsText = response[0].text
    })
  }
}
