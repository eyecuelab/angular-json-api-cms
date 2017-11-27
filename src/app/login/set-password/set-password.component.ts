import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SessionService } from './../../core/session.service';
import { ApiService } from './../../core/api/api.service';
import { Resource } from './../../core/api/resource';
import { Action } from './../../core/api/action';

import { SingleActionComponent } from './../../shared/single-action.component';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent extends SingleActionComponent implements OnInit {
  constructor(
    protected fb: FormBuilder,
    protected sessionService: SessionService,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router) {

    super(fb, sessionService);
  }

  ngOnInit() {
    this.route.data.subscribe((data: { password: any }) => {
      if (data.password) {
        this.action = data.password.action('update_password');
        this.initForm();
      }
    });
  }

  submit() {
    this.api
        .actionRequest(this.action, this.form.value)
        .subscribe(value => this.actionSuccess(value));
  }

  private actionSuccess(value) {
    this.router.navigate(['/']);
  }
}
