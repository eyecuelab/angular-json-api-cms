import { trigger, state, animate, transition, style } from '@angular/animations';

export const dummyAnimation =
  trigger('dummyAnimation', [
    state('*', style({
      color: ''
    })),

    transition('* => void', [
      animate('375ms ease-out', style({
        color: ''
      }))
    ]),

    transition('void => *', [
      animate('375ms ease-in-out', style({
        color: ''
      }))
    ])
  ]);
