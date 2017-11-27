import { trigger, state, animate, transition, style } from '@angular/animations';

export const drawerSlide =
  trigger('drawerSlide', [
    state('*', style({ })),

    transition('void => *', [
      style({
        transform: 'translateX(100%)'
      }),
      animate('3s ease-in-out', style({
        transform: 'translateX(0)'
      }))
    ]),

    transition('* => void', [
      animate('3s ease-in-out', style({
        transform: 'translateX(-100%)'
      }))
    ])
  ]);
