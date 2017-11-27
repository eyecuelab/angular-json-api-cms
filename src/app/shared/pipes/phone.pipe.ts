import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})

export class PhonePipe implements PipeTransform {
  transform(phone: String) {
    if (phone) {
      const digits = phone.toString().replace(/\D/g, '');

      let country, city, number;

      switch (digits.length) {
        case 10:
          country = '';
          city = digits.slice(0, 3);
          number = digits.slice(3);
          break;

        case 11:
          country = (digits[0] === '1') ? '' : digits[0] + ' ';
          city = digits.slice(1, 4);
          number = digits.slice(4);
          break;

        case 12:
          country = digits.slice(0, 3) + ' ';
          city = digits.slice(3, 5);
          number = digits.slice(5);
          break;

        default:
          return phone;
      }

      number = number.slice(0, 3) + '-' + number.slice(3);

      return (country + ' (' + city + ') ' + number);
    }
  }
}
