import { TestBed } from '@angular/core/testing';

import { ToastUIService } from './toast-u-i.service';

describe('ToastUIService', () => {
  let service: ToastUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
