import { Directive, ElementRef } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';

@Directive({
  selector: '[appTableRowHighlight]',
})
export class TableRowHighlightDirective {
  constructor(private element: ElementRef) {
    fromEvent(this.element.nativeElement, 'mouseover')
      .pipe(throttleTime(100))
      .subscribe((event) => {
        this.element.nativeElement.style.backgroundColor = '#e6e6e6';
      });
    fromEvent(this.element.nativeElement, 'mouseout')
      .pipe(throttleTime(100))
      .subscribe((event) => {
        this.element.nativeElement.style.backgroundColor = '#f5f5f5';
      });
  }
}
