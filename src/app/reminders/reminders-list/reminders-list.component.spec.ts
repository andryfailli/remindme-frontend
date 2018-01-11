import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersListComponent } from './reminders-list.component';

import {
  MatDialogModule,
  MatSnackBarModule,
  MatSnackBar
} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

describe('RemindersListComponent', () => {
  let component: RemindersListComponent;
  let fixture: ComponentFixture<RemindersListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MatDialogModule,
          RouterTestingModule.withRoutes([]),
          MatSnackBarModule
        ],
        declarations: [RemindersListComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: []
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
