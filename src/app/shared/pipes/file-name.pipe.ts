import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fileName'})
export class FileNamePipe implements PipeTransform {

  transform(filePath) {
    const pathArray = filePath.split('/');
    return pathArray[pathArray.length - 1];
  }
}
