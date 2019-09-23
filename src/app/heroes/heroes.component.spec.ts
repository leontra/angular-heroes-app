import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
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

  // it(`should have as hero 'windstorm'`, () => {
  //   const fixture = TestBed.createComponent(HeroesComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.hero.id).toEqual(1);
  //   expect(app.hero.name).toEqual('Windstorm');
  // });

  it('should render the heroes title in a h2 tag', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('My Heroes');
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
    
    const fixture = TestBed.createComponent(HeroesComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app, 'onSelect');
    const listElement = fixture.debugElement.query( By.css('li') );
    expect(app.selectedHero).toBeUndefined();

    listElement.triggerEventHandler('click', {id: 1, name: "test"});
    fixture.detectChanges();
    
    expect(app.onSelect).toHaveBeenCalledWith({id: 1, name: "test"});
    expect(app.selectedHero.id).toBe(0);
    expect(app.selectedHero.name).toBe("test");
  });

});
