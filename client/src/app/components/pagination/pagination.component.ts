import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {


    private _currentPage;

    @Input()
    set currentPage(page) {
        this._currentPage = page;
        this.rebuildLinks();
    }

    get currentPage() {
        return this._currentPage;
    }

    private _lastPage;

    @Input()
    set lastPage(page) {
        this._lastPage = page;
        this.rebuildLinks();
    }

    get lastPage() {
        return this._lastPage;
    }

    @Output()
    public onClick = new EventEmitter();

    public pages = [];

    public showFirst: boolean;

    public showLast: boolean;

    constructor() { }

    ngOnInit() {
    }

    openPage(page, e) {
        e.preventDefault();

        if(page < 1 || page > this.lastPage) {
          return;
        }

        this.onClick.emit(page);
    }

    rebuildLinks() {
        this.pages = [];

        let start = Math.max(this.currentPage - 1, 1);
        let end = Math.min(this.currentPage + 1, this.lastPage);

        if(start < 3) {
            start = 1;
            end = Math.min(4, this.lastPage);
        }
        else if(this.currentPage > this.lastPage - 3) {
            start = this.lastPage - 3;
            end = this.lastPage;
        }

        if(start > 1) {
            this.showFirst = true;
        } else {
            this.showFirst = false;
        }

        if(end < this.lastPage) {
            this.showLast = true;
        } else {
            this.showLast = false;
        }

        for(let i = start; i <= end; i++) {
            this.pages.push(i);
        }
    }

}
