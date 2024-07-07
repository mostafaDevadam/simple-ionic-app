import { TestBed } from '@angular/core/testing';

import { NativeCameraService } from './native-camera.service';

describe('NativeCameraService', () => {
  let service: NativeCameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NativeCameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
