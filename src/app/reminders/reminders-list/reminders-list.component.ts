import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';

import { Reminder } from '../../models/reminder.model';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';

import { RemindersService } from '../reminders-service/reminders.service';

import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.css']
})
export class RemindersListComponent implements OnInit {
  reminders$: Observable<Reminder[]>;
  remindersUpcoming$: Observable<Reminder[]>;
  remindersPast$: Observable<Reminder[]>;

  constructor(
    private remindersService: RemindersService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.listReminders();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('reminder')) {
        const reminderId = paramMap.get('reminder');
        const dialogRef = this.dialog.open(ReminderDialogComponent, {
          width: '100%',
          data: {
            reminderId
          }
        });
        dialogRef.afterClosed().subscribe((reminder: Reminder) => {
          this.router.navigate([
            reminder && reminder.archived ? '/archive' : '/inbox',
            { reminder: null }
          ]);
          this.listReminders();
        });
      }
    });
  }

  listReminders() {
    this.reminders$ = this.remindersService
      .list(this.router.url.startsWith('/inbox') ? false : true)
      .share();

    this.remindersUpcoming$ = this.reminders$.map((reminders: Reminder[]) =>
      reminders.filter((reminder: Reminder) => reminder.isPast() === false)
    );

    this.remindersPast$ = this.reminders$.map((reminders: Reminder[]) =>
      reminders.filter((reminder: Reminder) => reminder.isPast() === true)
    );
  }

  archiveReminder(reminder: Reminder): Observable<Reminder> {
    const reminder$: Observable<Reminder> = this.remindersService.archive(
      reminder
    );
    reminder$.subscribe(() => {
      this.matSnackBar.open('Reminder moved to the archive.', null, {
        duration: 2000
      });
      this.listReminders();
    });
    return reminder$;
  }

  unarchiveReminder(reminder: Reminder): Observable<Reminder> {
    const reminder$: Observable<Reminder> = this.remindersService.unarchive(
      reminder
    );
    reminder$.subscribe(() => {
      this.matSnackBar.open('Reminder moved to inbox.', null, {
        duration: 2000
      });
      this.listReminders();
    });
    return reminder$;
  }

  deleteReminder(reminder: Reminder): Observable<void> {
    const reminder$: Observable<void> = this.remindersService.delete(reminder);
    reminder$.subscribe(() => {
      this.matSnackBar.open('Reminder deleted.', null, { duration: 2000 });
      this.listReminders();
    });
    return reminder$;
  }
}
