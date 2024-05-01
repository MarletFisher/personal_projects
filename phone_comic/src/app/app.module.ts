import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChaptersListComponent } from './chapters-list/chapters-list.component';
// import { ChaptersRoutingModule } from './chapters-list/chapters-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReaderComponent } from './reader/reader.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { TableRowHighlightDirective } from './directives/table-row-highlight.directive';
import { authInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { metaReducers, reducers } from './ngrx/reducers';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'chapters-list', component: ChaptersListComponent },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ReaderComponent,
    HomePageComponent,
    ChaptersListComponent,
    PageNotFoundComponent,
    TableRowHighlightDirective,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    AppRoutingModule,
    // ChaptersRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
