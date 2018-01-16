import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { RemindersModule } from './reminders/reminders.module';

import { AppComponent } from './app.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { MainSidenavContentComponent } from './main-sidenav-content/main-sidenav-content.component';
import { RemindersListComponent } from './reminders/reminders-list/reminders-list.component';
import { ClickStopPropagationDirective } from './utils/click-stop-propagation/click-stop-propagation.directive';
import { UtilsModule } from './utils/utils.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { UsersModule } from './users/users.module';

const appRoutes: Routes = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full' },
  { path: 'inbox', component: RemindersListComponent },
  { path: 'archive', component: RemindersListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainSidenavContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- set to true for debugging purposes only
    ),
    MatToolbarModule,
    MatSidenavModule,
    RemindersModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    UsersModule,
    SubscriptionsModule,
    UtilsModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
