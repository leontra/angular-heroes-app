import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';
import { InMemoryDataService } from '../in-memory-data.service';
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      imports: [
        FormsModule, 
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
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heroes title in a h2 tag', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('h2')[0].textContent).toContain('My Heroes');
  });

  it('should render an unorderer list with the heros names', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    fixture.detectChanges();
    const app: any = fixture.debugElement.componentInstance;
    app.heroes = [ {id: 1, name: "test"} ];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const ul = compiled.querySelectorAll('.heroes')[0];
    expect(ul).toBeTruthy();
    const liList = ul.querySelectorAll('li');
    expect(liList.length).toBeGreaterThan(0);
  });

  it('should have a button for delete the hero in the list', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    fixture.detectChanges();
    const app: any = fixture.debugElement.componentInstance;
    app.heroes = [ {id: 1, name: "test_01"} ];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const btn = compiled.querySelector('.delete');
    expect(btn).toBeTruthy();

    spyOn(app, 'delete');

    const button = fixture.debugElement.query( By.css('.delete') );
    button.triggerEventHandler( 'click', null );
    fixture.detectChanges();

    expect(app.delete).toHaveBeenCalledWith({name: 'test_01', id: 1});
  });

  it('should render a list with the hero name link', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    const app: any = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.heroes = [ {id: 1, name: "test"} ];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const list = compiled.querySelector('li');
    expect(typeof list.textContent).toEqual('string');

    const link = list.querySelector('a');
    expect(link.getAttribute('href')).toBe("/detail/1");
    expect(link.textContent).toEqual("1 test ");

    const btn = list.querySelector('button');
    expect(btn.getAttribute('title')).toBe("delete hero");
    expect(btn.textContent).toEqual("x");
  });

  it('should render a label with input and button to add new hero', done => {
    const fixture = TestBed.createComponent(HeroesComponent);
    fixture.detectChanges();
    const app: any = fixture.debugElement.componentInstance;
    app.heroes = [ {id: 1, name: "test"} ];
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const label = compiled.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent).toEqual('Hero name: ');

    const input = label.querySelector('input');
    expect(input).toBeTruthy();

    const btn = compiled.querySelector('button');
    expect(btn).toBeTruthy();
    app.heroName.nativeElement.value = 'uno';

    spyOn(app, 'add');

    const button = fixture.debugElement.query( By.css('button') );
    button.triggerEventHandler( 'click', null );
    fixture.detectChanges();
    
    expect(app.add).toHaveBeenCalledWith('uno');
    expect(app.heroName.nativeElement.value).toBe('');
    done();
  });
  
  it('should have a method for get heroes and it is called on init', done => {
    const fixture = TestBed.createComponent(HeroesComponent);
    const app: any = fixture.debugElement.componentInstance;
    spyOn(app, 'getHeroes');
    fixture.detectChanges();
    expect(app.getHeroes).toHaveBeenCalled();
    done();
  });
  
  it('should get the heroes from service', done => {
    const fixture = TestBed.createComponent(HeroesComponent);
    const app: any = fixture.debugElement.componentInstance;
    spyOn(app.heroService, 'getHeroes').and.returnValue(of(['test']))
    fixture.detectChanges();

    app.getHeroes();

    expect(app.heroService.getHeroes).toHaveBeenCalled();
    expect(app.heroes.length).toEqual(1);
    expect(app.heroes[0]).toEqual('test');
    
    done();
  });
  
  it('should send a new hero to service', done => {
    const fixture = TestBed.createComponent(HeroesComponent);
    const app: any = fixture.debugElement.componentInstance;
    spyOn(app.heroService, 'addHero').and.returnValue(of({name: 'test'}))
    app.heroes = [];
    fixture.detectChanges();

    app.add('test_add');

    expect(app.heroService.addHero).toHaveBeenCalledWith({'name': 'test_add'});
    
    expect(app.heroes.length).toEqual(1);
    expect(app.heroes[0].name).toEqual('test');
    done();
  });
  
  it('should delete the given hero from service', done => {
    const fixture = TestBed.createComponent(HeroesComponent);
    const app: any = fixture.debugElement.componentInstance;
    spyOn(app.heroService, 'deleteHero').and.returnValue(of([]))
    const hero = {name: 'test_delete'};
    app.heroes = [hero];
    expect(app.heroes.length).toEqual(1);
    fixture.detectChanges();

    app.delete(hero);

    expect(app.heroService.deleteHero).toHaveBeenCalledWith({'name': 'test_delete'});
    expect(app.heroes.length).toEqual(0);
    done();
  });
  
});
