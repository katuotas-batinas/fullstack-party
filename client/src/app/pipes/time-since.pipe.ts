import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSince'
})
export class TimeSincePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      let now = Date.now();
      let start = new Date(value).getTime();

      let seconds = Math.round((now - start) / 1000);

      let interval = Math.round(seconds / 31536000);

      if (interval > 1) {
        return interval + ' years';
      }
      interval = Math.round(seconds / 2592000);
      if (interval > 1) {
        return interval + ' months';
      }
      interval = Math.round(seconds / 86400);
      if (interval > 1) {
        return interval + ' days';
      }
      interval = Math.round(seconds / 3600);
      if (interval > 1) {
        return interval + ' hours';
      }
      interval = Math.round(seconds / 60);
      if (interval > 1) {
        return interval + ' minutes';
      }

      return Math.round(seconds) + ' seconds';
  }

}
