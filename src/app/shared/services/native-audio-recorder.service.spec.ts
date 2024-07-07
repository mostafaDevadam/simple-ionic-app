import { TestBed } from '@angular/core/testing';

import { NativeAudioRecorderService } from './native-audio-recorder.service';

describe('NativeAudioRecorderService', () => {
  let service: NativeAudioRecorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NativeAudioRecorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
