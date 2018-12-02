import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-issue-entry',
  templateUrl: './issue-entry.component.html',
  styleUrls: ['./issue-entry.component.scss']
})
export class IssueEntryComponent implements OnInit {

    public isLoading;

    public issue;

    public error;

    constructor(private activatedRoute: ActivatedRoute,
        private http: HttpClient) { }

    ngOnInit() {
        this.isLoading = true;

        this.http.get('api/issue', {params: this.activatedRoute.snapshot.params})
            .subscribe(res => {
                this.issue = res;
                this.isLoading = false;
            }, err => {
                this.error = err.error.message;
                this.isLoading = false;
            })
    }

}
