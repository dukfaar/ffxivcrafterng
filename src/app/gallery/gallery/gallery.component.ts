import { Component, OnInit } from '@angular/core'

import { Image } from '../image.type'

import { RestService, RestResource } from '../../rest'
import { SocketService, SocketComponent } from '../../socket'

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent extends SocketComponent implements OnInit  {
  public currentPage: number = 0
  public pageSize: number = 32
  public length: number = 0
  public images: Image [] = []

  private imageResource: RestResource<Image>

  constructor(private rest: RestService, socket: SocketService) {
    super(socket)
    this.imageResource = this.rest.createResource<Image>('/api/image')
    this.fetchPageData()
  }

  ngOnInit() {
    this.onSocket('image created', () => this.fetchPageData())
    this.onSocket('image updated', () => this.fetchPageData())
    this.onSocket('image deleted', () => this.fetchPageData())
  }

  private fetchPageData () {
    this.imageResource.count({sort: '-uploadDate'})
    .subscribe(data => {
      this.length = data.count

      this.imageResource.query({sort: '-uploadDate', limit: this.pageSize, skip: this.currentPage * this.pageSize})
      .subscribe(data => {
        this.images = data
      })
    })
  }

  getUrl(image: Image): string {
    return 'https://' + window.location.hostname + ':3001/api/imageThumbnailData/' + image._id
  }
}
