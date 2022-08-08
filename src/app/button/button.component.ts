import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() label = "?"
  @Output() handleClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.handleClick.emit();
  }
}
