import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { Subject, Observable } from 'rxjs'

import { UserTokenService } from './user-token.service'

import * as _ from 'lodash'

interface LoginResponse {
  token: string
}

interface CirclesResponse {
  allowed: string[]
}

import { UserModel } from './user.type'

@Injectable()
export class UserService {
  private _onLoginStatusChanged: Subject<boolean> = new Subject<boolean>()
  private circles: string[] = []
  private user: UserModel = null

  onLoginStatusChanged = this._onLoginStatusChanged.asObservable()

  constructor(private http: HttpClient, private userToken: UserTokenService) {
    if(this.userToken.get()) {
      this.http.get<LoginResponse>('/api/users/me')
      .flatMap(response => {
        return this.evalLoginResponse(response)
      })
      .subscribe(mine => {
        this.circles = mine.allowed
      })
    }
  }

  private evalLoginResponse(response: LoginResponse) {
    this.userToken.set(response.token)

    this.parseToken()

    return this.http.get<CirclesResponse>('/api/circles/mine')
  }

  getUser(): UserModel { return this.user }

  allowed(permission: string): boolean {
    return _.includes(this.circles, permission)
  }

  loggedIn(): boolean {
    return this.userToken.get() != null
  }

  parseToken() {
    let base64Url = this.userToken.get().split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    this.user = JSON.parse(decodeURI(window.atob(base64)))
  }

  login(email: string, password: string) {
    this.http.post<LoginResponse>('/api/login', {email: email, password: password, redirect: false})
    .flatMap(response => {
      return this.evalLoginResponse(response)
    })
    .subscribe(mine => {
      this.circles = mine.allowed

      this._onLoginStatusChanged.next(this.loggedIn())
    })
  }

  logout() {
    this.http.get('/api/logout')
    .subscribe(response => {
      this.userToken.reset()

      this.circles = []
      this.user = null

      this._onLoginStatusChanged.next(this.loggedIn())
    })
  }
}
