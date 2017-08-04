import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { RestResource } from './rest-resource.type'

import * as _ from 'lodash'

@Injectable()
export class RestService {
  constructor(private http: HttpClient) {}

  createResource<T>(resourceName: string): RestResource<T> {
    return new RestResource<T>(resourceName, this)
  }

  query<T>(resourceName: string, query: any): Observable<T> {
    let paramString: string = _.join(_.map(query, (value, key) => key + '=' + value), '&')
    let url = resourceName
    if(paramString.length > 0) url += '?' + paramString

    return this.http.get<T>(url)
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
}
