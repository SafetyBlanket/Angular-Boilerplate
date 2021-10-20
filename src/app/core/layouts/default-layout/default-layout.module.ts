import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './views/default-layout/default-layout.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DefaultLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [DefaultLayoutComponent],
})
export class DefaultLayoutModule {}
