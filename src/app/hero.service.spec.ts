import { async, TestBed } from '@angular/core/testing';
import { concatMap, tap, map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroService } from './hero.service';

class Hero {
  id: number;
  name: string;
}

function failure(err: any) {
  fail(JSON.stringify(err));
}

describe('HeroService', () => {

  let serviceHeroes: HeroService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
          )
        ]
      });
      serviceHeroes = TestBed.get(HeroService);
  });

  it('should be created', () => {
    expect(serviceHeroes).toBeTruthy();
  });

  it('should have a method for get the heroes list', done => {
    serviceHeroes.getHeroes()
    .subscribe( heroes => {
      expect(heroes.length).toBeGreaterThan(0, 'should have heroes');
      done();
    },
    failure
    );
  });

  it('should have a method for get the hero given the id', done => {
    serviceHeroes.getHero(11)
    .subscribe( hero => {
      expect(hero).toBeTruthy();
      expect(hero.id).toBe(11);
      done();
    },
    failure
    );
  });

  it('should have the correct HEADER for service http requests', () => {
    const headers = serviceHeroes.httpOptions.headers;
    expect(headers.has('Content-Type')).toBeTruthy();
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('should have a service for addHero', (done => {
    const service: HeroService = TestBed.get(HeroService);
    const newHero = new Hero();
    newHero.id = 100;
    newHero.name = "Test";
    service.addHero(newHero)
    .pipe(
      tap( hero => {
        expect(hero.name).toBe('Test');
      })
    )
    .subscribe( hero => {
      expect(hero.id).toBe(100);
      expect(hero.name).toBe("Test");
      done();
    },
    _error => failure('re-fetch of new hero failed')
    );
  }), 10000);

  it('should have a service for deleteHero, and do the delete hero with a number', done => {
    const service: HeroService = TestBed.get(HeroService);
    service.deleteHero(11)
    .subscribe( (_: {}) => {
      expect(_).toBeDefined();
      service.getHero(11)
      .subscribe( hero => {
        expect(hero).toBeUndefined();
        done();
      });
    },
    failure
    );
  });

  it('should have a service for deleteHero, and do the delete hero given the hero', done => {
    const service: HeroService = TestBed.get(HeroService);
    const hero = new Hero();
    hero.id = 11;
    service.deleteHero(hero)
    .subscribe( (_: {}) => {
      expect(_).toBeDefined();
      service.getHero(11)
      .subscribe( hero => {
        expect(hero).toBeUndefined();
        done();
      });
    });
  });

  it('should have a service for searchHeroes given the exact name', done => {
    const service: HeroService = TestBed.get(HeroService);
    service.searchHeroes("Dr Nice")
    .subscribe( heroes => {
      expect(heroes.length).toEqual(1);
      expect(heroes[0].id).toEqual(11);
      done();
    });
  });

  it('should have a service for searchHeroes given partial name', done => {
    const service: HeroService = TestBed.get(HeroService);
    service.searchHeroes("Dr")
    .subscribe( heroes => {
      expect(heroes.length).toEqual(2);
      expect(heroes[0].id).toEqual(11);
      expect(heroes[1].id).toEqual(18);
      done();
    });
  });

  it('should update an existing hero', ( done => {
    const id = 11;
    serviceHeroes.getHero(id)
    .pipe(
      concatMap(hero => {
        hero.name = 'Thunderstorm';
        return serviceHeroes.updateHero(hero);
      }),
      concatMap(() => {
        return serviceHeroes.getHero(id);
      })
    ).subscribe(
      hero => {
        expect(hero.name).toBe('Thunderstorm');
        expect(hero.id).toEqual(11);
        done();
      },
      err => fail('re-fetch of updated hero failed')
      );
  }), 10000);

  it('should create new hero when try to update non-existent hero', ( done => {
    const falseHero = new Hero();
    falseHero.id = 12321;
    falseHero.name = 'DryMan';

    serviceHeroes.updateHero(falseHero)
      .subscribe(
      hero => {
        expect(hero.name).toBe(falseHero.name);
        done();
      },
      failure
      );
  }));
  
});
