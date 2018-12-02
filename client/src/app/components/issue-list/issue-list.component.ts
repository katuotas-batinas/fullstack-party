import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IssuesResponse } from '../../interfaces/issues-response';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  public scrollbarOptions = {
    theme: 'minimal-dark',
  };

  public isLoading = false;

  public issues;

  public pagination;

  public error;

  private request;

    constructor(private http: HttpClient,
        private router: Router,
        public activatedRoute: ActivatedRoute) {
        this.router.events.subscribe((e) => {
            if(e instanceof NavigationEnd) {
                if(!this.activatedRoute.snapshot.queryParams.state) {
                    this.router.navigate(['/issues'], { queryParams: {state: 'open'}, queryParamsHandling: 'merge' })
                } else {
                    this.getIssues();
                }
            }
        });
    }

  ngOnInit() {

  }

  getIssues() {
      if(this.request) {
          this.request.unsubscribe();
      }

      this.isLoading = true;
      this.error = null;
      this.issues = null;
      this.pagination = null;

      this.request = this.http.get<IssuesResponse>('http://localhost:8000/api/issues', {params: this.activatedRoute.snapshot.queryParams})
        .subscribe(res => {
            this.issues = res.data;
            this.pagination = res.pagination;
            this.isLoading = false;
        }, err => {
            this.error = err.error.message;
            this.isLoading = false;
        });
  }

  openPage(page) {
      this.router.navigate(['/issues'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
      this.getIssues();
  }

}
