import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'router-outlet',
  template: '<p>Heroes</p>'
})
class RouterComponent {}

@Component({
  selector: 'app-messages',
  template: '<p>Messages</p>'
})
class MessagesComponent {}

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        RouterComponent,
        MessagesComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Tour of Heroes');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Tour of Heroes');
  });

  it('should have nav with dashboard link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const nav = compiled.querySelector('nav');
    expect(nav).toBeTruthy();
    const links = nav.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0].textContent).toContain('Dashboard');
    expect(links[0].getAttribute('href')).toContain('/dashboard');
  });

  it('should have nav with heroes link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const nav = compiled.querySelector('nav');
    expect(nav).toBeTruthy();
    const links = nav.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
    expect(links[1].textContent).toContain('Heroes');
    expect(links[1].getAttribute('href')).toContain('/heroes');
  });

  it('should contain the heroes component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should contain the messages component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-messages')).toBeTruthy();
  });

});
