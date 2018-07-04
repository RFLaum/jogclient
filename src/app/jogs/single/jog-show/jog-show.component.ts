import { Component, OnInit, Input } from '@angular/core';

import { RecJog } from '../../jog.model';
@Component({
  selector: 'app-jog-show',
  templateUrl: './jog-show.component.html',
  styleUrls: ['./jog-show.component.css']
})
export class JogShowComponent implements OnInit {
  @Input() jog: RecJog;

  constructor() { }

  ngOnInit() {
  }

}
