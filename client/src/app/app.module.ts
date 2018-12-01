import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { HeaderComponent } from './components/header/header.component';
import { IssueEntryComponent } from './components/issue-entry/issue-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IssueListComponent,
    HeaderComponent,
    IssueEntryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MalihuScrollbarModule.forRoot(),
    AngularFontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
