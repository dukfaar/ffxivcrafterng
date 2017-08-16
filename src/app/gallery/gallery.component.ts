import { Component, OnInit } from '@angular/core'

import { Image } from './image.type'

import { RestService, RestResource } from '../rest'
import { SocketService, SocketComponent } from '../socket'

import { Debounce, DebounceForId } from '../debounce'

import { FileUploader } from 'ng2-file-upload'

import {  UserTokenService } from '../base/user/user-token.service'

import * as _ from 'lodash'

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

  private uploader: FileUploader = new FileUploader({autoUpload: true, url: 'https://' + window.location.hostname + ':3001/api/image'})

  constructor(private rest: RestService, socket: SocketService, private tokenService: UserTokenService) {
    super(socket)
    this.imageResource = this.rest.createResource<Image>('/api/image')
    this.fetchPageData()

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }

    this.uploader.authToken = this.tokenService.getAuthorizationHeader()
  }

  ngOnInit() {
    this.onSocket('image created', () => this.debouncedFetchPageData())
    this.onSocket('image updated', () => this.debouncedFetchPageData())
    this.onSocket('image deleted', () => this.debouncedFetchPageData())
  }

  @Debounce(300) debouncedFetchPageData() { this.fetchPageData() }

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

  fileOverEvent(data: any) {
  }

  triggerUpload() {

  }

  getUrl(image: Image): string {
    return 'https://' + window.location.hostname + ':3001/api/imageThumbnailData/' + image._id
  }
}
