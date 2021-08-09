import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {

  transform(firebaseTime: any): string {
    return firebaseTime.toDate().toLocaleDateString("en-GB");
  }

}
