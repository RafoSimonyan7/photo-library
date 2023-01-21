import { Component, Input, OnInit } from '@angular/core';
import { IPhoto } from 'src/app/interfaces/photo.interface';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent {
  @Input() photo!: IPhoto;

  constructor() { }

}
