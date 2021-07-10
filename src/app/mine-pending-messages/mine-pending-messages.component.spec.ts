import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinePendingMessagesComponent } from './mine-pending-messages.component';

describe('MinePendingMessagesComponent', () => {
  let component: MinePendingMessagesComponent;
  let fixture: ComponentFixture<MinePendingMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinePendingMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinePendingMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
