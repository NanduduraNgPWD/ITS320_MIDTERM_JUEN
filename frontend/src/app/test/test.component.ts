import { Component } from '@angular/core';
import { ComposedDirective } from '../directives/composed.directive';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ComposedDirective],
  template: `
<div class="container flex justify-center mt-[20%]">

<div directivesComposed class=" w-48 bg-blue-300 text-center py-4">
      Hover and click me
    </div>
</div>
  `,
})
export class TestComponent { }
