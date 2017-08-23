import { Subject } from 'rxjs'
import * as _ from 'lodash'

import 'rxjs/add/operator/debounceTime'

export function Debounce(debounceMs: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key) as PropertyDescriptor;
    }

    var originalMethod = descriptor.value;

    descriptor.value = function() {
      if(!this.__debounceForId) this.__debounceForId = {}

      if(!this.__debounceForId[key]) {
        this.__debounceForId[key] = new Subject<any>()

        this.__debounceForId[key]
        .debounceTime(debounceMs)
        .subscribe(args => {
          originalMethod.apply(this, args)
        })
      }

      let args = []
      _.each(arguments, a => args.push(a))

      this.__debounceForId[key].next(args)
    }

    return descriptor
  }
}
