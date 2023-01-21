import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IPhoto } from 'src/app/interfaces/photo.interface';
import { PhotoService } from 'src/app/services/photo.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MatButtonModule } from '@angular/material/button';

@UntilDestroy()
@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class SinglePhotoComponent {
  public singlePhoto!: IPhoto;
  private photoId: string | null= '';
  private favorites: IPhoto[] = [];

  constructor(
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(untilDestroyed(this)).subscribe((param: ParamMap) => {
      this.photoId = param.get('id');
      this.favorites = this.photoService.getFavorites();
      this.singlePhoto = this.favorites.find(photo => photo.id  == this.photoId) as IPhoto;
    });
  }

  public removePhotoFromFavorites(id: string) {
    let newFavorites: IPhoto[] = this.favorites.filter(photo => photo.id !== id);
    this.storageService.addFavorite('favorites', newFavorites);
    this.router.navigate(['/favorites']);
  }
}
