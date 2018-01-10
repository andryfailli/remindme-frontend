import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent
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
    MatButtonModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
