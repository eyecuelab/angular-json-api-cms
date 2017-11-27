import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'humanizeString'})
export class HumanizeStringPipe implements PipeTransform {

  transform(input: string) {
    if (input) {
      const str = input.replace(/_/g, ' ');
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

  }
}
