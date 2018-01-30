import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: []
})
export class LoginFormComponent {
  email: string;
  password: string;

  @Output()
  submit: EventEmitter<{
    email: string;
    password: string;
  }>;

  constructor() {
    this.submit = new EventEmitter<{
      email: string;
      password: string;
    }>();
  }

  onSubmit = () =>
    this.submit.emit({ email: this.email, password: this.password });
}
