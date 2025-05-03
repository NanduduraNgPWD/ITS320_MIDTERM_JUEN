import { Directive } from '@angular/core';
import { HighlightDirective } from './background-color.directive';
import { ClickLoggerDirective } from './click-logger.directive';

@Directive({
  selector: '[directivesComposed]',
  hostDirectives: [HighlightDirective, ClickLoggerDirective] // ✅ composition 
})
export class ComposedDirective { }
