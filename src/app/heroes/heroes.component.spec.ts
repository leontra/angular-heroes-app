import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';
import { Hero } from '../Hero/hero';


describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      imports: [FormsModule, RouterTestingModule]
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
  });
  
});
