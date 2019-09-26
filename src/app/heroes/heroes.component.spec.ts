import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { HeroesComponent } from './heroes.component';
import { Hero } from '../Hero/hero';

@Component({
  selector: 'app-hero-detail',
  template: '<p>Hero Detail</p>'
})
class HeroDetail {
  @Input() hero: any;
}

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent, HeroDetail ],
      imports: [FormsModule]
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
    const compiled = fixture.debugElement.nativeElement;
    const ul = compiled.querySelectorAll('.heroes')[0];
    expect(ul).toBeTruthy();
    const liList = ul.querySelectorAll('li');
    expect(liList.length).toBeGreaterThan(0);
  });

  it('should render the hero name and id', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(typeof compiled.querySelector('li').textContent).toEqual('string');
  });

  it('should have a click event the list member', () => {
    
    const fixture: ComponentFixture<HeroesComponent> = TestBed.createComponent(HeroesComponent);
    const app: any = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.heroes = [ {id: 1, name: "test"} ];
    fixture.detectChanges();
    
    const listElement = fixture.debugElement.query( By.css('li') );
    expect(app.selectedHero).toBeUndefined();
    listElement.triggerEventHandler( 'click', null );
    
    fixture.detectChanges();
    expect(app.selectedHero.id).toBe(1);
    expect(app.selectedHero.name).toBe("test");
    
  });

});
