import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderFormComponent } from './reminder-form.component';
import { Base } from '../../models/base.model';

describe('ReminderFormComponent', () => {
  let component: ReminderFormComponent;
  let fixture: ComponentFixture<ReminderFormComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ReminderFormComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should track thruty item by id', () => {
    const itemMock = new Base({ id: 'my-id' });
    expect(component.trackerById(0, itemMock)).toEqual(itemMock.id);
  });

  it('should track falsy item by item', () => {
    const itemMock = false;
    expect(component.trackerById(0, itemMock)).toEqual(itemMock);
  });

  it('should compare equal if same object', () => {
    const item1Mock = new Base({ id: '1' });
    expect(component.comparatorById(item1Mock, item1Mock)).toEqual(true);
  });

  it('should compare equal if different objects but same id', () => {
    const item1MockA = new Base({ id: '1' });
    const item1MockB = new Base({ id: '1' });
    expect(component.comparatorById(item1MockA, item1MockB)).toEqual(true);
  });

  it('should compare equal if different ids', () => {
    const item1Mock = new Base({ id: '1' });
    const item2Mock = new Base({ id: '2' });
    expect(component.comparatorById(item1Mock, item2Mock)).toEqual(false);
  });
});
