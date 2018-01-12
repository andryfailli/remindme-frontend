import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';

import { Reminder } from '../../models/reminder.model';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';

import { RemindersService } from '../reminders-service/reminders.service';

import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.css'],
  providers: [RemindersService, MatSnackBar]
})
export class RemindersListComponent implements OnInit {
  private reminders$: Observable<Reminder[]>;
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
          this.router.navigate(
            [reminder && reminder.archived ? '/archive' : '/inbox'],
            {
              queryParams: { reminder: null }
            }
          );
          this.listReminders();
        });
      }
    });
  }

  private listReminders() {
    this.reminders$ = this.remindersService.list(
      this.router.url.startsWith('/inbox') ? false : true
    );

    this.remindersUpcoming$ = this.reminders$.map((reminders: Reminder[]) =>
      reminders.filter((reminder: Reminder) => reminder.isPast() === false)
    );

    this.remindersPast$ = this.reminders$.map((reminders: Reminder[]) =>
      reminders.filter((reminder: Reminder) => reminder.isPast() === true)
    );
  }

  private archiveReminder(reminder: Reminder) {
    this.remindersService.archive(reminder).subscribe(() => {
      this.matSnackBar.open('Reminder moved to the archive.', null, {
        duration: 2000
      });
      this.listReminders();
    });
  }

  private unarchiveReminder(reminder: Reminder) {
    this.remindersService.unarchive(reminder).subscribe(() => {
      this.matSnackBar.open('Reminder moved to inbox.', null, {
        duration: 2000
      });
      this.listReminders();
    });
  }

  private deleteReminder(reminder: Reminder) {
    this.remindersService.delete(reminder).subscribe(() => {
      this.matSnackBar.open('Reminder deleted.', null, { duration: 2000 });
      this.listReminders();
    });
  }
}
