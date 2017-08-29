import { Observable, ReplaySubject } from 'rxjs'
import { RestResource } from '../rest/rest-resource.type'

export class DataService<T> {
  private data: {[key: string]: ReplaySubject<T> } = {}
  constructor(private restService: RestResource<T>) {}

  protected fetch(id: string) {
    this.restService.get(id).subscribe(result => this.replace(id,result) )
  }

  protected isReplaySubjectAvailable(id: string): boolean {
    return this.data[id] !== undefined
  }

  private checkForSubject(id: string) {
    if(!this.isReplaySubjectAvailable(id)) {
      this.data[id] = new ReplaySubject<T>(1)

      return false
    }

    return true
  }

  protected replace(id: string, data: T) {
    this.checkForSubject(id)

    this.data[id].next(data)
  }

  get(id: string): Observable<T> {
    if(!this.checkForSubject(id)) this.fetch(id)

    return this.data[id]
  }
}
