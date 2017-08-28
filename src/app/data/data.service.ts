import { Observable, ReplaySubject } from 'rxjs'
import { RestResource } from '../rest/rest-resource.type'

export class DataService<T> {
  private data: {[key: string]: ReplaySubject<T> }
  constructor(private restService: RestResource<T>) {}

  private checkForSubject(id: string) {
    if(!this.data[id]) {
      this.data[id] = new ReplaySubject<T>(1)
    }
  }

  protected replace(id: string, data: T) {
    this.checkForSubject(id)

    this.data[id].next(data)
  }

  protected fetch(id: string) {
    this.restService.get(id).subscribe(result => this.replace(id,result) )
  }

  get(id: string): Observable<T> {
    this.checkForSubject(id)

    return this.data[id]
  }
}
