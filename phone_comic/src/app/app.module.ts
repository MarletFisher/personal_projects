import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChaptersListComponent } from './chapters-list/chapters-list.component';
// import { ChaptersRoutingModule } from './chapters-list/chapters-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReaderComponent } from './reader/reader.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './ngrx/reducers';
import { TableRowHighlightDirective } from './table-row-highlight.directive';

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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    AppRoutingModule,
    // ChaptersRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
