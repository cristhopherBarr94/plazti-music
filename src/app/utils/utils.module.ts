import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokenLinkDirective } from './directives/broken-link.directive';
import { TimeDurationPipe } from './pipes/time-duration.pipe';

@NgModule({
  declarations: [BrokenLinkDirective, TimeDurationPipe],
  imports: [CommonModule],
  exports: [BrokenLinkDirective, TimeDurationPipe],
})
export class UtilsModule {}
