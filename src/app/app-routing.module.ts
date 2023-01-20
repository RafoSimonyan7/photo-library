import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './components/photos/photos.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  {path: '', component: PhotosComponent},
  {path: 'photos/:id', loadComponent: () => import('./components/single-photo/single-photo.component').then(c =>c.SinglePhotoComponent)},
  {path: 'favorites', loadComponent: () => import('./components/favorites/favorites.component').then(c => c.FavoritesComponent)},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
