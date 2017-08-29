import { Injectable } from '@angular/core'

import { Step } from './step.type'

import { SocketService } from '../socket'
import { RestService, RestResource } from '../rest'

import { DataService } from '../data/data.service'

@Injectable()
export class StepDataService extends DataService<Step> {
  constructor(private rest: RestService, private socket: SocketService) {
    super(rest.createResource('/api/projectstep'))

    socket.on('project step data changed',result => {
      if(this.isReplaySubjectAvailable(result.stepId)) {
        this.fetch(result.stepId)
      }
    })
  }
}
