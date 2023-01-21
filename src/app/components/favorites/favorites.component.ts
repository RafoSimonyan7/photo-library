import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { IPhoto } from 'src/app/interfaces/photo.interface';
import { PhotoService } from 'src/app/services/photo.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [CommonModule, MatGridListModule, SharedModule],
})
export class FavoritesComponent {
  public favorites: IPhoto[] = [];

  constructor( private photoService: PhotoService) { }

  ngOnInit(): void {
    this.favorites = this.photoService.getFavorites();
  }
}
