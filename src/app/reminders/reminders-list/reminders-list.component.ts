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
  providers: [RemindersService]
})
export class RemindersListComponent implements OnInit {
  private reminders$: Observable<Reminder[]>;
  remindersUpcoming$: Observable<Reminder[]>;
  remindersPast$: Observable<Reminder[]>;

  constructor(private remindersService: RemindersService) {}

  ngOnInit() {
    this.reminders$ = this.remindersService.list();

    this.remindersUpcoming$ = this.reminders$.map((reminders: Reminder[]) =>
      reminders.filter((reminder: Reminder) => reminder.isPast() === false)
    );

    this.remindersPast$ = this.reminders$.map((reminders: Reminder[]) =>
      reminders.filter((reminder: Reminder) => reminder.isPast() === true)
    );
  }
}
