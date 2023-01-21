import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IPhoto } from 'src/app/interfaces/photo.interface';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent {
  @Input() public photo!: IPhoto;
  @Input() public isFavorite: boolean = false;
  @Output() public selectPhoto: EventEmitter<IPhoto> = new EventEmitter<IPhoto>();

  constructor(private router: Router) { }

  public onSelectPhoto(photo: IPhoto): void {
    if(this.isFavorite) {
      this.router.navigate([`/photos/${photo.id}`]);
    } else {
      this.selectPhoto.emit(photo);
    }
  }
}
