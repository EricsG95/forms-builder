import { TestBed } from '@angular/core/testing';

import { EditorialServiceService } from './editorial-service.service';

describe('EditorialServiceService', () => {
  let service: EditorialServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorialServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
