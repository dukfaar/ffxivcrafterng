import { Injectable } from '@angular/core'

@Injectable()
export class UserTokenService {
  private token: string = localStorage.getItem('auth-token')

  getAuthorizationHeader(): string {
    return 'Bearer ' + this.token
  }

  set(token: string) {
    this.token = token
    localStorage.setItem('auth-token', this.token)
  }

  reset() {
    this.token = undefined
    localStorage.removeItem('auth-token')
  }

  get(): string {
    return this.token
  }

  tokenIsSet(): boolean {
    return this.token != null && this.token != undefined && this.token !== 'undefined' && this.token !== 'null'
  }
}
