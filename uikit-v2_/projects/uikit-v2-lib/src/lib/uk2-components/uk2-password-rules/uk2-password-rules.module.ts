import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Uk2PasswordRulesComponent } from './uk2-password-rules.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [Uk2PasswordRulesComponent],
  imports: [CommonModule, MatListModule, MatIconModule],
  exports: [Uk2PasswordRulesComponent],
})
export class Uk2PasswordRulesModule {}
