import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatTooltipModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatSelectModule
} from '@angular/material';

// FIXME: check https://github.com/angular/material2/issues/8375#issuecomment-344240087
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RemindersListComponent } from '../reminders/reminders-list/reminders-list.component';
import { ReminderListItemComponent } from './reminder-list-item/reminder-list-item.component';
import { RouterModule } from '@angular/router';
import { RemindersService } from './reminders-service/reminders.service';
import { ReminderDialogComponent } from './reminder-dialog/reminder-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users-service/users.service';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    MatSelectModule,
    MatSnackBarModule,
    UtilsModule
  ],
  declarations: [
    RemindersListComponent,
    ReminderListItemComponent,
    ReminderDialogComponent,
    ReminderFormComponent
  ],
  entryComponents: [ReminderDialogComponent],
  exports: [RemindersListComponent]
})
export class RemindersModule {}
