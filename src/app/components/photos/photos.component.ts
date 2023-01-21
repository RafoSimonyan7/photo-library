import { Component, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { IPhoto } from 'src/app/interfaces/photo.interface';
import { PhotoService } from 'src/app/services/photo.service';

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
  private readonly limit = 12;

  constructor(private photoService: PhotoService) { }

  @HostListener("window:scroll", ["$event"]) onScroll() {
  const pos: number = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  const max: number = document.documentElement.scrollHeight;

    if(pos === max) {
      this.page = ++this.page
      this.getPhotos(this.page, this.limit);
    }
  }

  public ngOnInit(): void {
    this.getPhotos(this.page, this.limit);
  }

  public trackBy(index: number, photo: IPhoto): string {
    return photo.id;
  }
  
  private getPhotos(page: number, limit: number): void {
    this.photoService.getList(page, limit).pipe(untilDestroyed(this)).subscribe((photos: IPhoto[]) => {
      this.photos = [...this.photos, ...photos];
    })
  }
}
