import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Reminder } from '../../models/reminder.model';
import { RemindersService } from '../reminders-service/reminders.service';

import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { User } from '../../models/user.model';
import { UsersService } from '../../users/users-service/users.service';

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: './reminder-dialog.component.html',
  styleUrls: ['./reminder-dialog.component.css'],
  providers: [RemindersService, MatSnackBar]
})
export class ReminderDialogComponent implements OnInit {
  reminder: Reminder;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private remindersService: RemindersService,
    private matSnackBar: MatSnackBar
  ) {}

  private async loadReminder() {
    this.reminder =
      this.data.reminderId !== ''
        ? await this.remindersService.get(this.data.reminderId).toPromise()
        : new Reminder();
  }

  saveReminder() {
    this.remindersService
      .save(this.reminder)
      .subscribe(() =>
        this.matSnackBar.open('Reminder saved.', null, { duration: 2000 })
      );
  }

  async ngOnInit() {
    this.loadReminder();
  }
}
