import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BehaviorSubject } from 'rxjs'

import { SocketService } from '../socket/socket.service'

import { Project } from './project.type'

import { Debounce } from '../debounce'

@Injectable()
export class PublicProjectService {
  public list: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([])

  constructor(
    private socket: SocketService,
    private http: HttpClient
  ) {
    this.fetchPublicProjects()

    this.socket.on('project stock changed', () => this.debouncedFetchPublicProjects())
    this.socket.on('project step data changed', () => this.debouncedFetchPublicProjects())
    this.socket.on('project data changed', () => this.debouncedFetchPublicProjects())
    this.socket.on('new project created', () => this.debouncedFetchPublicProjects())
    this.socket.on('project deleted', () => this.debouncedFetchPublicProjects())
  }

  @Debounce(300) debouncedFetchPublicProjects() { this.fetchPublicProjects() }

  fetchPublicProjects() {
    this.http.get<Project[]>('/api/project/public')
    .subscribe(response => {
      this.list.next(response)
    })
  }
}
