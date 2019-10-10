import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';

import { RouterTestingModule } from '@angular/router/testing';
import {ActivatedRoute, convertToParamMap, Params} from '@angular/router';
import { HeroDetailComponent } from './hero-detail.component';
import { of, Subject } from 'rxjs';
import { doesNotThrow } from 'assert';


describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let params: Subject<Params>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports: [
        FormsModule, 
        RouterTestingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        )
      ],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: {
            params: {
                subscribe: (fn: (value: Params) => void) => fn({
                    tab: 0,
                }),
            },
            snapshot: { 
              paramMap: convertToParamMap( { 'id': '11' } ) } 
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nothing when there is no hero', () => {
    const fixture = TestBed.createComponent(HeroDetailComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2')).toBeNull();
  });

  it('should render the hero after get it and selected details', (done) => {
    fixture.detectChanges();
    
    setTimeout( () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('DR NICE');
      expect(compiled.querySelectorAll('div')[0].textContent).toContain('id: 11');
      expect(compiled.querySelector('input').placeholder).toBe('name');
      expect(compiled.querySelector('label').textContent).toContain('name: ');
      done();
    }, 500);
  });

  it('should have a button for going back', (done) => {
    const fixture = TestBed.createComponent(HeroDetailComponent);
    const app: any = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    spyOn(app.location, 'back');

    app.hero = {id: 1, name: "test"};
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const btnElement = compiled.querySelector('button');
    expect(btnElement.textContent).toContain("go back");
    
    const button = fixture.debugElement.query( By.css('button') );
    button.triggerEventHandler( 'click', null );
    fixture.detectChanges();

    expect(app.location.back).toHaveBeenCalled();
    done();
  });

  it('should have a button for save the hero and update it', done => {
    const fixture = TestBed.createComponent(HeroDetailComponent);
    const app: any = fixture.debugElement.componentInstance;
    app.hero = {id: 10, name: "test"};
    
    spyOn(app.heroService, 'updateHero').and.returnValue(of({}))
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const btnElement = compiled.querySelectorAll('button');
    expect(btnElement[1].textContent).toContain("save");

    const buttons = fixture.debugElement.queryAll( By.css('button') );
    buttons[1].triggerEventHandler( 'click', null );
    fixture.detectChanges();

    expect(app.heroService.updateHero).toHaveBeenCalledWith({name: "test", id: 10});
    done();

  });
  
});
