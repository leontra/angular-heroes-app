import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  it('should have add method', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service.messages.length).toEqual(0);
    service.add("Test Message");
    expect(service.messages.length).toBeGreaterThan(0);
    expect(service.messages[0]).toEqual("Test Message");
    service.clear();
    expect(service.messages.length).toEqual(0);
  });

});
