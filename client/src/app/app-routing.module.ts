import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { IssueEntryComponent } from './components/issue-entry/issue-entry.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'issues', component: IssueListComponent},
  {path: 'issues/:id', component: IssueEntryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
