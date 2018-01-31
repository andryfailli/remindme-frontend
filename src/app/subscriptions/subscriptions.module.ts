import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SubscriptionsService } from './subscriptions-service/subscriptions.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [SubscriptionsService]
})
export class SubscriptionsModule {}
