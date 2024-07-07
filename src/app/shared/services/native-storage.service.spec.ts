import { TestBed } from '@angular/core/testing';

import { NativeStorageService } from './native-storage.service';

describe('NativeStorageService', () => {
  let service: NativeStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NativeStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
