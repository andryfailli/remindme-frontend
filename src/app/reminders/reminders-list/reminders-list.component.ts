import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { Reminder } from '../../models/reminder.model';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RemindersService } from '../reminders-service/reminders.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';

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
    private route: ActivatedRoute,
    private router: Router,
    private remindersService: RemindersService,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.reminders$ = this.remindersService.list();

    this.remindersUpcoming$ = this.reminders$.map((reminders: Reminder[]) =>
      reminders.filter((reminder: Reminder) => reminder.isPast() === false)
    );

    this.remindersPast$ = this.reminders$.map((reminders: Reminder[]) =>
      reminders.filter((reminder: Reminder) => reminder.isPast() === true)
    );

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('reminder')) {
        const reminderId = paramMap.get('reminder');
        const dialogRef = this.dialog.open(ReminderDialogComponent, {
          width: '100%',
          data: {
            reminderId: reminderId
          }
        });
        dialogRef.afterClosed().subscribe((reminder: Reminder) => {
          this.router.navigate(
            [reminder && reminder.archived ? '/archive' : '/inbox'],
            {
              queryParams: { reminder: null }
            }
          );
        });
      }
    });
  }

  private archiveReminder(reminder: Reminder) {
    this.remindersService.archive(reminder).subscribe(() =>
      this.matSnackBar.open('Reminder moved to the archive.', null, {
        duration: 2000
      })
    );
  }

  private unarchiveReminder(reminder: Reminder) {
    this.remindersService.unarchive(reminder).subscribe(() =>
      this.matSnackBar.open('Reminder moved to inbox.', null, {
        duration: 2000
      })
    );
  }

  private deleteReminder(reminder: Reminder) {
    this.remindersService
      .delete(reminder)
      .subscribe(() =>
        this.matSnackBar.open('Reminder deleted.', null, { duration: 2000 })
      );
  }
}
