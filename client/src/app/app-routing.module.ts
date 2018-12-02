import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { IssueEntryComponent } from './components/issue-entry/issue-entry.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'issues', component: IssueListComponent, canActivate: []},
  {path: 'issues/:owner/:repo/:number', component: IssueEntryComponent, canActivate: []},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
