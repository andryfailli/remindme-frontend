import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutModule } from '@angular/cdk/layout';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material';

import { ReminderDialogComponent } from './reminder-dialog.component';

describe('ReminderDialogComponent', () => {
  let component: ReminderDialogComponent;
  let fixture: ComponentFixture<ReminderDialogComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MatDialogModule, LayoutModule],
        declarations: [ReminderDialogComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: {}
          },
          {
            provide: MatDialogRef,
            useValue: {}
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
