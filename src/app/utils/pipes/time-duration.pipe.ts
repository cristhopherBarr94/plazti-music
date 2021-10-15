import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDuration',
})
export class TimeDurationPipe implements PipeTransform {
  transform(time: number, ...args: unknown[]): unknown {
    if (!time) {
      return '00:00';
    } else {
      let seconds = time.toString().split('.')[0];
      let transformedTime = `00:${
        seconds.length === 1 ? '0' + seconds : seconds
      }`;
      return transformedTime;
    }
  }
}
