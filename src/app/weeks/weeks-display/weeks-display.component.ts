import { Component, OnInit } from '@angular/core';

import { RoutingUtilitiesService } from '../../misc/routing-utilities.service'

@Component({
  selector: 'app-weeks-display',
  templateUrl: './weeks-display.component.html',
  styleUrls: ['./weeks-display.component.css']
})
export class WeeksDisplayComponent implements OnInit {

  constructor(private routUtil:RoutingUtilitiesService) {
    routUtil.maybeGoHome();
  }

  ngOnInit() {
  }

}
