import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  public scrollbarOptions = {
    theme: 'minimal-dark',
  };

  constructor() { }

  ngOnInit() {
  }

}
