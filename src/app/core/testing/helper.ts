import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class Helper  {
  static cssQuery(fixture: ComponentFixture<any>, selector: string): HTMLElement {
    const debugElement = fixture.debugElement.query(By.css(selector));
    return debugElement && debugElement.nativeElement;
  }

  static cssQueryAll(fixture: ComponentFixture<any>, selector: string): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(selector));
  }
}
