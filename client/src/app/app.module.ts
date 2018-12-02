import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { HeaderComponent } from './components/header/header.component';
import { IssueEntryComponent } from './components/issue-entry/issue-entry.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { ConfigService } from './services/config.service';
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';
import { TimeSincePipe } from './pipes/time-since.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IssueListComponent,
    HeaderComponent,
    IssueEntryComponent,
    PaginationComponent,
    TimeSincePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MalihuScrollbarModule.forRoot(),
    AngularFontAwesomeModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    {
        provide: APP_INITIALIZER,
        useFactory: (config: ConfigService) => () => config.load(),
        deps: [ConfigService],
        multi: true
    },
    ConfigService,
    AuthGuard,
    GuestGuard,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
