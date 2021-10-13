import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokenLinkDirective } from './directives/broken-link.directive';

@NgModule({
  declarations: [BrokenLinkDirective],
  imports: [CommonModule],
  exports: [BrokenLinkDirective],
})
export class UtilsModule {}
