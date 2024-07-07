import { TestBed } from '@angular/core/testing';

import { NativeNetworkService } from './native-network.service';

describe('NativeNetworkService', () => {
  let service: NativeNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NativeNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
