import { Action } from '../api/action';
import { Type, plainToClass } from 'class-transformer';
import { Field } from '../api/field';

export class FakeResourceMeta {
  @Type(() => Action)
  actions = {
    reset_password: [
      { defaultValue: '',
        name: 'email',
        type: 'email' }
    ]
  };

  action(name: string): Action {
    const action = new Action();
    const Field_One = new Field();
    Field_One.name = 'whole_state';
    const Field_Two = new Field();
    Field_Two.name = 'zipcodes';
    action.fields = [ Field_One, Field_Two];
    // for (var i = 0; i<= 1; i++) {
    //
    //   action.fields.push(plainToClass(Field, Field));
    // }
    return action;
  }
}
