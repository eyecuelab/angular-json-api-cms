import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideRight =
  trigger('slideRight', [
    state('*', style({
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    })),

    transition('void => *', [
      style({
        opacity: 0.75,
        transform: 'translateX(100%)'
      }),
      animate('375ms ease-in-out', style({
        opacity: 1,
        transform: 'translateX(0)'
      }))
    ]),

    transition('* => void', [
      animate('375ms ease-in-out', style({
        opacity: 0.75,
        transform: 'translateX(100%) rotate(1deg)'
      }))
    ])
  ]);
