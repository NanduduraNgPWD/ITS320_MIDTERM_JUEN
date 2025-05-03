import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { TestComponent } from './test.component';
import { HighlightDirective } from '../directives/background-color.directive';
import { ClickLoggerDirective } from '../directives/click-logger.directive';

describe('Directives in TestComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent], // Standalone component already imports the directives
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply background color on hover', () => {
    const divElement: HTMLElement = fixture.nativeElement.querySelector('div');

    // Simulate mouseenter event (hover)
    const mouseEnterEvent = new Event('mouseenter');
    divElement.dispatchEvent(mouseEnterEvent);
    fixture.detectChanges();

    const backgroundColor = getComputedStyle(divElement).backgroundColor;
    expect(backgroundColor).toBe('rgb(255, 255, 0)'); // Yellow
  });

  it('should remove background color on mouse leave', () => {
    const divElement: HTMLElement = fixture.nativeElement.querySelector('div');

    // Simulate mouseenter
    divElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    // Simulate mouseleave
    divElement.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    const backgroundColor = getComputedStyle(divElement).backgroundColor;
    expect(backgroundColor).toBe('rgba(0, 0, 0, 0)'); // Transparent (default)
  });

  it('should log a message when clicked', () => {
    const divElement: HTMLElement = fixture.nativeElement.querySelector('div');

    spyOn(console, 'log'); // Spy on console.log

    // Simulate click event
    divElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith('Element clicked!');
  });
});
