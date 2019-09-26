import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display only if there are messages', () => {
    const fixture = TestBed.createComponent(MessagesComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div')).toBeNull();
  });

  it('should display the h2 title Messages', () => {
    const fixture = TestBed.createComponent(MessagesComponent);
    fixture.detectChanges();

    const app: any = fixture.debugElement.componentInstance;
    app.messageService.add("Test");
    fixture.detectChanges();
    
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain("Messages");
    
  });

  it('should display the messages list', () => {

    const fixture = TestBed.createComponent(MessagesComponent);
    const app: any = fixture.debugElement.componentInstance;
    app.messageService.add("Test");
    fixture.detectChanges();
    
    const compiled = fixture.debugElement.nativeElement;
    const list = compiled.querySelectorAll('.messages-log');
    expect(list.length).toBe(1);
    expect(list[0].textContent).toBe("Test");
    
  });

  it('should have a button for clear the messages', () => {

    const fixture = TestBed.createComponent(MessagesComponent);
    fixture.detectChanges();

    const app: any = fixture.debugElement.componentInstance;
    app.messageService.add("Test");
    fixture.detectChanges();
    
    expect( app.messageService.messages.length ).toBeGreaterThan(0);
    const compiled = fixture.debugElement.nativeElement;
    const btnElement = compiled.querySelector('.clear');
    expect(btnElement.textContent).toContain("clear");
    
    const button = fixture.debugElement.query( By.css('button') );
    button.triggerEventHandler( 'click', null );
    
    fixture.detectChanges();
    expect(app.messageService.messages.length).toBe(0);

    
  });

});
