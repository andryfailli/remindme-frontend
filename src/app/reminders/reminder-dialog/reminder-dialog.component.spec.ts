import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutModule } from '@angular/cdk/layout';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';

import { ReminderDialogComponent } from './reminder-dialog.component';
import { RemindersService } from '../reminders-service/reminders.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersService } from '../../users/users-service/users.service';
import { remindersMockData } from './../reminders-service/reminders-mock-data';
import { usersMockData } from './../../users/users-service/users-mock-data';
import { Observable } from 'rxjs/Observable';
import { DebugElement } from '@angular/core/src/debug/debug_node';

import { By } from '@angular/platform-browser';
import { AuthService } from '../../auth-service/auth.service';
import { User } from '../../models/user.model';

describe('ReminderDialogComponent', () => {
  let component: ReminderDialogComponent;
  let fixture: ComponentFixture<ReminderDialogComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MatDialogModule, LayoutModule, HttpClientTestingModule],
        declarations: [ReminderDialogComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: { reminderId: '0' }
          },
          {
            provide: MatDialogRef,
            useValue: {
              close() {}
            }
          },
          {
            provide: MatSnackBar,
            useValue: {
              open() {}
            }
          },
          {
            provide: RemindersService,
            useValue: {
              get: () => Observable.of(remindersMockData[0]),
              save: (data) => Observable.of(data)
            }
          },
          {
            provide: UsersService,
            useValue: {
              list: () => Observable.of(usersMockData)
            }
          },
          {
            provide: AuthService,
            useValue: {
              user$: Observable.of(new User())
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should get the reminder',
    async(() => {
      fixture.whenStable().then(() => {
        expect(component.reminder).toBeTruthy();
      });
    })
  );

  it('should save reminder if OK button is clicked', () => {
    const okButtonEl: DebugElement = fixture.debugElement.query(
      By.css('.ok-btn')
    );

    expect(okButtonEl).toBeTruthy();

    spyOn(component, 'saveReminder').and.callThrough();
    okButtonEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.saveReminder).toHaveBeenCalled();
  });
});
