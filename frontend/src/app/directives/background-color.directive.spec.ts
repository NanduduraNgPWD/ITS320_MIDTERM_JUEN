import { BackgroundColorDirective } from './background-color.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('BackgroundColorDirective', () => {
  let directive: BackgroundColorDirective;
  let el: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    // Create mock instances of ElementRef and Renderer2
    el = { nativeElement: document.createElement('div') } as ElementRef;
    renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);

    directive = new BackgroundColorDirective(el, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply background color on initialization', () => {
    // Verify if the setStyle method of Renderer2 was called with the correct parameters
    expect(renderer.setStyle).toHaveBeenCalledTimes(1); // Ensures it's called only once
    expect(renderer.setStyle).toHaveBeenCalledWith(el.nativeElement, 'background-color', 'yellow');
  });
});
