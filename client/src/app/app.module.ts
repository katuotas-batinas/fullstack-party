import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IssueListComponent,
    HeaderComponent,
    IssueEntryComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MalihuScrollbarModule.forRoot(),
    AngularFontAwesomeModule,
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
