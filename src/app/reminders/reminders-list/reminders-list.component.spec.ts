import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersListComponent } from './reminders-list.component';

import {
  MatDialogModule,
  MatSnackBarModule,
  MatSnackBar,
  MatDialog
} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RemindersService } from '../reminders-service/reminders.service';
import { Reminder } from '../../models/reminder.model';

describe('RemindersListComponent', () => {
  let component: RemindersListComponent;
  let fixture: ComponentFixture<RemindersListComponent>;

  const REMINDER_ID_MOCK = 'REMINDER_ID_MOCK';
  const reminderMock = new Reminder({ id: REMINDER_ID_MOCK });

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RemindersListComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: RemindersService,
            useValue: {
              list: () => Observable.of([new Reminder()]),
              archive: (reminder) => Observable.of(reminder),
              unarchive: (reminder) => Observable.of(reminder),
              delete: (reminder) => Observable.of()
            }
          },
          {
            provide: MatSnackBar,
            useValue: {
              open: () => null
            }
          },
          {
            provide: Router,
            useValue: {
              url: '/inbox',
              navigate: () => Observable.of(true).toPromise()
            }
          },
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: Observable.of({
                has: (key: string) => false,
                get: (key: string) => undefined
              })
            }
          },
          {
            provide: MatDialog,
            useValue: {
              open: () => {
                return { afterClosed: () => Observable.of(null) };
              }
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should archiveReminder and open snackbar', () => {
    const reminderService: RemindersService = TestBed.get(RemindersService);
    const matSnackBar: MatSnackBar = TestBed.get(MatSnackBar);

    const reminder: Reminder = new Reminder();

    spyOn(reminderService, 'archive').and.returnValue(Observable.of(reminder));
    spyOn(matSnackBar, 'open').and.returnValue(Observable.of(null));

    component.archiveReminder(reminder).subscribe(() => {
      expect(reminderService.archive).toHaveBeenCalledWith(reminder);
      expect(matSnackBar.open).toHaveBeenCalled();
    });
  });

  it('should unarchiveReminder and open snackbar', () => {
    const reminderService: RemindersService = TestBed.get(RemindersService);
    const matSnackBar: MatSnackBar = TestBed.get(MatSnackBar);

    const reminder: Reminder = new Reminder();

    spyOn(reminderService, 'unarchive').and.returnValue(
      Observable.of(reminder)
    );
    spyOn(matSnackBar, 'open').and.returnValue(Observable.of(null));

    component.unarchiveReminder(reminder).subscribe(() => {
      expect(reminderService.unarchive).toHaveBeenCalledWith(reminder);
      expect(matSnackBar.open).toHaveBeenCalled();
    });
  });

  it('should deleteReminder and open snackbar', () => {
    const reminderService: RemindersService = TestBed.get(RemindersService);
    const matSnackBar: MatSnackBar = TestBed.get(MatSnackBar);

    const reminder: Reminder = new Reminder();

    spyOn(reminderService, 'delete').and.returnValue(Observable.of(reminder));
    spyOn(matSnackBar, 'open').and.returnValue(Observable.of(null));

    component.deleteReminder(reminder).subscribe(() => {
      expect(reminderService.delete).toHaveBeenCalledWith(reminder);
      expect(matSnackBar.open).toHaveBeenCalled();
    });
  });
});

describe('RemindersListComponent (with reminderId)', () => {
  let component: RemindersListComponent;
  let fixture: ComponentFixture<RemindersListComponent>;

  const REMINDER_ID_MOCK = 'REMINDER_ID_MOCK';
  const reminderMock = new Reminder({ id: REMINDER_ID_MOCK });

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RemindersListComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: RemindersService,
            useValue: {
              list: () => Observable.of([new Reminder()]),
              archive: (reminder) => Observable.of(reminder),
              unarchive: (reminder) => Observable.of(reminder),
              delete: (reminder) => Observable.of()
            }
          },
          {
            provide: MatSnackBar,
            useValue: {
              open: () => null
            }
          },
          {
            provide: Router,
            useValue: {
              url: '/inbox',
              navigate: () => Observable.of(true).toPromise()
            }
          },
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: Observable.of({
                has: (key: string) => true,
                get: (key: string) => REMINDER_ID_MOCK
              })
            }
          },
          {
            provide: MatDialog,
            useValue: {
              open: () => {
                return { afterClosed: () => Observable.of(reminderMock) };
              }
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersListComponent);
    component = fixture.componentInstance;
  });

  it('should open dialog', () => {
    const matDialog: MatDialog = TestBed.get(MatDialog);
    const router: Router = TestBed.get(Router);
    spyOn(matDialog, 'open').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    fixture.detectChanges();
    expect(matDialog.open).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([
      '/inbox',
      { reminder: null }
    ]);
  });
});
