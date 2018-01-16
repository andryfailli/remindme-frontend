import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';

// FIXME: check https://github.com/angular/material2/issues/8375#issuecomment-344240087
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ReminderDialogComponent } from './reminder-dialog/reminder-dialog.component';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';
import { ReminderListItemComponent } from './reminder-list-item/reminder-list-item.component';
import { RemindersListComponent } from '../reminders/reminders-list/reminders-list.component';
import { RemindersService } from './reminders-service/reminders.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users-service/users.service';
import { UtilsModule } from '../utils/utils.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule,
    UtilsModule,
    HttpClientModule
  ],
  declarations: [
    RemindersListComponent,
    ReminderListItemComponent,
    ReminderFormComponent,
    ReminderDialogComponent
  ],
  entryComponents: [ReminderDialogComponent],
  exports: [RemindersListComponent],
  providers: [RemindersService]
})
export class RemindersModule {}
