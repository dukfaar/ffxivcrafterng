import { Subject } from 'rxjs'
import * as _ from 'lodash'

import 'rxjs/add/operator/debounceTime'

export function DebounceForId(debounceMs: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key) as PropertyDescriptor;
    }

    if(!target.__debounceForId) target.__debounceForId = {}
    if(!target.__debounceForId[key]) target.__debounceForId[key] = {}

    var originalMethod = descriptor.value;

    descriptor.value = function() {
      if(!target.__debounceForId[key][arguments[0]._id]) {
        target.__debounceForId[key][arguments[0]._id] = new Subject<any>()

        target.__debounceForId[key][arguments[0]._id]
        .debounceTime(debounceMs)
        .subscribe(args => {
          originalMethod.apply(this, args)
        })
      }

      let args = []
      _.each(arguments, a => args.push(a))

      target.__debounceForId[key][arguments[0]._id].next(args)
    }

    return descriptor
  }
}
