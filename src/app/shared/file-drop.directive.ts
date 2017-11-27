import {Directive, HostListener, HostBinding, EventEmitter, Output, Input} from '@angular/core';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {
  @Input() private allowedExtensions: Array<string> = [];
  @Output() private filesChangeEmitter: EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmitter: EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = 'rgba(0, 0, 0, 0)';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(0, 0, 0, .06)';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(0, 0, 0, 0)';
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(0, 0, 0, 0)';
    const files = evt.dataTransfer.files;
    const validFiles: Array<File> = [];
    const invalidFiles: Array<File> = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = '.' + file.name.split('.')[file.name.split('.').length - 1];
        if (this.allowedExtensions.lastIndexOf(ext) !== -1 || this.allowedExtensions.length === 0) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file);
        }
      }
      if (validFiles.length > 0) {
        this.filesChangeEmitter.emit(validFiles);
      }
      if (invalidFiles.length > 0) {
        this.filesInvalidEmitter.emit(invalidFiles);
      }
    }
  }

}
