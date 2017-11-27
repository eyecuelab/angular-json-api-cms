import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/pairwise';

import { SessionService } from './../core/session.service';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() { }
}
