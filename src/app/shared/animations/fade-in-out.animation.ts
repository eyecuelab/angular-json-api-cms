import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInOut =
  trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('375ms', style({ opacity: 1}))
    ]),

    transition(':leave', [
      style({ opacity: 1 }),
      animate('375ms', style({ opacity: 0}))
    ]),
  ]);
