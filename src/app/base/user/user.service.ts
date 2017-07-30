import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { Subject } from 'rxjs'

import { UserTokenService } from './user-token.service'

interface LoginResponse {
  redirect: string
  token: string
}

@Injectable()
export class UserService {
  private _onLoginStatusChanged: Subject<boolean> = new Subject<boolean>()

  onLoginStatusChanged = this._onLoginStatusChanged.asObservable()

  constructor(private http: HttpClient, private userToken: UserTokenService) {
  }

  loggedIn(): boolean {
    return this.userToken.get() != null
  }

  login(email: string, password: string) {
    this.http.post<LoginResponse>('https://localhost:3001/api/login', {email: email, password: password, redirect: false})
    .subscribe(response => {
      this.userToken.set(response.token)

      this._onLoginStatusChanged.next(this.loggedIn())
    })
  }

  logout() {
    this.http.get('https://localhost:3001/api/logout')
    .subscribe(response => {
      this.userToken.reset()

      this._onLoginStatusChanged.next(this.loggedIn())
    })
  }
}
