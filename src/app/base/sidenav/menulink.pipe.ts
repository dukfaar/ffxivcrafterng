import { Pipe, PipeTransform  } from '@angular/core'

@Pipe({
  name: 'menulink'
})
export class MenuLinkPipe implements PipeTransform  {
  transform(inputText: string): string {
    return inputText?inputText.replace(/ /g,'/'):''
  }
}
