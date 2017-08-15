import { Subject } from 'rxjs'
import * as _ from 'lodash'

import 'rxjs/add/operator/debounceTime'

export function Debounce(debounceMs: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key) as PropertyDescriptor;
    }

    if(!target.__debounceForId) target.__debounceForId = {}

    var originalMethod = descriptor.value;

    descriptor.value = function() {
      if(!target.__debounceForId[key]) {
        target.__debounceForId[key] = new Subject<any>()

        target.__debounceForId[key]
        .debounceTime(debounceMs)
        .subscribe(args => {
          originalMethod.apply(this, args)
        })
      }

      let args = []
      _.each(arguments, a => args.push(a))

      target.__debounceForId[key].next(args)
    }

    return descriptor
  }
}
