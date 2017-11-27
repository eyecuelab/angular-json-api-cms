import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'cleanString'})
export class CleanStringPipe implements PipeTransform {

  transform(string: string) {
    if (string) {
      return string.replace(/_/g, ' ');
    }
  }
}
