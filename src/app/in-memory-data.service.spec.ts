import { TestBed } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryDataService = TestBed.get(InMemoryDataService);
    expect(service).toBeTruthy();
  });

  it('should have a method for generate the Id if there is no one', () => {
    const service: InMemoryDataService = TestBed.get(InMemoryDataService);
    const num = service.genId([]);
    expect(num).toBe(11);

    const numHero = service.genId([{"id": 2, "name": "2"}]);
    expect(numHero).toBe(3);
  });
  
});
