import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports: [FormsModule]
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

  it('should render the hero selected details', () => {
    const fixture = TestBed.createComponent(HeroDetailComponent);
    const app: any = fixture.debugElement.componentInstance;
    app.hero = {id: 1, name: "test"};
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('TEST');
    expect(compiled.querySelectorAll('div')[0].textContent).toContain('id: 1');
    expect(compiled.querySelector('input').placeholder).toBe('name');
    expect(compiled.querySelector('label').textContent).toContain('name: ');
  });
  
});
