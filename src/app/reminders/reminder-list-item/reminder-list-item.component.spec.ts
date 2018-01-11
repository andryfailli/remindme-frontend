import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenu, MatMenuModule } from '@angular/material';

import { By } from '@angular/platform-browser';

import { Reminder } from '../../models/reminder.model';
import { ReminderListItemComponent } from './reminder-list-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReminderListItemComponent', () => {
  let component: ReminderListItemComponent;
  let fixture: ComponentFixture<ReminderListItemComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MatMenuModule, NoopAnimationsModule],
        declarations: [ReminderListItemComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderListItemComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onArchiveClick if archive button is clicked', () => {
    component.reminder = new Reminder({
      archived: false
    });
    fixture.detectChanges();
    const archiveButtonEl: DebugElement = fixture.debugElement.query(
      By.css('.archive-btn')
    );
    fixture.detectChanges();

    expect(archiveButtonEl).toBeTruthy();

    let emitted = false;
    component.archive.subscribe(() => (emitted = true));
    archiveButtonEl.triggerEventHandler('click', null);
    expect(emitted).toEqual(true);
  });

  it('should emit onUnArchiveClick if unarchive button is clicked', () => {
    component.reminder = new Reminder({
      archived: true
    });
    fixture.detectChanges();
    const unarchiveButtonEl: DebugElement = fixture.debugElement.query(
      By.css('.unarchive-btn')
    );
    fixture.detectChanges();

    expect(unarchiveButtonEl).toBeTruthy();

    let emitted = false;
    component.unarchive.subscribe(() => (emitted = true));
    unarchiveButtonEl.triggerEventHandler('click', null);
    expect(emitted).toEqual(true);
  });

  it('should open more menu', () => {
    component.reminder = new Reminder({
      archived: false,
      date: new Date().toISOString(),
      title: 'prova'
    });
    fixture.detectChanges();
    const moreMenuTriggerButtonEl: DebugElement = fixture.debugElement.query(
      By.css('.more-btn')
    );
    fixture.detectChanges();

    expect(moreMenuTriggerButtonEl).toBeTruthy();
  });

  it('should open more menu and emit unarchive event', () => {
    component.reminder = new Reminder({
      archived: true,
      date: new Date().toISOString(),
      title: 'prova'
    });
    fixture.detectChanges();
    const moreMenuTriggerButtonEl: DebugElement = fixture.debugElement.query(
      By.css('.more-btn')
    );
    fixture.detectChanges();

    expect(moreMenuTriggerButtonEl).toBeTruthy();

    moreMenuTriggerButtonEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    const unarchiveMenuButtonEl: DebugElement = fixture.debugElement.query(
      By.css('.unarchive-menu-btn')
    );
    fixture.detectChanges();

    expect(unarchiveMenuButtonEl).toBeTruthy();

    let emitted = false;
    component.unarchive.subscribe(() => (emitted = true));
    unarchiveMenuButtonEl.triggerEventHandler('click', null);
    expect(emitted).toEqual(true);
  });

  it('should open more menu and emit archive event', () => {
    component.reminder = new Reminder({
      archived: false,
      date: new Date().toISOString(),
      title: 'prova'
    });
    fixture.detectChanges();
    const moreMenuTriggerButtonEl: DebugElement = fixture.debugElement.query(
      By.css('.more-btn')
    );
    fixture.detectChanges();

    expect(moreMenuTriggerButtonEl).toBeTruthy();

    moreMenuTriggerButtonEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    const archiveMenuButtonEl: DebugElement = fixture.debugElement.query(
      By.css('.archive-menu-btn')
    );
    fixture.detectChanges();

    expect(archiveMenuButtonEl).toBeTruthy();

    let emitted = false;
    component.archive.subscribe(() => (emitted = true));
    archiveMenuButtonEl.triggerEventHandler('click', null);
    expect(emitted).toEqual(true);
  });

  it('should open more menu and emit delete event', () => {
    component.reminder = new Reminder({
      archived: false,
      date: new Date().toISOString(),
      title: 'prova'
    });
    fixture.detectChanges();
    const moreMenuTriggerButtonEl: DebugElement = fixture.debugElement.query(
      By.css('.more-btn')
    );
    fixture.detectChanges();

    expect(moreMenuTriggerButtonEl).toBeTruthy();

    moreMenuTriggerButtonEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    const deleteMenuButtonEl: DebugElement = fixture.debugElement.query(
      By.css('.delete-menu-btn')
    );
    fixture.detectChanges();

    expect(deleteMenuButtonEl).toBeTruthy();

    let emitted = false;
    component.delete.subscribe(() => (emitted = true));
    deleteMenuButtonEl.triggerEventHandler('click', null);
    expect(emitted).toEqual(true);
  });
});
