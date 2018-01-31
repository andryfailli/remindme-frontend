import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatFormField,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

import { RemindersModule } from './reminders/reminders.module';

import { AppComponent } from './app.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { MainSidenavContentComponent } from './main-sidenav-content/main-sidenav-content.component';
import { RemindersListComponent } from './reminders/reminders-list/reminders-list.component';
import { ClickStopPropagationDirective } from './utils/click-stop-propagation/click-stop-propagation.directive';
import { UtilsModule } from './utils/utils.module';
import { AuthService } from './auth-service/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuard } from './auth-guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
import { UsersModule } from './users/users.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './auth-http-interceptor/auth-http.interceptor';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'inbox',
    component: RemindersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'archive',
    component: RemindersListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainSidenavContentComponent,
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- set to true for debugging purposes only
    ),
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    RemindersModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    UtilsModule,
    UsersModule,
    SubscriptionsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
