import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users/users-service/users.service';
import { Input } from '@angular/core';
import { Reminder } from '../../models/reminder.model';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.css'],
  providers: [UsersService]
})
export class ReminderFormComponent implements OnInit {
  @Input() reminder: Reminder;
  users$: Observable<User[]>;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users$ = this.usersService.list();
  }

  trackerById(index: number, item: any) {
    return item ? item.id : item;
  }

  comparatorById(a: any, b: any) {
    return a === b || (a && b && a.id === b.id);
  }
}
