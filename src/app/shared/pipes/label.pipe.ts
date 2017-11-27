import { Pipe, PipeTransform } from '@angular/core';
import { HumanizeStringPipe } from './humanize-string.pipe';

@Pipe({name: 'label'})
export class LabelPipe extends HumanizeStringPipe implements PipeTransform {
  static readonly labels = {
    sort: 'Sort By',
    event: 'Stage',
    search: 'Keyword'
  };

  transform(name: string): string {
    return LabelPipe.labels[name] || super.transform(name);
  }
}
