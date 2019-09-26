import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });

  it('should have a method for get the heroes list', done => {
    const service: HeroService = TestBed.get(HeroService);
    const heroes = service.getHeroes();
    heroes.subscribe(heroes => {
      expect(heroes.length).toBeGreaterThan(0);
      done();
    });
  });

});
