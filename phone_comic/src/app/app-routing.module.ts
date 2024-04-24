import { NgModule } from '@angular/core';

import { ChaptersListComponent } from './chapters-list/chapters-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReaderComponent } from './reader/reader.component';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'chapters-list', component: ChaptersListComponent },
  { path: 'reader/:chapterNumber', component: ReaderComponent },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
})
export class AppRoutingModule {}
