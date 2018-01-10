import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Reminder } from '../../models/reminder.model';

@Component({
  selector: 'app-reminder-list-item',
  templateUrl: './reminder-list-item.component.html',
  styleUrls: ['./reminder-list-item.component.css']
})
export class ReminderListItemComponent implements OnInit {
  @Input() reminder: Reminder;
  @Output() archive = new EventEmitter<void>();
  @Output() unarchive = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onArchiveClick() {
    this.archive.emit();
  }

  onUnarchiveClick() {
    this.unarchive.emit();
  }

  onDeleteClick() {
    this.delete.emit();
  }
}
