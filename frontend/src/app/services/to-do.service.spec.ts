import { TestBed } from '@angular/core/testing';

import { todoService } from './to-do.service';

describe('ToDoService', () => {
  let service: todoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(todoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
