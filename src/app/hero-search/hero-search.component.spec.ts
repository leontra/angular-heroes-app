import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';

import { HeroSearchComponent } from './hero-search.component';
import { Subject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { doesNotThrow } from 'assert';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        )
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title and label for Hero Search', () => {
    const fixture = TestBed.createComponent(HeroSearchComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Hero Search');

    expect(compiled.querySelector('label').textContent).toContain('Hero Search');
    expect(compiled.querySelector('label').getAttribute('for')).toEqual('search-box');
  });

  it('should have an input for enter the hero to search', () => {
    const fixture = TestBed.createComponent(HeroSearchComponent);
    fixture.detectChanges();
    const app: any = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    
    spyOn(app.searchTerms, 'next');
    
    const compiled = fixture.debugElement.nativeElement;
    const input = compiled.querySelector('input');
    
    expect(input.getAttribute('id')).toEqual('search-box');
    
    app.searchBox.nativeElement.value = 'search the hero';
    fixture.detectChanges();

    const inputField = fixture.debugElement.query( By.css('input') );
    inputField.triggerEventHandler( 'input', null );
    fixture.detectChanges();

    expect(app.searchTerms.next).toHaveBeenCalledWith('search the hero');

  });

  it('should have an unordered list for the heroes result with a link to the hero detail', () => {
    const fixture = TestBed.createComponent(HeroSearchComponent);
    fixture.detectChanges();
    const app: any = fixture.debugElement.componentInstance;
    const searchTerms = new Subject<string>();
    app.heroes$ = searchTerms.pipe(
      switchMap( (term: string) => {
        return of([
          {name: 'test_01', id: 1},
          {name: 'test_02', id: 2}
        ]);
      })
    );
    fixture.detectChanges();
    
    searchTerms.next('test');
    
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const ul = compiled.querySelector('.search-result');
    
    expect(ul).toBeTruthy();
    
    const list = ul.querySelectorAll('li');
    expect(list[0]).toBeTruthy();
    expect(list[1]).toBeTruthy();

    const linkOne = list[0].querySelector('a');
    
    expect(linkOne).toBeTruthy();
    expect(linkOne.getAttribute('href')).toEqual('/detail/1');
    expect(linkOne.textContent).toContain('test_01');
    
    const linkTwo = list[1].querySelector('a');
    expect(linkTwo).toBeTruthy();
    expect(linkTwo.getAttribute('href')).toEqual('/detail/2');
    expect(linkTwo.textContent).toContain('test_02');
  });

  it('should call the hero service search method on search input', 
  (done) => {
    const fixture = TestBed.createComponent(HeroSearchComponent);
    const app: any = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    app.heroes$.subscribe(result => {
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Narco');
      done();
    });

    app.search("Narco");
    fixture.detectChanges();
  });
});
