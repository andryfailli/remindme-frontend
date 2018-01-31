import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { UsersService } from './users-service/users.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [UsersService]
})
export class UsersModule {}
