import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2MessagingCardComponent } from './uk2-messaging-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [Uk2MessagingCardComponent],
  imports: [CommonModule, MatExpansionModule, MatIconModule],
  exports: [Uk2MessagingCardComponent],
})
export class Uk2MessagingCardModule {}
