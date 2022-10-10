import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],
})
export class LabelComponent implements OnInit {
  @Input() counter = 0;
  
  public get isNegeative() : boolean {
    return this.counter < 0;
  }
  

  constructor() {}

  ngOnInit(): void {}
}
