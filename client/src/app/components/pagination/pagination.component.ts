import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  public currentPage;

  @Input()
  public pagesTotal;

  public pages = [];

  public showFirst: boolean;

  public showLast: boolean;

  constructor() { }

  ngOnInit() {
    this.rebuildLinks();
  }

  openPage(page, e) {
    e.preventDefault();

    if(page < 1 || page > this.pagesTotal) {
      return;
    }

    this.currentPage = page;
    this.rebuildLinks();
  }

  rebuildLinks() {
    this.pages = [];
    
    let start = Math.max(this.currentPage - 1, 1);
    let end = Math.min(this.currentPage + 1, this.pagesTotal);

    if(start < 3) {
      start = 1;
      end = Math.min(4, this.pagesTotal);
    }
    else if(this.currentPage > this.pagesTotal - 3) {
      start = this.pagesTotal - 3;
      end = this.pagesTotal;
    }

    if(start > 1) {
      this.showFirst = true;
    } else {
      this.showFirst = false;
    }

    if(end < this.pagesTotal) {
      this.showLast = true;
    } else {
      this.showLast = false;
    }

    for(let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }

}
