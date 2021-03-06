import { Observable } from 'rxjs'
import { RestService } from './rest.service'

import { CountResponse } from './count-response.type'

export class RestResource<T> {
  constructor(private resourceName: string, private restService: RestService) {}

  get(id: string|number): Observable<T> { return this.restService.get<T>(this.resourceName, id) }
  count(query: any): Observable<CountResponse> { return this.restService.count(this.resourceName, query) }
  put(id: string|number, data: any): Observable<T> { return this.restService.put<T>(this.resourceName, id, data) }
  update(id: string|number, data: any): Observable<T> { return this.put(id, data) }
  post(data: any): Observable<T> { return this.restService.post<T>(this.resourceName, data) }
  query(query: any): Observable<T[]> { return this.restService.query<T[]>(this.resourceName, query) }
  delete(id: string|number): Observable<T> { return this.restService.delete<T>(this.resourceName, id) }
}
