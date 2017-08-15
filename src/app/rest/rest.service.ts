import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { RestResource } from './rest-resource.type'

import * as _ from 'lodash'

import { CountResponse } from './count-response.type'

@Injectable()
export class RestService {
  constructor(private http: HttpClient) {}

  private getQueryString(query: any): string {
    let paramString: string = _.join(_.map(query, (value, key) => key + '=' + value), '&')

    return (paramString.length > 0) ? ('?' + paramString) : ''
  }

  createResource<T>(resourceName: string): RestResource<T> {
    return new RestResource<T>(resourceName, this)
  }

  query<T>(resourceName: string, query: any): Observable<T> {
    return this.http.get<T>(resourceName + this.getQueryString(query))
  }

  get<T>(resourceName: string, id: string | number): Observable<T> {
    return this.http.get<T>(resourceName + '/' + id)
  }

  put<T>(resourceName: string, id: string | number, data: any): Observable<T> {
    return this.http.put<T>(resourceName + '/' + id, data)
  }

  post<T>(resourceName: string, data: any): Observable<T> {
    return this.http.post<T>(resourceName, data)
  }

  delete<T>(resourceName: string, id: string | number): Observable<T> {
    return this.http.delete<T>(resourceName + '/' + id)
  }

  count(resourceName: string, query: any): Observable<CountResponse> {
    return this.http.get<CountResponse>(resourceName + '/count' + this.getQueryString(query))
  }
}
