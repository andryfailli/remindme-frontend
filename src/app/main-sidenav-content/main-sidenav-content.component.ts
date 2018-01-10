import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-sidenav-content',
  templateUrl: './main-sidenav-content.component.html',
  styleUrls: ['./main-sidenav-content.component.css']
})
export class MainSidenavContentComponent implements OnInit {
  @Output() navigate = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onClick = () => this.navigate.emit();
}
