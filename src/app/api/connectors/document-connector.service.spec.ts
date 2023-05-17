import { TestBed } from '@angular/core/testing';

import { DocumentConnectorService } from './document-connector.service';

describe('DocumentConnectorService', () => {
  let service: DocumentConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
