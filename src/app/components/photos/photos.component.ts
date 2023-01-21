import { Component, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { IPhoto } from 'src/app/interfaces/photo.interface';
import { PhotoService } from 'src/app/services/photo.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@UntilDestroy()
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  public loading$: Observable<boolean> = this.photoService.loading$;
  public photos: IPhoto[] = [];
  private page = 1;
  private favorites: IPhoto[] = [];
  private readonly limit = 12;

  constructor(private photoService: PhotoService, private storageService: StorageService) { }

  @HostListener("window:scroll", ["$event"]) onScroll() {
  const pos: number = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  const max: number = document.documentElement.scrollHeight;

    if(pos === max) {
      this.page = ++this.page
      this.getPhotos(this.page, this.limit);
    }
  }

  public ngOnInit(): void {
    this.favorites = this.photoService.getFavorites();
    this.getPhotos(this.page, this.limit);
  }

  public trackBy(index: number, photo: IPhoto): string {
    return photo.id;
  }

  public addToFavorite(photo: IPhoto) {    
    if (!photo.favorite) {
      this.favorites.push(photo);
      this.storageService.addFavorite('favorites', this.favorites);
      this.mapFavorites();
    }    
  }
  
  private getPhotos(page: number, limit: number): void {
    this.photoService.getList(page, limit).pipe(untilDestroyed(this)).subscribe((photos: IPhoto[]) => {
      this.photos = [...this.photos, ...photos];
      this.mapFavorites();
    })
  }

  private mapFavorites(): void {    
    const favorites = this.photoService.getFavorites();
    this.photos = this.photos.map(photo => {
      return {
        ...photo,
        favorite: favorites.some(favorite => favorite.id === photo.id),
      }
    });    
  }
}
