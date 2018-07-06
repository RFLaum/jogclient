// wrapper that may either show or edit a jog

import { Component, OnInit, Input} from '@angular/core';

import { RecJog } from '../../jog.model';
@Component({
  selector: 'app-jog-wrapper',
  templateUrl: './jog-wrapper.component.html',
  styleUrls: ['./jog-wrapper.component.css']
})
export class JogWrapperComponent implements OnInit {
  @Input() jog: RecJog;
  inEditMode: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
