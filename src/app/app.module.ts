import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PhotosComponent } from './components/photos/photos.component';
import { SinglePhotoComponent } from './components/single-photo/single-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    PhotosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
