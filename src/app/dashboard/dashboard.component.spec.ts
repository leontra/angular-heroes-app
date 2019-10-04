import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-hero-search',
  template: '<p>Hero Search</p>'
})
class HeroSearchComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false }
        )
      ],
      declarations: [
        DashboardComponent,
        HeroSearchComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title with Top Heroes', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toBe("Top Heroes");
  });

  it('should render the grid', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const app: any = fixture.debugElement.componentInstance;
    app.heroes = [ {id: 1, name: "test"} ];
    fixture.detectChanges();
    
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    const grid = compiled.querySelector('.grid');
    expect(grid).toBeTruthy();

    const links = compiled.querySelectorAll('a');
    expect(links.length).toBe(1);
    
    expect(links[0].getAttribute('href')).toContain("/detail/1");
    expect(links[0].querySelector('.hero').textContent).toContain("test");

  });

  it('should have the element Hero Search', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-hero-search')).toBeTruthy();
  });
  
});
