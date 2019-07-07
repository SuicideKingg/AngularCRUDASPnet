import { TestBed } from '@angular/core/testing';

import { APIWebServiceService } from './apiweb-service.service';

describe('APIWebServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIWebServiceService = TestBed.get(APIWebServiceService);
    expect(service).toBeTruthy();
  });
});
