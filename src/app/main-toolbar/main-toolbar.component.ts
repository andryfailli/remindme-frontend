import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth-service/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();

  user$: Observable<User>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  menuButtonClick = () => this.toggleSidenav.emit();

  ngOnInit() {}
}
