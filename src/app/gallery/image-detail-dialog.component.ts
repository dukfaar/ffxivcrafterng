import { Component, Inject, OnInit } from '@angular/core'
import { MD_DIALOG_DATA } from '@angular/material'

import { BehaviorSubject } from 'rxjs'

import { Image } from './image.type'

import { RestService, RestResource } from '../rest'
import { SocketService, SocketComponent } from '../socket'

import { UserModel } from '../user/user.type'

class Comment {
  date: Date
  commentor: UserModel
  text: String
}

@Component({
  selector: 'image-detail-dialog',
  templateUrl: 'image-detail-dialog.component.html',
})
export class ImageDetailDialogComponent extends SocketComponent implements OnInit {
  url: String
  comments: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([])
  commentResource: RestResource<Comment>

  constructor(@Inject(MD_DIALOG_DATA) public image: Image, private rest: RestService, socket: SocketService) {
    super(socket)
    this.commentResource = this.rest.createResource<Comment>('/api/rest/imageComment')

    this.fetchComments()
  }

  ngOnInit() {
    this.url = 'https://' + window.location.hostname + ':3001/api/imageData/' + this.image._id
  }

  fetchComments() {
    this.commentResource.query({sort: 'date', image: this.image._id, select:'commentor text date'})
    .subscribe(data => {
      this.comments.next(data)
    })
  }
}
