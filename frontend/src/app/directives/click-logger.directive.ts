import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickLogger]'
})
export class ClickLoggerDirective {

  @HostListener('click')
  handleClick() {
    console.log('Element clicked!');
  }
}
