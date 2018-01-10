import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatListModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { MainSidenavContentComponent } from './main-sidenav-content/main-sidenav-content.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full'}
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
    MatIconModule,
    MatButtonModule,
	MatSidenavModule,
	MatListModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
